export interface BepLoss {
  status: "loss";
  loss: number;
  averageDailyCleanProfit: number;
  projections: FinancialProjection[];
}

export interface FinancialProjection {
  increaseRate: string;
  increasedIncome: number;
  projectedDailyProfit: number;
  estimatedDaysToCoverLoss: number;
}