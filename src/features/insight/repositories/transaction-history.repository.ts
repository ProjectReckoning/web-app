import api from "@/lib/api";
import { GetLast5TransactionResponse, GetLast5TransactionResponseItem } from "@/features/insight/entities/response/get-last-5-transaction.entities";
import { TransactionEntity } from "@/features/insight/entities/transaction.entities";
import { TransactionType } from "@/features/insight/constants/transaction-type.enum";
import { GetTransactionDurationOption } from "../constants/get-transaction-history-duration-option.enum";
import { TransactionSummaryEntity } from "@/features/insight/entities/transaction-summary.entities";
import { GetAllTransactionResponse, GetAllTransactionResponseItem } from "@/features/insight/entities/response/get-all-transaction";
import { TransactionOverviewEntity } from "../entities/transaction-overview";
import { getTransactionCateogryFromString } from "../constants/transaction-category.enum";

class TransactionHistoryRepository {
  async getLast5Transaction(pocketId?: string): Promise<TransactionSummaryEntity[]> {
    try {
      const url = pocketId ? `/pocket/business/${pocketId}/last-5` : '/pocket/business/last-5'
      const response = await api.get(url)
      const responseData = response.data as GetLast5TransactionResponse
      const data = responseData.data

      return data.map((item: GetLast5TransactionResponseItem) => this.mapTransactionSummaryToEntity(item))
    } catch (error) {
      console.error("Error fetching transaction:", error)
      throw new Error("Failed to fetch transaction")
    }
  }

  async getAllTransaction({
    pocketId,
    duration
  }: {
    pocketId?: string;
    duration: GetTransactionDurationOption;
  }): Promise<TransactionOverviewEntity> {
    try {
      const url = pocketId ? `/pocket/business/${pocketId}/history?duration=${duration}` : `/pocket/business/history?duration=${duration}`
      const response = await api.get(url)
      const responseData = response.data as GetAllTransactionResponse
      const data = responseData.data

      if (!data) {
        throw new Error("Failed to fetch transaction")
      }

      return {
        transactions: data.transactions ? data.transactions.map((item: GetAllTransactionResponseItem) => this.mapTransactionToEntity(item)) : [],
        totalIncome: Number.parseFloat(data.pemasukan),
        totalOutcome: Number.parseFloat(data.pengeluaran),
        previousBalance: Number.parseFloat(data.saldoKemarin),
        closingBalance: Number.parseFloat(data.saldoPenutupan),
      }
    } catch (error) {
      console.error("Error fetching transaction:", error)
      throw new Error("Failed to fetch transaction")
    }
  }

  private mapTransactionToEntity(data: GetAllTransactionResponseItem): TransactionEntity {
    return {
      type: getTransactionCateogryFromString(data.category),
      amount: Number.parseFloat(data.amount),
      purpose: data.description,
      transactionType: data.transaction_type === 0 ? TransactionType.OUTCOME : TransactionType.INCOME,
      createdAt: data.createdAt,
      initiatorUser: data.initiator_user,
    }
  }

  private mapTransactionSummaryToEntity(data: GetLast5TransactionResponseItem): TransactionSummaryEntity {
    return {
      type: getTransactionCateogryFromString(data.type),
      amount: data.amount,
      description: data.description,
      transactionType: data.transaction_type === 0 ? TransactionType.OUTCOME : TransactionType.INCOME,
    }
  }
}

const transactionHistoryRepository = new TransactionHistoryRepository()

export default transactionHistoryRepository