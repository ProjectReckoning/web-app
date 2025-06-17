export enum PocketType {
  Spending = "spending",
  Saving = "saving",
  Business = "business",
}

export enum PocketStatus {
  Active = "active",
  Inactive = "inactive",
  Completed = "completed",
}

export interface PocketOwner {
  id: number;
  name: string;
  phone_number: string;
}

export interface PocketMember {
  id: number;
  name: string;
  phone_number: string;
  PocketMember: {
    id: number;
    user_id: number;
    pocket_id: number;
    role: string;
    contribution_amount: number | null;
    joined_at: string | null;
    is_active: boolean | null;
    createdAt: string;
    updatedAt: string;
  };
}

export interface PocketDetailResponseItem {
  id: number;
  name: string;
  type: PocketType;
  target_nominal: number;
  current_balance: number;
  deadline: string | null;
  status: PocketStatus;
  icon_name: string;
  color_hex: string;
  account_number: string;
  owner_user_id: number;
  owner: PocketOwner;
  members: PocketMember[];
  user_role: string;
}

export interface GetPocketDetailResponse {
  ok: boolean;
  message: string;
  code: number;
  data: PocketDetailResponseItem;
}