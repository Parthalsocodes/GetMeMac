"use client"

import { useState } from 'react';
import Script from "next/script";
import Router, { useRouter } from 'next/navigation';
import { useSession, signIn, signOut } from "next-auth/react"
import {
    IndianRupee,
    Bell,
    User,
    Heart,
    ArrowUpRight,
    LogOut,
} from "lucide-react";

const page = () => {
  const router=useRouter()
    const handlePayment = async () => {
      if(!supporterName.trim()){
        alert("Please enter your name")
        return;
      }
  const res = await fetch("/api/auth/create-order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: selectedAmount, // ₹500
    }),
  });


  const order = await res.json();

  const checkoutoptions = {
    key: process.env.NEXT_PUBLIC_RAZORPAY_ID,
    amount: order.amount,
    currency: order.currency,
    name: "GetMeMac",
    description: "Support Payment",
    order_id: order.id,


    handler: async function (response:any) {
      const res=await fetch("/api/auth/verify-payment",{
        method:"POST",
        headers:{
          "Content-Type":
          "application/json",

        },
        body:JSON.stringify({...response,supporterName,message,selectedAmount,}),
      })
      const data=await res.json()
      if(data.success){
        alert("Payment Successfull")
        router.push("/supporter")
      }
      console.log(data)
    },

    theme: {
      color: "#2563EB",
    },
  };

  

  const razor = new (window as any).Razorpay(checkoutoptions);

  razor.on("payment.failed", function (response:any) {
    console.log(response);
    alert("Payment Failed");
  });

