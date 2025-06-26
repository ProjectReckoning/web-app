export type PocketType = "spending" | "business" | "saving" | "investment";

export type PocketStatus = "active" | "inactive" | "completed";

export type PocketUserRole = "owner" | "admin" | "spender";

export type PocketResponseItem = {
  pocket_id: number;
  name: string;
  type: PocketType;
  target_nominal: string;
  current_balance: string;
  deadline: string;
  status: PocketStatus;
  icon_name: string;
  color_hex: string;
  account_number: string;
  user_role: PocketUserRole;
  income: number;
  outcome: number;
};

/**
 * Defines the overall structure of the API response for fetching pockets.
 */
export type PocketResponse = {
  ok: boolean;
  data: PocketResponseItem[];
  message: string;
  code: number;
};