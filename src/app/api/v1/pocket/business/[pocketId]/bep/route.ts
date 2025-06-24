export async function GET(req: Request): Promise<Response> {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulasi delay API

  const hasAuth = req.headers.get("Authorization");
  if (!hasAuth) {
    return new Response(
      JSON.stringify({
        ok: false,
        message: "Unauthorized",
        code: 401,
        data: null,
      }),
      {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const isProfit = Math.random() < 0.5;

  let data: object = {};

  if (isProfit) {
    const cleanProfit = Math.floor(Math.random() * 5_000_000 + 1_000_000);
    const profitPercentage = +(Math.random() * 50).toFixed(1);
    const averageDailyCleanProfit = Math.floor(cleanProfit / (10 + Math.random() * 20));
    const estimatedDaysToBEP = Math.floor(100 / (profitPercentage || 1));

    data = {
      status: "profit",
      cleanProfit,
      profitPercentage,
      averageDailyCleanProfit,
      estimatedDaysToBEP,
    };
  } else {
    const loss = Math.floor(Math.random() * 4_000_000 + 500_000);
    const averageDailyCleanProfit = -Math.floor(Math.random() * 100_000 + 10_000);

    data = {
      status: "loss",
      loss,
      averageDailyCleanProfit,
      projections: [
        {
          increaseRate: "10%",
          increasedIncome: 300_000 + Math.floor(Math.random() * 100_000),
          projectedDailyProfit: 10_000 + Math.floor(Math.random() * 10_000),
          estimatedDaysToCoverLoss: Math.floor(loss / (10_000 + Math.random() * 10_000)),
        },
        {
          increaseRate: "20%",
          increasedIncome: 330_000 + Math.floor(Math.random() * 100_000),
          projectedDailyProfit: 40_000 + Math.floor(Math.random() * 10_000),
          estimatedDaysToCoverLoss: Math.floor(loss / (40_000 + Math.random() * 10_000)),
        },
      ],
    };
  }

  return new Response(
    JSON.stringify({
      ok: true,
      message: "Financial summary data has been mocked successfully",
      code: 200,
      data,
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
