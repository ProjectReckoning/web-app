export enum NotificationType {
  MEMBER_APPROVAL_NEEDED = "member_approval_needed",
  TRANSACTION_APPROVAL_NEEDED = "transaction_approval_needed",
  INFORMATION = "information"
}

export type NotificationEntity = {
  id: string
  title: string
  description: string
  type: NotificationType
  isRead: boolean
}