import { GetLast5TransactionResponse, GetLast5TransactionResponseItem } from "@/features/insight/entities/request/get-last-5-transaction.entities";

export async function GET(req: Request): Promise<Response> {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  if (!req.headers.get("Authorization")) {
    return new Response(JSON.stringify({
      ok: false,
      message: "Unauthorized",
      code: 401,
      data: null,
    }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const data: GetLast5TransactionResponseItem[] = [
    {
      "type": "topup",
      "description": "Monthly funding",
      "amount": 1000000,
      "transaction_type": 1
    },
    {
      "type": "purchase",
      "description": "Office supplies",
      "amount": 250000,
      "transaction_type": 0
    },
    {
      "type": "withdrawal",
      "description": "ATM withdrawal",
      "amount": 500000,
      "transaction_type": 0
    },
    {
      "type": "reimbursement",
      "description": "Business lunch",
      "amount": 150000,
      "transaction_type": 1
    },
    {
      "type": "payment",
      "description": "Software subscription",
      "amount": 200000,
      "transaction_type": 0
    }
  ]

  const response: GetLast5TransactionResponse = {
    ok: true,
    message: "Pocket's transaction history has been fetched",
    code: 200,
    data,
  };

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}