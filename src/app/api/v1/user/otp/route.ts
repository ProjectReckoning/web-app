// interface RequestScheme {
//   session_id: string,
//   otp: string
// }

// interface ResponseScheme {
//   message: string
//   data: {
//     token: string
//   }
// }

export async function POST(req: Request) {
  const { session_id, otp } = await req.json();

  if (!session_id || !otp) {
    return new Response(JSON.stringify({ message: 'Missing session_id or otp' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  const data = [
    { token: "session-id" },
  ];

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}