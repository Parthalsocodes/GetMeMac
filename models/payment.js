import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
  supporterName: {
    type: String,
    required: true,
  },
  message: {
    type: String,
  },
  amount: {
    type: Number,
    required: true,
  },
  razorpay_order_id: {
    type: String,
    required: true,
  },
  razorpay_payment_id: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "success",
  },
}, { timestamps: true });

export default mongoose.models.Payment ||
  mongoose.model("Payment", PaymentSchema);