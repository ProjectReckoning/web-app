// tests/pocket.repository.int.test.ts

import { ChangePocketMemberRoleResponse } from "../entities/patch-pocket-change-role";

describe("pocketRepository Integration Test", () => {
  beforeEach(() => {
    jest.resetModules();
    process.env.NEXT_PUBLIC_API_URL = "http://localhost:3000";
  });

  // Get All Pocket
  it("should return list of pockets", async () => {
    const pocketRepository = (await import("./pocket.repository")).default;

    const result = await pocketRepository.getAllPocket();

    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: expect.any(String),
        type: expect.any(String),
        targetNominal: expect.any(Number),
        currentBalance: expect.any(Number),
        deadline: expect.anything(),
        status: expect.any(String),
        icon: expect.any(String),
        color: expect.any(String),
        accountNumber: expect.any(String),
        userRole: expect.any(String),
        income: expect.any(Number),
        outcome: expect.any(Number),
      })
    );
  });

  // Change Pocket Member Role
  it("should change pocket member role successfully", async () => {
    const pocketRepository = (await import("./pocket.repository")).default;

    const pocketId = "1";
    const userId = "123";
    const role = "spender";

    const result: ChangePocketMemberRoleResponse =
      await pocketRepository.changePocketMemberRole(pocketId, userId, role);

    expect(result.ok).toBe(true);
    expect(result.code).toBe(200);
    expect(result.message).toBeDefined();
    expect(result.data.updatedMember).toEqual(
      expect.objectContaining({
        user_id: Number(userId),
        new_role: role,
      })
    );
  });

  // Get Pocket Detail
  it("should return pocket detail correctly", async () => {
    const pocketRepository = (await import("./pocket.repository")).default;
    const pocketId = "1";

    const result = await pocketRepository.getDetailPocket(pocketId);

    expect(result).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: expect.any(String),
        type: expect.any(String),
        targetNominal: expect.any(Number),
        balance: expect.any(Number),
        deadline: expect.any(Date),
        status: expect.any(String),
        icon: expect.any(String),
        color: expect.any(String),
        accountNumber: expect.any(String),
        income: expect.any(Number),
        outcome: expect.any(Number),
        ownerUserId: expect.any(Number),
        userRole: expect.any(String),
        members: expect.any(Array),
        owner: expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          phoneNumber: expect.any(String),
          metadata: expect.objectContaining({
            id: expect.any(Number),
            userId: expect.any(Number),
            pocketId: expect.any(Number),
            role: expect.any(String),
            contributionAmount: expect.any(Number),
            joinedAt: expect.any(String),
            isActive: expect.any(Boolean),
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
          }),
        }),
      })
    );
  });

  // Get Pocket Detail Error Handling
  it("should throw error if pocket detail not found", async () => {
    const pocketRepository = (await import("./pocket.repository")).default;

    const invalidId = "999"; // tidak ada di mockDetails

    await expect(pocketRepository.getDetailPocket(invalidId)).rejects.toThrow(
      `Pocket with ID ${invalidId} not found`
    );
  });


  // Patch Pocket
  it("should edit pocket successfully", async () => {
    const pocketRepository = (await import("./pocket.repository")).default;

    const pocketId = "1";
    const editData = {
      name: "diganti wleee",
      color: "#ABCDEF",
      icon: "NewIcon",
    };

    const result = await pocketRepository.patchDetailPocket(pocketId, editData);

    expect(result).toEqual(
      expect.objectContaining({
        name: expect.any(String),
        color: expect.any(String),
        icon: expect.any(String),
      })
    );
  });

  // Edit Pocket Error Handling
  it("should throw error when editing non-existent pocket", async () => {
    const pocketRepository = (await import("./pocket.repository")).default;

    const nonExistentId = "999";
    const editData = {
      name: "Gagal Edit",
      color: "#000000",
      icon: "FailIcon",
    };

    await expect(
      pocketRepository.patchDetailPocket(nonExistentId, editData)
    ).rejects.toThrow();
  });
});