razor.open();

  
};


     const [selectedAmount, setSelectedAmount] = useState(500);
     const [supporterName, setsupporterName] = useState("");
     const [message, setMessage] = useState("");
     
  const [customAmount, setCustomAmount] = useState("");

  const amounts = [100, 250, 500, 1000];
    const session=useSession().data
  return (
    <>
    <Script src="https://checkout.razorpay.com/v1/checkout.js" />

        <main className="h-screen bg-[#F5F5F7] text-[#1D1D1F] overflow-y-auto no-scrollbar">

      {/* ================= Navbar ================= */}

      <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-xl border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">

          

          <h1 onClick={()=>router.push("/")} className="text-3xl font-bold cursor-pointer">
            Get<span className="text-blue-600">MeMac</span>
          </h1>

          <div className="hidden md:flex items-center gap-10 font-medium">

            <a href="/" className="hover:text-blue-600 transition">
              Home
            </a>

            <a href="/dashboard" className="hover:text-blue-600 transition">
              Dashboard
            </a>

            <a href="/about" className="hover:text-blue-600 transition">
              About
            </a>

            <a href="/supporter" className="hover:text-blue-600 transition">
              Supporters
            </a>

          </div>

          <div className="flex items-center gap-4">

             <img className='w-10 h-10 rounded-full' src={session?.user?.image || "."} alt="Profile" referrerPolicy="no-referrer" />

             <h1>{session?.user?.name}</h1>
             
            <button className="px-5 py-2 rounded-full border border-red-200 bg-red-50 text-red-600 font-semibold hover:bg-red-600 hover:text-white transition">
              Sign Out
            </button>

          </div>

        </div>
      </nav>

      {/* ================= Hero ================= */}

      <section className="max-w-6xl mx-auto pt-30 px-6">

        <div className="text-center">

          <Heart
            className="mx-auto text-blue-600"
            size={42}
            fill="#2563EB"
          />

          <h1 className="text-5xl font-bold mt-5">

            Support the Journey

          </h1>

          <p className="text-gray-500 mt-5 text-lg max-w-2xl mx-auto leading-8">

            Every contribution helps build better apps,
            learn new technologies and bring
            bigger ideas to life.

          </p>

        </div>

        {/* ================= Amount ================= */}

        <div className="mt-4">

          <h2 className="text-2xl font-semibold mb-8">

            Choose an Amount

          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

            {amounts.map((amount) => (

              <button
                key={amount}
                onClick={() => {
                  setSelectedAmount(amount);
                  setCustomAmount("");
                }}
                className={`rounded-3xl border-2 p-8 transition shadow-sm hover:shadow-lg ${
                  selectedAmount === amount && customAmount === ""
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200 bg-white"
                }`}
              >

                <IndianRupee
                  className="mx-auto mb-4 text-blue-600"
                  size={28}
                />

                <h2 className="text-3xl font-bold">

                  {amount}

                </h2>

                <p className="text-gray-500 mt-2">

                  Support

                </p>

              </button>

            ))}

          </div>

        </div>

        {/* ================= Custom Amount ================= */}

        <div className="mt-10">

          <h2 className="text-2xl font-semibold mb-5">

            Or Enter Custom Amount

          </h2>

          <div className="relative">

            <IndianRupee
              className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
              size={22}
            />

            <input
              type="number"
              min={1}
              placeholder="Enter amount"
              value={customAmount}
              onChange={(e) => {
                setCustomAmount(e.target.value);
                setSelectedAmount(Number(e.target.value));
              }}
              className="w-full bg-white rounded-2xl border border-gray-300 py-5 pl-14 pr-5 outline-none text-xl focus:border-blue-600 transition"
            />

          </div>

        </div>

      </section>

      {/* ================= Message + Summary ================= */}
     

<div className="grid lg:grid-cols-2 gap-8 mt-12 mx-20">

  {/* Leave a Message */}

  <div className="bg-white rounded-3xl border border-gray-300 shadow-sm px-8 py-6">
     <div>
  <h2 className="text-2xl font-semibold mb-4">
    Your Name
  </h2>

  <input
    type="text"
    placeholder="Enter your name"
    value={supporterName}
    onChange={(e) => setsupporterName(e.target.value)}
    className="w-full rounded-2xl border border-gray-300 p-4 outline-none focus:border-blue-600"
  />
</div>

    <h2 className="text-2xl font-semibold mt-5">
      Leave a Message
    </h2>

    <p className="text-gray-500 mt-3">
      Your message will appear publicly with your support.
    </p>

    <textarea
  rows={8}
  value={message}
  onChange={(e) => setMessage(e.target.value)}
  placeholder="Keep building amazing products 🚀"
  className="w-full resize-none rounded-2xl border border-gray-300 p-4 mt-3 outline-none focus:border-blue-600 transition"
/>

  </div>

  {/* Payment Summary */}

  <div className="bg-white rounded-3xl border border-gray-300 shadow-sm p-8 flex flex-col justify-between">

    <div className='mt-6'>

      <h2 className="text-2xl font-semibold">
        Payment Summary
      </h2>

      <div className="mt-8 space-y-5">

        <div className="flex justify-between">

          <span className="text-gray-500">
            Donation
          </span>

          <span className="font-semibold text-xl">
            ₹ {selectedAmount || 0}
          </span>

        </div>

        <div className="flex justify-between">

          <span className="text-gray-500">
            Platform Fee
          </span>

          <span className="font-semibold">
            ₹0
          </span>

        </div>

        <hr />

        <div className="flex justify-between text-2xl font-bold">

          <span>Total</span>

          <span className="text-blue-600">
            ₹ {selectedAmount || 0}
          </span>

        </div>

      </div>

    </div>

    <button onClick={handlePayment}
      className="mb-10 w-full bg-blue-600 hover:bg-blue-700 text-white rounded-2xl py-4 font-semibold text-lg transition duration-300 hover:scale-[1.02]"
    >
      ❤️ Continue to Payment
    </button>

  </div>

</div>

{/* ================= Small Note ================= */}

<div className="text-center mt-12 mb-12">

  <p className="text-gray-500">
    Payments are processed securely. Your support directly contributes
    towards achieving the MacBook goal.
  </p>

</div>

    </main>
    </>
  )
  
}
export default page
