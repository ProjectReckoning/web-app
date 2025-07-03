export enum PocketType {
  SPENDING = 'spending',
  SAVING = 'saving',
}

export enum PocketStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export type PocketEntity = {
  id: string;
  name: string;
  type: PocketType;
  targetNominal: number;
  currentBalance: number;
  deadline: Date | null;
  status: PocketStatus;
  icon: string;
  color: string;
  accountNumber: string;
  userRole: "owner" | "admin" | "member";
  income: number;
  outcome: number;
};