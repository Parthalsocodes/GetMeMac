"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {

  const router=useRouter();


  return (
    <main className="min-h-screen bg-[#F5F5F7] text-[#1D1D1F]">

      {/* Navbar */}

      <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-xl border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">

          <h1 className="text-3xl font-bold cursor-pointer">
            GetMe<span className="text-blue-600">Mac</span>
          </h1>

          <div className="hidden md:flex items-center gap-10 font-medium">

            <Link href="/" className="text-blue-600">
              Home
            </Link>

            <Link href="/dashboard" >
              Dashboard
            </Link>

            <Link href="/about">
              About
            </Link>

            <Link  href="/supporter" >
              Supporters
            </Link>

          </div>

          <div className="flex items-center gap-5">

            <button onClick={()=>router.push("/login")} className="font-medium hover:text-blue-600 transition cursor-pointer">
              Sign Up
            </button>

            <button onClick={()=>router.push("/login")} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium transition cursor-pointer">
              Start Supporting
            </button>

          </div>

        </div>
      </nav>

      {/* Hero */}

      <section className="max-w-7xl mx-auto h-screen pt-20 px-6 min-h-screen flex items-center overflow-hidden">

        <div className="grid lg:grid-cols-2 gap-16 items-center w-full">

          {/* LEFT */}

          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >

            <p className="text-blue-600 font-semibold mb-5 tracking-wide">
              COMMUNITY POWERED
            </p>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight">

              One Mac.

              <br />

              Endless

              <br />

              Ideas.

            </h1>

            <p className="mt-8 text-gray-600 text-lg leading-8 max-w-xl">

             Every contribution helps transform ideas into real projects,
            </p>
            <p className="text-gray-600 text-lg leading-8 max-w-xl">

supports my growth as a developer, and fuels the next step
in my journey.
</p>

            <div className="flex gap-5 mt-10 flex-wrap">

              <button onClick={()=> router.push("/login")} className="bg-blue-600 hover:bg-blue-700 transition text-white px-8 py-4 rounded-full font-semibold flex items-center gap-2 cursor-pointer">

                Start Supporting

                <ArrowRight size={20} />

              </button>

              <button onClick={()=>router.push("/about")} className="border border-gray-300 px-8 py-4 rounded-full hover:bg-gray-200 transition cursor-pointer">

                Learn More

              </button>

            </div>

          </motion.div>

          {/* RIGHT */}

          <motion.div
 animate={{
  rotateY: 360,
}}
transition={{
  duration: 8,
  repeat: Infinity,
  ease: "linear",
}}
  style={{ perspective: 1000 }}
          >

            {/* Glow */}

            <div className="absolute w-[350px] h-[350px] bg-blue-300 rounded-full blur-[120px] opacity-40"></div>

            {/* Laptop Card */}

            <div className="relative rotate-[-10deg]">


              <Image
                src="/macbook1.png"
                alt="MacBook"
                width={580}
                height={300}
                className="rounded-2xl"
                priority
              />

            </div>

          </motion.div>

        </div>

      </section>

    </main>
  );
}

