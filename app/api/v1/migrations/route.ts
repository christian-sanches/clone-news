import database from "@src/infra/database";
import { NextResponse } from "next/server";
import { runner as migrationRunner, RunnerOption } from "node-pg-migrate";
import { join } from "node:path";

const migrationSettings: Omit<RunnerOption, "databaseUrl"> = {
  dir: join(process.cwd(), "infra", "migrations"),
  direction: "up",
  migrationsTable: "pgmigrations",
  verbose: true,
}

export async function GET() {
  const dbClient = await database.getNewClient();
  const pendingMigrations = await migrationRunner({
    ...migrationSettings,
    dbClient,
    dryRun: true,
  });
  await dbClient.end();
  return NextResponse.json(pendingMigrations);
}

export async function POST() {
  const dbClient = await database.getNewClient();

  const migratedMigrations = await migrationRunner({
    ...migrationSettings,
    dbClient,
  });
  await dbClient.end();
  return NextResponse.json(migratedMigrations, { status: migratedMigrations.length > 0 ? 201 : 200 });
}
