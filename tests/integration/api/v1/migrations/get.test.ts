import database from "@src/infra/database";

beforeAll(cleanDatabase)

async function cleanDatabase() {
  await database.query("drop schema public cascade; create schema public;")
}

describe("GET /api/v1/migrations", () => {
  it("should return 200", async () => {
    database.query("SELECT * FROM pgmigrations");
    const response = await fetch("http://localhost:3000/api/v1/migrations");
    expect(response.status).toBe(200);

    const responseBody = await response.json();
    console.log(responseBody);
    expect(Array.isArray(responseBody)).toBe(true);
    expect(responseBody.length).toBeGreaterThan(0);
  });
});
