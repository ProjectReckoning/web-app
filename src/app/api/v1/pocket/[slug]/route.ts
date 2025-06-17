import { GetPocketDetailResponse, PocketDetailResponseItem, PocketStatus, PocketType } from "@/features/pocket/entities/get-pocket-detail-response";

const mockDetails: Record<number, PocketDetailResponseItem> = {
  1: {
    id: 1,
    name: "Liburan Bali",
    type: "spending" as PocketType,
    target_nominal: 5000000,
    current_balance: 3500000,
    deadline: "2025-08-15T00:00:00.000Z",
    status: "active" as PocketStatus,
    icon_name: "Airplane",
    color_hex: "#FF5722",
    account_number: "123456789",
    owner_user_id: 1,
    income: 1000000,
    outcome: 500000,
    owner: {
      id: 1,
      name: "Fernando",
      phone_number: "081234567890",
    },
    members: [
      {
        id: 2,
        name: "Ani Putri",
        phone_number: "081234567891",
        PocketMember: {
          id: 11,
          user_id: 2,
          pocket_id: 1,
          role: "admin",
          contribution_amount: 500000,
          joined_at: "2025-05-01T10:00:00.000Z",
          is_active: true,
          createdAt: "2025-05-01T10:00:00.000Z",
          updatedAt: "2025-05-20T10:00:00.000Z",
        },
      },
    ],
    user_role: "viewer",
  },
  2: {
    id: 2,
    name: "Dana Darurat",
    type: "saving" as  PocketType,
    target_nominal: 10000000,
    current_balance: 7000000,
    deadline: null,
    status: "active" as PocketStatus,
    icon_name: "Pocket",
    color_hex: "#4CAF50",
    account_number: "987654321",
    owner_user_id: 1,
    income: 7000000,
    outcome: 0,
    owner: {
      id: 1,
      name: "Fernando",
      phone_number: "081234567890",
    },
    members: [],
    user_role: "viewer",
  },
  3: {
    id: 3,
    name: "Bayar Utang",
    type: "spending" as PocketType,
    target_nominal: 200000,
    current_balance: 200000,
    deadline: "2025-06-10T00:00:00.000Z",
    status: "completed"  as PocketStatus,
    icon_name: "Pocket",
    color_hex: "#2196F3",
    account_number: "112233445",
    owner_user_id: 1,
    income: 200000,
    outcome: 200000,
    owner: {
      id: 1,
      name: "Fernando",
      phone_number: "081234567890",
    },
    members: [],
    user_role: "viewer",
  },
  6: {
    id: 6,
    name: "Liburan Bismillahhhhh",
    type: "spending" as PocketType,
    target_nominal: 1000000,
    current_balance: 1000000,
    deadline: "2025-12-31T00:00:00.000Z",
    status: "active" as PocketStatus,
    icon_name: "Pocket",
    color_hex: "#00BCD4",
    account_number: "950859915",
    owner_user_id: 1,
    income: 1000000,
    outcome: 0,
    owner: {
      id: 1,
      name: "Fernando",
      phone_number: "081234567890",
    },
    members: [
      {
        id: 4,
        name: "Dina Maharani",
        phone_number: "081234567894",
        PocketMember: {
          id: 17,
          user_id: 4,
          pocket_id: 6,
          role: "viewer",
          contribution_amount: null,
          joined_at: null,
          is_active: true,
          createdAt: "2025-06-10T12:00:00.000Z",
          updatedAt: "2025-06-15T12:00:00.000Z",
        },
      },
    ],
    user_role: "owner",
  },
};

export async function GET(_: Request, { params }: { params: { slug: string } }): Promise<Response> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const pocketId = parseInt(params.slug);
  const pocketDetail = mockDetails[pocketId];


  const response: GetPocketDetailResponse = {
    ok: true,
    message: "Pocket detail fetched successfully",
    code: 200,
    data: pocketDetail,
  };

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
