import api from "@/lib/api"
import { GetNotificationResponse, GetNotificationResponseItem } from "../entities/response/get-notification-response"
import { NotificationEntity, NotificationType } from "../entities/notification.entity"

class NotificationRepository {
  async getAllNotication(): Promise<NotificationEntity[]> {
    try {
      const response = await api.get(`/user/notification`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data: GetNotificationResponse = await response.data

      const result = data.data.map(this.mapNotificationToEntity)

      return result
    } catch (error) {
      console.error(error)
      throw new Error('Failed to fetch notification')
    }
  }

  private mapNotificationToEntity(data: GetNotificationResponseItem): NotificationEntity {
    return {
      id: data._id,
      title: data.title,
      description: data.body,
      type: data.data.type as NotificationType,
      isRead: false
    };
  }

}

const notificationRepository = new NotificationRepository()

export default notificationRepository