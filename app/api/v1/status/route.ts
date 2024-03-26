import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "Alunos do curso.dev são pessoas acima da média",
  });
}
