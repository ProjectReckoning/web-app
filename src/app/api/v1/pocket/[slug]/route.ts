import { GetPocketDetailResponse, PocketDetailResponseItem, PocketStatus, PocketType } from "@/features/pocket/entities/get-pocket-detail-response";

const mockPocketDetail: PocketDetailResponseItem = {
  id: 8,
  name: "Donat Bahagia",
  type: "business" as PocketType.Business,
  target_nominal: 1000000,
  current_balance: 1000000,
  deadline: "2025-12-31T00:00:00.000Z",
  status: "active" as PocketStatus.Active,
  icon_name: "flight_takeoff",
  color_hex: "#00BCD4",
  account_number: "648946893",
  owner_user_id: 2,
  owner: {
    id: 2,
    name: "Siti Nurhaliza",
    phone_number: "081234567891",
  },
  members: [
    {
      id: 3,
      name: "Budi Santoso",
      phone_number: "081234567892",
      PocketMember: {
        id: 15,
        user_id: 3,
        pocket_id: 8,
        role: "admin",
        contribution_amount: null,
        joined_at: null,
        is_active: null,
        createdAt: "2025-06-16T06:52:27.702Z",
        updatedAt: "2025-06-16T08:41:50.579Z",
      },
    },
    {
      id: 3,
      name: "Orang biasa saja",
      phone_number: "081234567892",
      PocketMember: {
        id: 15,
        user_id: 3,
        pocket_id: 8,
        role: "viewer",
        contribution_amount: null,
        joined_at: null,
        is_active: null,
        createdAt: "2025-06-16T06:52:27.702Z",
        updatedAt: "2025-06-16T08:41:50.579Z",
      },
    },
  ],
  user_role: "owner",
};

export async function GET(): Promise<Response> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const response: GetPocketDetailResponse = {
    ok: true,
    message: "Pocket detail fetched successfully",
    code: 200,
    data: mockPocketDetail,
  };

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
