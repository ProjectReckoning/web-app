describe("authRepository Integration Test", () => {
  beforeEach(() => {
    jest.resetModules();
    process.env.NEXT_PUBLIC_API_URL = "http://localhost:3000";
  });

  it("should return sessionId if login success", async () => {
    const authRepository = (await import("./auth.repository")).default;

    const result = await authRepository.login("+628123456789", "testing");

    expect(result).toEqual({
      phone_number: "+628123456789",
      sessionId: "session-id",
    });
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
      id: "123",
      name: "Marcelino Sibarani Santozo",
      phone_number: "628123456789"
    })
  });
});
