import { NotificationEntity } from "../entities/notification.entity";
import notificationRepository from "../repositories/notification.repository";

export async function getAllNotificationUseCase(): Promise<NotificationEntity[]> {
  const result = await notificationRepository.getAllNotication()
  return result;
}
