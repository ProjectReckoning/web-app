import { GetAllTransactionResponse, GetAllTransactionResponseItem } from "@/features/insight/entities/response/get-all-transaction";

const categories: { type: string; transaction_type: 0 | 1 }[] = [
  { type: "contribution", transaction_type: 1 },
  { type: "withdrawal", transaction_type: 1 },
  { type: "payment", transaction_type: 1 },
  { type: "autotopup", transaction_type: 0 },
  { type: "autorecurring", transaction_type: 1 },
  { type: "topup", transaction_type: 0 },
  { type: "transfer", transaction_type: 0 },
  { type: "income", transaction_type: 0 },
  { type: "expense", transaction_type: 1 },
];

const names = ["Ivanka Larasati", "Dimas Aryo"];
const initiators = ["John Doe", "Jane Smith"];

const rows: GetAllTransactionResponseItem[] = Array.from({ length: 50 }, (_, i) => {
  const now = new Date();
  const pastDate = new Date(now);
  pastDate.setDate(now.getDate() - Math.floor(Math.random() * 365));
  pastDate.setHours(Math.floor(Math.random() * 24));
  pastDate.setMinutes(Math.floor(Math.random() * 60));
  pastDate.setSeconds(Math.floor(Math.random() * 60));

  const category = categories[Math.floor(Math.random() * categories.length)];
  const amount = category.transaction_type === 0
    ? 100000 + Math.floor(Math.random() * 500000)
    : 10000 + Math.floor(Math.random() * 250000);

  return {
    id: (i + 1).toString(),
    time: pastDate.toISOString(),
    name: names[i % names.length],
    type: i % 2 === 0 ? "Income" : "Expense",
    amount,
    category: category.type, // just to mock category name
    createdAt: pastDate.toISOString(),
    initiator_user: initiators[i % initiators.length],
    transaction_type: category.transaction_type,
    description: "Generated purpose",
    destination_acc: "",
  };
});

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

  const searchParams = new URL(req.url).searchParams;
  const durationParam = searchParams.get("duration"); // Example: "30d"

  let dataResult: GetAllTransactionResponseItem[] = []

  if (durationParam === "30d") {
    dataResult = rows.filter(row => {
      const transactionDate = new Date(row.createdAt);
      const now = new Date();
      const thirtyDaysAgo = new Date(now);
      thirtyDaysAgo.setDate(now.getDate() - 30);
      return transactionDate >= thirtyDaysAgo;
    });
  }

  if (durationParam === "7d") {
    dataResult = rows.filter(row => {
      const transactionDate = new Date(row.createdAt);
      const now = new Date();
      const sevenDaysAgo = new Date(now);
      sevenDaysAgo.setDate(now.getDate() - 7);
      return transactionDate >= sevenDaysAgo;
    });
  }

  if (durationParam === "3m") {
    dataResult = rows.filter(row => {
      const transactionDate = new Date(row.createdAt);
      const now = new Date();
      const threeMonthsAgo = new Date(now);
      threeMonthsAgo.setMonth(now.getMonth() - 3);
      return transactionDate >= threeMonthsAgo;
    });
  }

  if (durationParam === "6m") {
    dataResult = rows.filter(row => {
      const transactionDate = new Date(row.createdAt);
      const now = new Date();
      const sixMonthsAgo = new Date(now);
      sixMonthsAgo.setMonth(now.getMonth() - 6);
      return transactionDate >= sixMonthsAgo;
    });
  }

  if (durationParam === "1y") {
    dataResult = rows.filter(row => {
      const transactionDate = new Date(row.createdAt);
      const now = new Date();
      const oneYearAgo = new Date(now);
      oneYearAgo.setFullYear(now.getFullYear() - 1);
      return transactionDate >= oneYearAgo;
    });
  }

  const response: GetAllTransactionResponse = {
    ok: true,
    message: "Pocket's transaction history has been fetched",
    code: 200,
    data: {
      saldoKemarin: "1234",
      saldoPenutupan: "5678",
      pemasukan: "91011",
      pengeluaran: "121314",
      transaksi: dataResult,
    },
  };

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}