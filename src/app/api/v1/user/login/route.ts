export interface RequestScheme {
  phone_number: string,
  password: string
}

export interface ResponseScheme {
  message: string
  data: {
    session_id: string
  }
}

export async function POST(req: Request) {
  const { phone_number, password } = await req.json();

  if (!phone_number || !password) {
    return new Response(JSON.stringify({ message: 'Missing phone_number or password' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  if (phone_number !== "+628123456789" || password !== "testing") {
    return new Response(JSON.stringify({ message: 'Nomor HP atau Password salah' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const response = {
    message: "success",
    data: {
      sessionId: "session-id"
    }
  }

  // Mock loading delay 2 seconds
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}