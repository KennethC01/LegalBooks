import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { useNotifications } from '../context/NotificationContext';
import { COLORS } from '../constants/theme';

export const Notifications = () => {
  const {
    notifications,
    markAsRead,
    markAllAsRead,
    clearNotifications,
  } = useNotifications();

  const handleNotificationPress = async (id: string) => {
    await markAsRead(id);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Ionicons
            name="notifications"
            size={24}
            color={COLORS.primary}
          />

          <Text style={styles.title}>
            Notificaciones
          </Text>
        </View>

        {notifications.length > 0 && (
          <TouchableOpacity onPress={markAllAsRead}>
            <Text style={styles.actionText}>
              Leer todas
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {notifications.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons
            name="notifications-off-outline"
            size={60}
            color={COLORS.textSecondary}
          />

          <Text style={styles.emptyTitle}>
            No tienes notificaciones
          </Text>

          <Text style={styles.emptyText}>
            Aquí aparecerán las notificaciones de LegalBooks.
          </Text>
        </View>
      ) : (
        <>
          <FlatList
            data={notifications}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.notificationCard,
                  !item.read && styles.unreadCard,
                ]}
                onPress={() => handleNotificationPress(item.id)}
              >
                <View style={styles.iconContainer}>
                  <Ionicons
                    name="notifications"
                    size={22}
                    color={COLORS.primary}
                  />
                </View>

                <View style={styles.notificationContent}>
                  <Text style={styles.notificationTitle}>
                    {item.title}
                  </Text>

                  <Text style={styles.notificationMessage}>
                    {item.message}
                  </Text>

                  <Text style={styles.notificationDate}>
                    {new Date(item.date).toLocaleString()}
                  </Text>
                </View>

                {!item.read && (
                  <View style={styles.unreadDot} />
                )}
              </TouchableOpacity>
            )}
          />

          <TouchableOpacity
            style={styles.clearButton}
            onPress={clearNotifications}
          >
            <Text style={styles.clearButtonText}>
              ELIMINAR NOTIFICACIONES
            </Text>
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.headerBg,
  },

  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },

  actionText: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: 'bold',
  },

  list: {
    padding: 16,
  },

  notificationCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  unreadCard: {
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },

  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#F2E9FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  notificationContent: {
    flex: 1,
  },

  notificationTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },

  notificationMessage: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },

  notificationDate: {
    fontSize: 10,
    color: COLORS.textSecondary,
    marginTop: 6,
  },

  unreadDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
    marginTop: 5,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginTop: 16,
  },

  emptyText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 8,
  },

  clearButton: {
    margin: 16,
    height: 45,
    borderRadius: 8,
    backgroundColor: '#DC3545',
    justifyContent: 'center',
    alignItems: 'center',
  },

  clearButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default Notifications;