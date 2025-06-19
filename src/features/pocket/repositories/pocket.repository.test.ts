// tests/pocket.repository.int.test.ts

jest.setTimeout(99999);

describe("pocketRepository Integration Test", () => {
    beforeEach(() => {
      jest.resetModules();
      process.env.NEXT_PUBLIC_API_URL = "http://localhost:3000";
    });
  
    // it("should return list of pockets", async () => {
    //   const pocketRepository = (await import("./pocket.repository")).default;
  
    //   const result = await pocketRepository.getAllPocket();
  
    //   expect(Array.isArray(result)).toBe(true);
    //   expect(result[0]).toEqual(
    //     expect.objectContaining({PocketEntity: expect.any        })
    //   );
    // });
  
    // it("should return pocket detail", async () => {
    //   const pocketRepository = (await import("./pocket.repository")).default;
  
    //   const pocketId = "1"; // sesuaikan ID dummy yang tersedia di backend mock
    //   const result = await pocketRepository.getDetailPocket(pocketId);
  
    //   expect(result).toEqual(
    //     expect.objectContaining({
    //       id: expect.any(String),
    //       name: expect.any(String),
    //       type: expect.any(String),
    //       targetNominal: expect.any(Number),
    //       balance: expect.any(Number),
    //       deadline: expect.anything(),
    //       status: expect.any(String),
    //       icon: expect.any(String),
    //       color: expect.any(String),
    //       accountNumber: expect.any(String),
    //       ownerUserId: expect.any(Number),
    //       income: expect.any(Number),
    //       outcome: expect.any(Number),
    //       owner: expect.objectContaining({
    //         id: expect.any(Number),
    //         name: expect.any(String),
    //         phoneNumber: expect.any(String),
    //       }),
    //       members: expect.any(Array),
    //       userRole: expect.any(String),
    //     })
    //   );
    // });
  
    it("should change pocket member role successfully", async () => {
      const pocketRepository = (await import("./pocket.repository")).default;
    
      const pocketId = "1";
      const userId = "2";
      const role = "spender";
    
      const result = await pocketRepository.changePocketMemberRole(pocketId, userId, role);
    
      expect(result).toEqual(
        expect.objectContaining({
          ok: true,
          code: 200,
          message: expect.any(String),
          data: expect.objectContaining({
            message: expect.any(String),
            updatedMember: expect.objectContaining({
              user_id: expect.any(Number),
              new_role: role,
            }),
          }),
        })
      );
    });
    
  
    // it("should throw error if getAllPocket fails", async () => {
    //   const pocketRepository = (await import("./pocket.repository")).default;
  
    //   process.env.NEXT_PUBLIC_API_URL = "http://invalid-url";
  
    //   await expect(pocketRepository.getAllPocket()).rejects.toThrow("Failed to fetch pockets");
    // });
  });
  