import { NextResponse } from "next/server";
import crypto from "crypto"
import { connectDB } from "../../../../lib/mongodb";
import Payment from "../../../../models/payment";


export async function POST(req){
    const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    supporterName,
    message,
    selectedAmount,

} = await req.json();

const body =
razorpay_order_id + "|" + razorpay_payment_id;

const expectedSignature =
crypto
.createHmac("sha256", process.env.RAZORPAY_SECRET)
.update(body)
.digest("hex");

if (expectedSignature === razorpay_signature) {
try{
  await connectDB();
  console.log({supporterName,message,selectedAmount})

  await Payment.create({
     supporterName: supporterName,
    message: message,
    amount: selectedAmount,
    razorpay_order_id,
    razorpay_payment_id,
    status: "success",
  });

  console.log("Saved successfully");
} catch (error) {
  console.error(error);

}

return NextResponse.json({
    success: true,
    message: "Payment verified",
  });
}
return NextResponse.json(
  {
    success: false,
    message: "Invalid payment signature",
  },
  { status: 400 }
);


}