import { NotificationEntity } from "../entities/notification.entity";
import notificationRepository from "../repositories/notification.repository";

export async function getAllNotificationUseCase(readNotificationIds: string[]): Promise<NotificationEntity[]> {
  const result = await notificationRepository.getAllNotication()

  // Fill the isRead notification by readNotificationIds
  const mappedResult = result.map((notification) => {
    const isRead = readNotificationIds.includes(notification.id)

    return {
      ...notification,
      isRead
    }
  })

  return mappedResult;
}
