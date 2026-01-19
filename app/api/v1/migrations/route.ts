import { NextResponse } from "next/server";
import { runner as migrationRunner, RunnerOption } from "node-pg-migrate";
import { join } from "node:path";

const migrationSettings: RunnerOption = {
  databaseUrl: process.env.DATABASE_URL,
  dir: join(process.cwd(), "infra", "migrations"),
  direction: "up",
  migrationsTable: "pgmigrations",
  verbose: true,
}

export async function GET() {
  const pendingMigrations = await migrationRunner({
    ...migrationSettings,
    dryRun: true,
  });
  return NextResponse.json(pendingMigrations);
}

export async function POST() {
  const migratedMigrations = await migrationRunner(migrationSettings);
  return NextResponse.json(migratedMigrations, { status: migratedMigrations.length > 0 ? 201 : 200 });
}
