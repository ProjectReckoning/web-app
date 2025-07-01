import { create } from 'zustand'
import { NotificationEntity } from '../entities/notification.entity';
import { getAllNotificationUseCase } from '../use-cases/get-all-notification.usecase';

type NotificationStore = {
  isLoading: boolean;
  notifications: NotificationEntity[] | null;
  unreadNotificationsCount: number;
  errorMessage: string | null;

  getAllNotifications: () => Promise<void>;
};

const notificationStore = create<NotificationStore>((set) => ({
  isLoading: false,
  errorMessage: null,
  notifications: null,
  unreadNotificationsCount: 0,

  getAllNotifications: async () => {
    set({
      isLoading: true,
      errorMessage: null,
      notifications: null,
    })

    try {
      const notifications = await getAllNotificationUseCase()
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
}))

export default notificationStore