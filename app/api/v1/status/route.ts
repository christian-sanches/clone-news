import db from "@src/infra/database";
import { NextResponse } from "next/server";

export async function GET() {
  const updated_at = new Date().toISOString();
  const result = await db.query("SELECT version();");
  const resultSettings = await db.query("SHOW max_connections;");

  const databaseName = process.env.POSTGRES_DB;

  const resultStatus = await db.query({
    text: "SELECT count(*)::int FROM pg_stat_activity where datname = $1;",
    values: [databaseName],
  });

  const version = result.rows[0].version.split(" ")[1];
  const { max_connections } = resultSettings.rows[0];
  const { count } = resultStatus.rows[0];

  return NextResponse.json({
    updated_at,
    dependencies: {
      database: {
        version,
        max_connections: Number(max_connections),
        active_connections: count,
      },
    },
  });
}
