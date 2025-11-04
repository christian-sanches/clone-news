import { NextResponse } from "next/server";
import migrationRunner from "node-pg-migrate";
// import db from '@src/infra/database';
import { join } from "node:path";

export async function GET() {
  const migrations = await migrationRunner({
    databaseUrl: process.env.DATABASE_URL,
    dryRun: true,
    dir: join("infra", "migrations"),
  });
  return NextResponse.json(migrations);
}
