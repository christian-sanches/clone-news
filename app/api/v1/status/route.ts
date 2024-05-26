import db from "@src/infra/database";
import { NextResponse } from "next/server";

export async function GET() {
  const updated_at = new Date().toISOString();
  const result = await db.query("SELECT version();");
  const resultSettings = await db.query("SHOW max_connections;");
  const resultStatus = await db.query("SELECT * FROM pg_stat_activity;");

  const version = result.rows[0].version.split(" ")[1];
  const { max_connections } = resultSettings.rows[0];
  const { length } = resultStatus.rows;

  return NextResponse.json({
    updated_at,
    database: {
      version,
      max_connections: Number(max_connections),
      active_connections: length,
    },
  });
}
