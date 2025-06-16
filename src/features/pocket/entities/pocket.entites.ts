export enum PocketType {
  SPENDING = 'spending',
  SAVING = 'saving',
}

export enum PocketStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export type Pocket = {
  id: string;
  name: string;
  type: PocketType;
  target_nominal: number;
  current_balance: number;
  deadline: Date | null;
  status: PocketStatus;
  icon: string;
  color: string;
  account_number: string;
  user_role: string;
};