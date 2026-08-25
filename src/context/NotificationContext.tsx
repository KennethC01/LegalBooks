import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from './AuthContext';

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
}

interface NotificationContextType {
  notifications: AppNotification[];
  unreadCount: number;
  addNotification: (title: string, message: string) => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  clearNotifications: () => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType>(
  {} as NotificationContextType
);

export const NotificationProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const { user } = useAuth();

  const storageKey = user?.email
    ? `@legalbooks_notifications_${user.email}`
    : '@legalbooks_notifications_guest';

  useEffect(() => {
    const loadNotifications = async () => {
      if (!user?.email) {
        setNotifications([]);
        return;
      }

      try {
        const savedNotifications = await AsyncStorage.getItem(storageKey);

        if (savedNotifications) {
          setNotifications(JSON.parse(savedNotifications));
        } else {
          setNotifications([]);
        }
      } catch (error) {
        console.error('Error al cargar notificaciones:', error);
      }
    };

    loadNotifications();
  }, [user?.email, storageKey]);

  const addNotification = async (
    title: string,
    message: string
  ) => {
    if (!user?.email) return;

    try {
      const newNotification: AppNotification = {
        id: `${Date.now()}`,
        title,
        message,
        date: new Date().toISOString(),
        read: false,
      };

      const updatedNotifications = [
        newNotification,
        ...notifications,
      ];

      setNotifications(updatedNotifications);

      await AsyncStorage.setItem(
        storageKey,
        JSON.stringify(updatedNotifications)
      );
    } catch (error) {
      console.error('Error al crear notificacion:', error);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      const updatedNotifications = notifications.map(notification =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      );

      setNotifications(updatedNotifications);

      await AsyncStorage.setItem(
        storageKey,
        JSON.stringify(updatedNotifications)
      );
    } catch (error) {
      console.error('Error al marcar notificacion:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      const updatedNotifications = notifications.map(notification => ({
        ...notification,
        read: true,
      }));

      setNotifications(updatedNotifications);

      await AsyncStorage.setItem(
        storageKey,
        JSON.stringify(updatedNotifications)
      );
    } catch (error) {
      console.error('Error al marcar todas como leidas:', error);
    }
  };

  const clearNotifications = async () => {
    try {
      setNotifications([]);

      await AsyncStorage.removeItem(storageKey);
    } catch (error) {
      console.error('Error al eliminar notificaciones:', error);
    }
  };

  const unreadCount = notifications.filter(
    notification => !notification.read
  ).length;

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        clearNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () =>
  useContext(NotificationContext);