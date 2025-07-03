import { NextRequest } from "next/server";

export interface RequestScheme{
    role: string;
}

export interface ResponseScheme{
    ok: boolean;
    data: {
        message: string;
        updatedMember: {
            user_id: number;
            new_role: string;
        };
    };
    message: string;
    code: number;
}

export async function PATCH(req: NextRequest): Promise<Response> {
  try {
    const url = new URL(req.url);
    const pathSegments = url.pathname.split("/");

    // Contoh path: /api/v1/pocket/1/members/2/role
    const pocketId = parseInt(pathSegments[pathSegments.indexOf("pocket") + 1]);
    const userId = parseInt(pathSegments[pathSegments.indexOf("members") + 1]);

    const body = await req.json();
    const newRole = body.role;

    if (!newRole) {
      return new Response(
        JSON.stringify({
          ok: false,
          message: "Role is required in the request body",
          code: 400,
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Validasi pocketId dan userId
    if (isNaN(pocketId) || isNaN(userId)) {
      return new Response(
        JSON.stringify({
          ok: false,
          message: "Invalid pocket ID or user ID",
          code: 400,
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Simulasi update response
    const updatedMember = {
      user_id: userId,
      new_role: newRole,
    };

    const response = {
      ok: true,
      data: {
        message: "Member role updated successfully",
        updatedMember,
      },
      message: "Member role updated successfully",
      code: 200,
    };

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        ok: false,
        message: `An error occurred while updating the member role : ${error instanceof Error ? error.message : "Unknown error"}`,
        code: 500,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
