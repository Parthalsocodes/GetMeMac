"use client";
import React from 'react'
import Link from "next/link";
import { ArrowLeft, Eye, Mail, Lock } from "lucide-react";
import { useSession, signIn, signOut } from "next-auth/react"


const login = () => {
  return (
    <main className="min-h-screen bg-[#09090B] text-white flex items-center justify-center px-6">

      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[450px] h-[450px] bg-blue-500/20 blur-[140px] rounded-full"></div>
      </div>

      {/* Back Button */}
      <Link
        href="/"
        className="absolute top-8 left-8 flex items-center gap-2 text-gray-400 hover:text-white transition"
      >
        <ArrowLeft size={20} />
        Back
      </Link>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">

        <h1 className="text-4xl font-bold text-center">
          Welcome Back
        </h1>

        <p className="text-gray-400 text-center mt-3 mb-10">
          Continue your support journey.
        </p>

        {/* Email */}
       

        {/* Remember */}
      

        

        {/* Google */}
        <button onClick={()=>signIn("google",{callbackUrl:"/dashboard"})} className="w-full border border-white/10 rounded-xl py-4 hover:bg-white/5 transition my-4">
          Continue with Google
        </button>
        <button onClick={()=>signIn("github",{callbackUrl:"/dashboard"})} className="w-full border border-white/10 rounded-xl py-4 hover:bg-white/5 transition">
          Continue with GitHub 
        </button>

        <p className="text-center text-gray-400 mt-8">
          Don't have an account?{" "}
          <span className="text-blue-500 cursor-pointer">
            Sign Up
          </span>
        </p>

      </div>

    </main>
  );
}

export default login
