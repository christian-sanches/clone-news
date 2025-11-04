describe("POST /api/v1/migrations", () => {
  it("should return 201", async () => {
    const response = await fetch("http://localhost:3000/api/v1/migrations", {
      method: "POST",
    });
    expect(response.status).toBe(201);
  });
});
