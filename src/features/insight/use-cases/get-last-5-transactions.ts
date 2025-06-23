import transactionHistoryRepository from "../repositories/transaction-history.repository";
import { TransactionSummaryEntity } from "@/features/insight/entities/transaction-summary.entities";

export async function get5LastTransactionsUsecase(
  pocketId?: string
): Promise<TransactionSummaryEntity[]> {
  const result = await transactionHistoryRepository.getLast5Transaction(
    pocketId
  );
  return result;
}
