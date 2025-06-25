import { GetStatsResponse, GetStatsResponseItem } from "@/features/insight/entities/response/get-stats";

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

  const query = new URL(req.url).searchParams;
  const type = query.get("type")
  const data: GetStatsResponseItem[] = [
    {
      "x": [
        "Jan 2024",
        "Feb 2024",
        "Mar 2024"
      ],
      "label": type ?? "Bulanan",
      "series": {
        "pemasukan": {
          "data": [
            100000,
            200000,
            150000
          ],
          "color": "#81c784"
        },
        "pengeluaran": {
          "data": [
            50000,
            80000,
            60000
          ],
          "color": "#ff6384"
        }
      }
    }
  ]

  const response: GetStatsResponse = {
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