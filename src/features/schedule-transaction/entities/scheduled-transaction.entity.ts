import { DetailScheduledTransactionEntity } from "./detail-scheduled-transaction.entity";

export interface ScheduledTransactionEntity {
  id: number;
  recurringAmount: number;
  nextRunDate: Date;
  status: 'active' | 'inactive';
  detail: DetailScheduledTransactionEntity | null;
  category: string;
}