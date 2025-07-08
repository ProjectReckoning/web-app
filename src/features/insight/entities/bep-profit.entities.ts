export interface BepProfit {
  status: 'profit';
  cleanProfit: number;
  profitPercentage: number;
  averageDailyCleanProfit: number;
  estimatedDaysToBEP: number | null;
}