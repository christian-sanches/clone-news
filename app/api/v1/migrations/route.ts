import { NextResponse } from "next/server";
import { runner as migrationRunner } from "node-pg-migrate";
import { join } from "node:path";

export async function GET() {
  const migrations = await migrationRunner({
    databaseUrl: process.env.DATABASE_URL,
    dryRun: true,
    dir: join(process.cwd(), "infra", "migrations"),
    direction: "up",
    migrationsTable: "pgmigrations",
    verbose: true,
  });
  return NextResponse.json(migrations);
}

export async function POST() {
  const migrations = await migrationRunner({
    databaseUrl: process.env.DATABASE_URL,
    dryRun: true,
    dir: join(process.cwd(), "infra", "migrations"),
    direction: "up",
    migrationsTable: "pgmigrations",
    verbose: true,
  });
  return NextResponse.json(migrations, { status: 201 });
}
