import { GetAllTransactionResponse, GetAllTransactionResponseItem } from "@/features/insight/entities/response/get-all-transaction";

const rows: GetAllTransactionResponseItem[] = Array.from({ length: 50 }, (_, i) => {
    const isEven = i % 2 === 0;

    const now = new Date();
    const pastDate = new Date(now);
    pastDate.setDate(now.getDate() - Math.floor(Math.random() * 365));

    pastDate.setHours(Math.floor(Math.random() * 24));
    pastDate.setMinutes(Math.floor(Math.random() * 60));
    pastDate.setSeconds(Math.floor(Math.random() * 60));

    return {
      id: (i + 1).toString(),
      time: pastDate.toISOString(),
      name: isEven ? 'Ivanka Larasati' : 'Dimas Aryo',
      type: isEven ? 'Contribution' : 'Payment',
      amount: isEven
        ? 1000000 + i * 10000
        : 750000 + i * 5000,
      category: isEven ? 'Penjualan' : 'Gaji',
      created_at: pastDate.toISOString(),
      initiator_user: isEven ? 'John Doe' : 'Jane Smith',
      transaction_type: isEven ? 1 : 0,
      purpose: isEven ? 'Monthly saving' : 'Office supplies',
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
      const transactionDate = new Date(row.created_at);
      const now = new Date();
      const thirtyDaysAgo = new Date(now);
      thirtyDaysAgo.setDate(now.getDate() - 30);
      return transactionDate >= thirtyDaysAgo;
    });
  }

  if (durationParam === "7d") {
    dataResult = rows.filter(row => {
      const transactionDate = new Date(row.created_at);
      const now = new Date();
      const sevenDaysAgo = new Date(now);
      sevenDaysAgo.setDate(now.getDate() - 7);
      return transactionDate >= sevenDaysAgo;
    });
  }

  if (durationParam === "3m") {
    dataResult = rows.filter(row => {
      const transactionDate = new Date(row.created_at);
      const now = new Date();
      const threeMonthsAgo = new Date(now);
      threeMonthsAgo.setMonth(now.getMonth() - 3);
      return transactionDate >= threeMonthsAgo;
    });
  }

  if (durationParam === "6m") {
    dataResult = rows.filter(row => {
      const transactionDate = new Date(row.created_at);
      const now = new Date();
      const sixMonthsAgo = new Date(now);
      sixMonthsAgo.setMonth(now.getMonth() - 6);
      return transactionDate >= sixMonthsAgo;
    });
  }

  if (durationParam === "1y") {
    dataResult = rows.filter(row => {
      const transactionDate = new Date(row.created_at);
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
      saldo_kemarin: 1234,
      saldo_penutupan: 5678,
      total_pemasukan: 91011,
      total_pengeluaran: 121314,
      transaksi: dataResult,
    },
  };

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}