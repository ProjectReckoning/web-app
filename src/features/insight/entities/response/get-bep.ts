export interface GetBepResponse {
  ok: boolean;
  data: GetBepProfit | GetBepLoss;
  message: string;
  code: number;
}

export interface GetBepProfit {
  status: "profit";
  cleanProfit: number;
  profitPercentage: number;
  averageDailyCleanProfit: number;
  estimatedDaysToBEP: number;
}

export interface GetBepLoss {
  status: "loss";
  loss: number;
  averageDailyCleanProfit: number;
  projections: FinancialProjection[];
}

interface FinancialProjection {
  increaseRate: string;
  increasedIncome: number;
  projectedDailyProfit: number;
  estimatedDaysToCoverLoss: number;
}