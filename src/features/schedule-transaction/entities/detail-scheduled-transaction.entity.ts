export interface DetailScheduledTransactionEntity {
  autoBudgetId: number;
  destination: string;
  userId: number;
  pocketId: number;
  startDate: Date;
  endDate: Date;
}