import { TransactionEntity } from "./transaction.entities";

export interface TransactionOverviewEntity {
  totalIncome: number;
  totalOutcome: number;
  previousBalance: number;
  closingBalance: number;
  transactions: TransactionEntity[];
}