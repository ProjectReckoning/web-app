export interface GetNotificationResponse {
  ok: boolean;
  message: string;
  code: number;
  data: GetNotificationResponseItem[];
}

export type GetNotificationResponseItem = {
  _id: string;
  title: string;
  body: string;
  data: {
    type: string;
  }
}