import api from "@/lib/api";
import { ScheduledTransactionEntity } from "../entities/scheduled-transaction.entity";
import { DetailScheduledTransactionEntity } from "../entities/detail-scheduled-transaction.entity";
import { GetAutoBudgetItem, GetAutoBudgetResponse } from "../entities/responses/get-schedule-transaction-response.entity";

class ScheduleTransactionRepository {
  async getAll(pocketId: string): Promise<ScheduledTransactionEntity[]> {
    try {
      const response = await api.get(`/transaction/transfer/schedule/${pocketId}`);
      const responseData = response.data as GetAutoBudgetResponse;
      const data = responseData.data;

      return data.map((item: GetAutoBudgetItem) =>
        this.mapAutoBudgetToEntity(item)
      );
    } catch (error) {
      console.error("Error fetching pockets:", error);
      throw new Error("Failed to fetch pockets");
    }
  }

  private mapAutoBudgetToEntity(data: GetAutoBudgetItem): ScheduledTransactionEntity {
    const detail: DetailScheduledTransactionEntity | null = data.detail
      ? {
      autoBudgetId: data.detail.auto_budget_id,
      destination: data.detail.destination,
      userId: data.detail.user_id,
      pocketId: data.detail.pocket_id,
      startDate: new Date(data.detail.start_date),
      endDate: new Date(data.detail.end_date),
      } : null

    return {
      id: data.id,
      recurringAmount: data.recurring_amount,
      nextRunDate: data.next_run_date,
      status: data.status,
      detail: detail
    }
  }
}

const scheduleTransactionRepository = new ScheduleTransactionRepository();

export default scheduleTransactionRepository;
