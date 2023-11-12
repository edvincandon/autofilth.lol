import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const res = req.nextUrl.clone();
  const status = (formData.get("status") as string | null) ?? "200";
  const mode = (formData.get("mode") as string | null) ?? "form_submit:action";
  const definition = formData.get("definition") as string;

  if (mode === "form_submit:action") {
    res.pathname = `/form`;
    res.searchParams.append("response_status", status);
    res.searchParams.append("definition", definition);
    return NextResponse.redirect(res, { status: 302 });
  }

  return NextResponse.json(
    { ok: status === "200" },
    { status: parseInt(status, 10) }
  );
}
