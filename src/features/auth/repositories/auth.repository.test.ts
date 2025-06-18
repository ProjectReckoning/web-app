import authRepository from "./auth.repository";

describe("authRepository Integration Test", () => {
  it("should return sessionId if login success", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            message: "success",
            data: { sessionId: "abc123" },
          }),
        status: 200,
        ok: true,
      })
    ) as jest.Mock;
    const result = await authRepository.login("+628123456789", "testing");

    expect(result).toEqual({
      phone_number: "+628123456789",
      sessionId: "session-id",
    });
  });

  it("should throw error if credentials are wrong", async () => {
    await expect(
      authRepository.login("+628000000000", "wrong")
    ).rejects.toThrow();
  });
});
