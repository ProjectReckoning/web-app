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
    let type: NotificationType;
    let title: string;
    let description: string;

    if ("data" in data && typeof data.data === "object" && "type" in data.data) {
      // PushNotificationWithData
      if (data.data.type === "member_approval_needed") {
        type = NotificationType.MEMBER_APPROVAL_NEEDED;
      } else {
        type = NotificationType.INFORMATION;
      }

      title = data.title ?? "No Title";
      description = data.body ?? data.data?.message ?? "No description";
    } else {
      // PocketInvite (does not have title/body)
      type = NotificationType.INFORMATION;
      title = "Invitation Update";
      description = "You have a new invitation.";
    }

    return {
      title,
      description,
      type,
      isRead: false
    };
  }

}

const notificationRepository = new NotificationRepository()

export default notificationRepository