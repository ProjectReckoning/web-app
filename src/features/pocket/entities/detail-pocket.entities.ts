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
  phoneNumber: string;
}

export enum PocketMemberRole {
  Owner = "owner",
  Admin = "admin",
  Member = "member",
}
  
export interface PocketMemberMetadata {
  id: number;
  userId: number;
  pocketId: number;
  role: PocketMemberRole;
  contributionAmount: number | null;
  joinedAt: string | null;
  isActive: boolean | null;
  createdAt: string;
  updatedAt: string;
}

export interface PocketMember {
  id: number;
  name: string;
  phoneNumber: string;
  metadata?: PocketMemberMetadata;
}

export interface DetailPocketEntity {
  id: string;
  name: string;
  type: PocketType;
  targetNominal: number;
  balance: number;
  deadline: Date | null;
  status: PocketStatus;
  icon: string;
  color: string;
  accountNumber: string;
  ownerUserId: number;
  owner: PocketOwner;
  members: PocketMember[];
  userRole: PocketMemberRole;
  income: number;
  outcome: number;
}