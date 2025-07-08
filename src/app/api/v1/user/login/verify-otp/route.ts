export interface RequestScheme {
  phone_number: string;
  sessionId: string;
  otp: string;
}

export interface ResponseScheme {
  message: string;
  data: {
    token: string;
  };
}

export async function POST(req: Request) {
  const { sessionId, otp, phone_number } = await req.json();

  if (!sessionId || !otp || !phone_number) {
    return new Response(
      JSON.stringify({ message: "Missing sessionId, otp or phone_number" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  if (otp.length !== 6 || otp !== "123456") {
    return new Response(JSON.stringify({ message: "Invalid OTP" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const data = { token: "session-id" };

  return new Response(
    JSON.stringify({
      message: "OTP verified successfully",
      data,
    }),
    {
      status: 201,
      headers: { "Content-Type": "application/json" },
    }
  );
}
