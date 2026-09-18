import React from 'react';
import {StyleSheet,Text,View,FlatList,TouchableOpacity,} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { useNotifications } from '../context/NotificationContext';
import { COLORS } from '../constants/theme';

export const Notifications = () => {
  const { language } = useLanguage();
  const { colors } = useTheme();
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
    <SafeAreaView
  style={[
    styles.container,
    { backgroundColor: colors.background },
  ]}
>
      <View
  style={[
    styles.header,
    {
      backgroundColor: colors.surface,
      borderBottomColor: colors.border,
    },
  ]}
>
        <View style={styles.titleContainer}>
          <Ionicons
            name="notifications"
            size={24}
            color={colors.primary}
          />

        <Text style={[styles.title,{ color: colors.textPrimary },]}>
             {language === 'es' ? 'Notificaciones' : 'Notifications'}
          </Text>
        </View>

        {notifications.length > 0 && (
          <TouchableOpacity onPress={markAllAsRead}>
            <Text style={styles.actionText}>
               {language === 'es' ? 'Leer todas' : 'Read all'}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {notifications.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons
            name="notifications-off-outline"
            size={60}
            color={colors.textSecondary}
          />

         <Text style={[styles.emptyTitle,{ color: colors.textPrimary },]}>
            {language === 'es'? 'No tienes notificaciones': 'You have no notifications'}
          </Text>

          <Text style={[styles.emptyText,{ color: colors.textSecondary },]}>
             {language === 'es'? 'Aquí aparecerán las notificaciones de LegalBooks.': 'Your LegalBooks notifications will appear here.'}
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
                 {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                   },
                  !item.read && styles.unreadCard,
              ]}
                onPress={() => handleNotificationPress(item.id)}
              >
                <View style={styles.iconContainer}>
                  <Ionicons
                    name="notifications"
                    size={22}
                    color={colors.primary}
                  />
                </View>

                <View style={styles.notificationContent}>
                  <Text style={[ styles.notificationTitle,{ color: colors.textPrimary },]}>
                    {item.title}
                  </Text>

                  <Text style={[ styles.notificationMessage,{ color: colors.textSecondary }, ]}>
                    {item.message}
                  </Text>

                  <Text style={[ styles.notificationDate,{ color: colors.textSecondary },]}>
                    {new Date(item.date).toLocaleString(language === 'es' ? 'es-HN' : 'en-US')}
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
             {language === 'es'? 'ELIMINAR NOTIFICACIONES': 'DELETE NOTIFICATIONS'}
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