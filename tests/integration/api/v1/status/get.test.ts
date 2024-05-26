import { StatusSchema } from "@src/models/status";
describe("GET /api/v1/status", () => {
  it("should return 200", async () => {
    const response = await fetch("http://localhost:3000/api/v1/status");
    expect(response.status).toBe(200);
  });

  it("should return a valid response", async () => {
    const response = await fetch("http://localhost:3000/api/v1/status");
    const responseBody = await response.json();
    const parsedStatus = StatusSchema.safeParse(responseBody);

    expect(parsedStatus.success).toBe(true);

    expect(responseBody.updated_at).toBeDefined();
    const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();

    expect(parsedUpdatedAt).toBe(responseBody.updated_at);
    expect(responseBody.dependencies.database.version).toBeDefined();
    expect(typeof responseBody.dependencies.database.max_connections).toBe(
      "number",
    );
    expect(typeof responseBody.dependencies.database.active_connections).toBe(
      "number",
    );

    expect(responseBody).toMatchObject({
      updated_at: parsedUpdatedAt,
      dependencies: {
        database: {
          version: expect.any(String),
          max_connections: expect.any(Number),
          active_connections: expect.any(Number),
        },
      },
    });
  });
});
