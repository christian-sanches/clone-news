import db from "infra/database";
import { NextResponse } from "next/server";

export async function GET() {
  const result = await db.query("SELECT 1 + 1 as sum;");
  console.log(result.rows);
  return NextResponse.json({
    message: "Alunos do curso.dev são pessoas acima da média",
  });
}
