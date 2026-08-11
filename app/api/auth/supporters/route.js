import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Payment from "@/models/payment";

export async function GET() {
  await connectDB();

  const supporters = await Payment.find({
    status: "success",
  }).sort({ createdAt: -1 });

  return NextResponse.json(supporters);
}