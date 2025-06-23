import transactionHistoryRepository from "../repositories/transaction-history.repository";
import { GetTransactionDurationOption } from "../constants/get-transaction-history-duration-option.enum";
import { TransactionOverviewEntity } from "../entities/transaction-overview";

export async function getAllTransaction(
  pocketId: string,
  duration: GetTransactionDurationOption
): Promise<TransactionOverviewEntity> {
  const result = await transactionHistoryRepository.getAllTransaction(
    pocketId,
    duration
  );
  return result;
}
