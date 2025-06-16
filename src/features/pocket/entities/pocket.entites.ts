export enum PocketType {
  SPENDING = 'spending',
  SAVING = 'saving',
}

export enum PocketStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export type Pocket = {
  pocket_id: number;
  name: string;
  type: PocketType;
  target_nominal: number;
  current_balance: number;
  deadline: Date | null;
  status: PocketStatus;
  icon_name: string;
  color_hex: string;
  account_number: string;
};