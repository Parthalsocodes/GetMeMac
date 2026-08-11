import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/mongodb";
import  Payment from "@/models/payment"


export async function GET(){
    await connectDB()


const payments=await Payment.find({status:"success",})

const totalRaised=payments.reduce((sum,pay)=>sum+pay.amount,0)

return NextResponse.json({totalRaised})
}