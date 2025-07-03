jest.setTimeout(999999);

describe("authRepository Integration Test", () => {
  beforeEach(() => {
    jest.resetModules();
    process.env.NEXT_PUBLIC_API_URL = "http://localhost:3000";
  });

  it("should return sessionId if login success", async () => {
    const authRepository = (await import("./auth.repository")).default;

    const result = await authRepository.login("+628123456789", "testing");

    expect(result).toEqual(
      expect.objectContaining({
        phone_number: expect.any(String),
        sessionId: expect.any(String),
      })
    );
  });

  it("should throw error if credentials are wrong", async () => {
    const authRepository = (await import("./auth.repository")).default;

    await expect(
      authRepository.login("+628000000000", "wrong")
    ).rejects.toThrow();
  });


  it("should return user data if me is called", async ()=> {
    const authRepository = (await import("./auth.repository")).default;

    const result = await authRepository.me();
    expect(result).toEqual({
      id: expect.any(String),
      name: expect.any(String),
    })
  });
});
