export interface GetNotificationResponse {
  ok: boolean;
  message: string;
  code: number;
  data: GetNotificationResponseItem[];
}

export type GetNotificationResponseItem =
  | PushNotificationWithData
  | PushNotificationWithoutData
  | PocketInvite;

export interface PushNotificationWithData {
  _id: string;
  to: string;
  sound: string;
  title: string;
  body: string;
  data: NotificationData;
}

export interface PushNotificationWithoutData {
  _id: string;
  to: string;
  sound: string;
  title: string;
  body: string;
  data: InformationNotificationData;
}

export interface PocketInvite {
  _id: string;
  type: "pocket_invite";
  inviterUserId: number;
  invitedUserId: number;
  pocketId: number;
  status: "pending" | "accepted" | "rejected";
  created_at: string;
  updated_at: string;
}

export interface NotificationData {
  date: string;
  type: "member_approval_needed";
  message: string;
  requestedBy: {
    id: number;
    name: string;
  };
  pocket: Pocket | PocketLegacy;
  inviteData: {
    err?: string;
    data: PocketInvite;
  };
  user_id: number;
}

export interface InformationNotificationData {
  date: string;
  type: "information";
  message: string;
  user_id: number;
}

export interface Pocket {
  id: number;
  name: string;
  type: string;
  target_nominal: string;
  current_balance: string;
  deadline: string | null;
  status: string;
  owner_user_id: number;
  icon_name: string;
  color_hex: string;
  account_number: string;
  createdAt: string;
  updatedAt: string;
}

// Untuk legacy Sequelize-style object yang memiliki dataValues, _previousDataValues, dll.
export interface PocketLegacy {
  dataValues: Pocket;
  _previousDataValues: Pocket;
  uniqno: number;
  _changed: Record<string, unknown>;
  _options: {
    isNewRecord: boolean;
    _schema: null | string;
    _schemaDelimiter: string;
    raw: boolean;
    attributes: Array<keyof Pocket>;
  };
  isNewRecord: boolean;
}
