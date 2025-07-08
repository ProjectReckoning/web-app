export interface GetAutoBudgetDetail {
  auto_budget_id: number;
  destination: string;
  user_id: number;
  pocket_id: number;
  start_date: Date;
  end_date: Date;
}

export interface GetAutoBudgetItem {
  id: number;
  recurring_amount: number;
  next_run_date: Date;
  status: 'active' | 'inactive';
  category: string;
  detail: GetAutoBudgetDetail;
}

export interface GetAutoBudgetResponse {
  ok: boolean;
  data: GetAutoBudgetItem[];
  message: string;
  code: number;
}
