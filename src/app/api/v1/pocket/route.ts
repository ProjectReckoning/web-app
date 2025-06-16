// ---
// Enums for PocketType and PocketStatus for type safety
export enum PocketType {
  Spending = "spending",
  Saving = "saving",
  Investment = "investment",
}

export enum PocketStatus {
  Active = "active",
  Inactive = "inactive",
  Completed = "completed",
}

// ---
// The Pocket type definition (as provided in your prompt)
export type Pocket = {
  pocket_id: number;
  name: string;
  type: PocketType;
  target_nominal: number;
  current_balance: number;
  deadline: Date | null;
  status: PocketStatus;
  icon_name: string;
  color_hex: string;
  account_number: string;
  user_role: string;
};

// ---
// Mock Database (in-memory for demonstration)
// In a real application, this would interact with a database
const pockets: Pocket[] = [
  {
    pocket_id: 1,
    name: "Liburan Bali",
    type: PocketType.Spending,
    target_nominal: 5000000,
    current_balance: 3500000,
    deadline: new Date("2025-08-15T00:00:00.000Z"),
    status: PocketStatus.Active,
    icon_name: "material-symbols:money-bag-outline",
    color_hex: "#FF5722",
    account_number: "123456789",
    user_role: "user",
  },
  {
    pocket_id: 2,
    name: "Dana Darurat",
    type: PocketType.Saving,
    target_nominal: 10000000,
    current_balance: 7000000,
    deadline: null, // No specific deadline
    status: PocketStatus.Active,
    icon_name: "material-symbols:money-bag-outline",
    color_hex: "#4CAF50",
    account_number: "987654321",
    user_role: "user",
  },
  {
    pocket_id: 3,
    name: "Bayar Utang",
    type: PocketType.Spending,
    target_nominal: 200000,
    current_balance: 200000,
    deadline: new Date("2025-06-10T00:00:00.000Z"),
    status: PocketStatus.Completed,
    icon_name: "material-symbols:money-bag-outline",
    color_hex: "#2196F3",
    account_number: "112233445",
    user_role: "user",
  },
  // Your provided example data, modified for types
  {
    pocket_id: 6,
    name: "Liburan Bismillahhhhh",
    type: PocketType.Spending,
    target_nominal: 1000000,
    current_balance: 1000000,
    deadline: new Date("2025-12-31T00:00:00.000Z"),
    status: PocketStatus.Active,
    icon_name: "material-symbols:money-bag-outline",
    color_hex: "#00BCD4",
    account_number: "950859915",
    user_role: "owner" // Assuming a default user_role
  },
];

// ---
// Request and Response Schemes for API Endpoints

// GET /api/pockets
export interface GetPocketsResponse {
  message: string;
  data: Pocket[];
}

// POST /api/pockets
export interface AddPocketRequest {
  name: string;
  type: PocketType;
  target_nominal: number;
  current_balance: number;
  deadline?: string | null; // Optional, can be string for parsing or null
  status: PocketStatus;
  icon_name: string;
  color_hex: string;
  account_number: string;
  user_role: string;
}

export interface AddPocketResponse {
  message: string;
  data: Pocket;
}

// ---
// API Route Handlers

/**
 * Handles GET requests to retrieve a list of pockets.
 * This simulates fetching all pockets from a database.
 */
export async function GET(): Promise<Response> {
  // Mock loading delay 0.5 seconds
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const response: GetPocketsResponse = {
    message: "success",
    data: pockets,
  };

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

/**
 * Handles POST requests to add a new pocket.
 * This simulates creating a new pocket entry in a database.
 */
export async function POST(req: Request): Promise<Response> {
  const {
    name,
    type,
    target_nominal,
    current_balance,
    deadline,
    status,
    icon_name,
    color_hex,
    account_number,
    user_role,
  }: AddPocketRequest = await req.json();

  // Basic validation
  if (
    !name ||
    !type ||
    target_nominal === undefined ||
    current_balance === undefined ||
    !status ||
    !icon_name ||
    !color_hex ||
    !account_number ||
    !user_role
  ) {
    return new Response(JSON.stringify({ message: "Missing required fields" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Type validation for enums
  if (!Object.values(PocketType).includes(type)) {
    return new Response(JSON.stringify({ message: `Invalid pocket type: ${type}` }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!Object.values(PocketStatus).includes(status)) {
    return new Response(JSON.stringify({ message: `Invalid pocket status: ${status}` }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Generate a new unique ID (mocking database auto-increment)
  const newPocketId = pockets.length > 0 ? Math.max(...pockets.map(p => p.pocket_id)) + 1 : 1;

  // Convert deadline string to Date object if provided
  const parsedDeadline: Date | null = deadline ? new Date(deadline) : null;

  const newPocket: Pocket = {
    pocket_id: newPocketId,
    name,
    type,
    target_nominal,
    current_balance,
    deadline: parsedDeadline,
    status,
    icon_name,
    color_hex,
    account_number,
    user_role,
  };

  pockets.push(newPocket); // Add to our mock "database"

  // Mock loading delay 1 second
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const response: AddPocketResponse = {
    message: "Pocket added successfully",
    data: newPocket,
  };

  return new Response(JSON.stringify(response), {
    status: 201, // 201 Created for successful POST
    headers: { "Content-Type": "application/json" },
  });
}