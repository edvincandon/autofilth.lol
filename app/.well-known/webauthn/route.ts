import { NextResponse } from "next/server";

const origins = [
  "https://autofilth.lol",
  "https://www.autofilth.lol",
  "https://vomit.autofilth.lol",
  "https://subfilthy.autofilth.lol",
  "https://autoslave.autofilth.lol",
];

export function GET() {
  return NextResponse.json({ origins });
}
