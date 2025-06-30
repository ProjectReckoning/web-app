import { ScheduledTransactionEntity } from "../entities/scheduled-transaction.entity";
import scheduleTransactionRepository from "../repositories/schedule-transaction.repository";

export async function getAllScheduledTransactions(pocketId: string): Promise<ScheduledTransactionEntity[]> {
  const result = await scheduleTransactionRepository.getAll(pocketId);
  return result;
}

