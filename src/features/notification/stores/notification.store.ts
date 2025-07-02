import { create } from 'zustand'
import { NotificationEntity } from '../entities/notification.entity';
import { getAllNotificationUseCase } from '../use-cases/get-all-notification.usecase';
import { createJSONStorage, persist } from 'zustand/middleware';

type NotificationStore = {
  isLoading: boolean;
  notifications: NotificationEntity[] | null;
  unreadNotificationsCount: number;
  errorMessage: string | null;
  readNotificationIds: string[];

  getAllNotifications: () => Promise<void>;
  readAllNotifications: () => void;
  updateNotifications: () => void;
};

const notificationStore = create<NotificationStore>()(
  persist((set, get) => ({
    isLoading: false,
    errorMessage: null,
    notifications: null,
    unreadNotificationsCount: 0,
    readNotificationIds: [],

    getAllNotifications: async () => {
      set({
        isLoading: true,
        errorMessage: null,
        notifications: null,
      })

      try {
        const readNotificationIds = get().readNotificationIds
        const notifications = await getAllNotificationUseCase(readNotificationIds)
        const unreadNotificationsCount = notifications
          .filter((it) => !it.isRead)
          .length

        set({
          notifications,
          unreadNotificationsCount,
          errorMessage: null,
        })
      } catch (error) {
        console.error(error)
        set({ errorMessage: error instanceof Error ? error.message : String(error) })
      } finally {
        set({ isLoading: false })
      }
    },

    readAllNotifications: () => {
      const previousReadNotifications: string[] = get().readNotificationIds ?? []
      const readNotifications: string[] = (get().notifications ?? []).map((it) => it.id)

      set({
        unreadNotificationsCount: 0,
        readNotificationIds: [
          ...previousReadNotifications,
          ...readNotifications
        ],
      })
    },

    updateNotifications: () => {
      const notifications = get().notifications ?? []
      const readNotificationIds: string[] = get().readNotificationIds

      const mappedResult = notifications.map((notification) => {
        const isRead = readNotificationIds.includes(notification.id)

        return {
          ...notification,
          isRead
        }
      })

      set({
        notifications: mappedResult
      })
    },
  }), {
    name: 'notification-store',
    storage: createJSONStorage(() => localStorage)
  }),
)

export default notificationStore