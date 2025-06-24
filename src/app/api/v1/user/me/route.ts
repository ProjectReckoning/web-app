export interface RequestScheme {
  headers: {
    authorization: string;
  };
}

export interface ResponseScheme {
  ok: boolean;
  data: {
    name: string;
    id: string;
    phone_number?: string;
  };
}

export async function GET(req: Request) {
  const authorization = req.headers.get("authorization");

  if (!authorization) {
    return new Response(
      JSON.stringify({ message: "Missing authorization header" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const userData = {
    name: "Marcelino Sibarani Santozo",
    user_id: "1",
  };

  return new Response(
    JSON.stringify({
      ok: true,
      data: userData,
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
