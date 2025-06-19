import { TransactionEntity } from "@/features/insight/entities/transaction.entities";
import transactionHistoryRepository from "../repositories/transaction-history-repository";
import { GetTransactionDurationOption } from "../constants/req/get-transaction-history-duration-option.enum";

export async function getAllTransaction(pocketId: string, duration: GetTransactionDurationOption): Promise<TransactionEntity[]> {
  const result = await transactionHistoryRepository.getAllTransaction(pocketId, duration);
  return result;
}