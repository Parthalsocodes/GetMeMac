"use client"
import { useEffect, useState } from 'react';
import React, { useCallback } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { motion } from "framer-motion";
import { useRouter } from 'next/navigation';
import {
    Bell,
    User,
    Heart,
    ArrowUpRight,
    LogOut,
    Router,
} from "lucide-react";
import { Session } from 'inspector/promises';
import { navigate } from 'next/dist/client/components/segment-cache/navigation';

const page = () => {
    const [moneyraised, setMoneyraised] = useState(0)
    useEffect(() => {
        const fetchstats = async () => {
            const res = await fetch("/api/auth/stats")
            const data = await res.json()

            setMoneyraised(data.totalRaised)

        }
        fetchstats()
    }, [])

    const goal = 120000;
    const remaining =Math.max(0,goal - moneyraised)

    const percentage = Math.min((moneyraised / goal) * 100, 100)


    const router = useRouter()
    const session = useSession().data
    return (
        <main className="h-screen bg-[#F5F5F7] text-[#1D1D1F] overflow-y-hidden">

            {/* ================= Navbar ================= */}

            <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-xl border-b border-gray-200 z-50">
                <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">

                    <h1 onClick={()=>router.push("/")} className="text-3xl font-bold cursor-pointer">
                        GetMe<span className="text-blue-600">Mac</span>
                    </h1>

                    <div className="hidden md:flex items-center gap-10 font-medium">

                        <a href="/">
                            Home
                        </a>

                        <a href="/dashboard" className="text-blue-600">
                            Dashboard
                        </a>

                        <a href="/about">
                            About
                        </a>

                        <a href="/supporter">
                            Supporters
                        </a>

                    </div>

                    <div className="flex items-center gap-3">

                        <img className='w-10 h-10 rounded-full' src={session?.user?.image || "."} alt="Profile" referrerPolicy="no-referrer" />

                        <h1>{session?.user?.name}</h1>

                        <button onClick={() => signOut({ callbackUrl: "/login" })}
                            className="flex items-center text-sm gap-2 px-2 py-2 mx-5 rounded-full border border-red-200 bg-red-50 text-red-600 font-semibold hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-300">
                            <LogOut size={16} />
                            Sign Out
                        </button>
                    </div>

                </div>
            </nav>

            {/* ================= Hero ================= */}

            <section className="pt-24 max-w-7xl mx-auto px-6">

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                >

                    <p className="text-blue-600 font-semibold">
                        Welcome Back 👋
                    </p>

                    <h1 className="text-5xl font-bold mt-2">
                        Great to see you again,
                        <br />
                        Parth.
                    </h1>

                    <p className="text-gray-500 mt-4 max-w-2xl text-lg leading-8">

                        Thanks for supporting the journey.
                        Every contribution helps transform
                        new ideas into real products.

                    </p>

                </motion.div>

                {/* ================= Cards ================= */}

                <div className="grid lg:grid-cols-3 gap-8 mt-4">

                    {/* Progress */}

                    <motion.div
                        whileHover={{ y: -5 }}
                        className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-gray-300"
                    >

                        <div className="flex justify-between items-center">

                            <div>

                                <h2 className="text-3xl font-bold">

                                    ₹{moneyraised}
                                </h2>

                                <p className="text-gray-500 mt-2">

                                    raised of a ₹1,20,000 goal

                                </p>

                            </div>

                            <div className="bg-blue-100 text-blue-600 px-5 py-2 rounded-full font-semibold">

                                {Math.round(percentage)}%

                            </div>

                        </div>

                        {/* Progress */}

                        <div className="w-full h-4 bg-gray-200 rounded-full mt-8 overflow-hidden">

                            <motion.div

                                initial={{ width: 0 }}

                                animate={{ width:`${percentage}%` }}

                                transition={{ duration: 1.5 }}

                                className="h-full rounded-full bg-blue-600"

                            />

                        </div>

                        <div className="flex justify-between mt-5 text-gray-500">

                            <span>Goal Progress</span>

                            <span>{remaining} Remaining</span>

                        </div>

                    </motion.div>

                    {/* Support */}

                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-gradient-to-br from-blue-600 to-blue-500 rounded-3xl text-white p-8 flex flex-col justify-between"
                    >

                        <div>

                            <Heart
                                fill="white"
                                size={40}
                            />

                            <h2 className="text-3xl font-bold mt-6">

                                Keep the Journey Going

                            </h2>

                            <p className="mt-5 text-blue-100 leading-7">

                                Every contribution helps build
                                better apps, learn new technologies,
                                and bring bigger ideas to life.

                            </p>

                        </div>

                        <button onClick={() => router.push("/payment")} className="mt-10 bg-white text-blue-600 font-semibold rounded-full py-4 flex justify-center items-center gap-2 hover:scale-105 transition">

                            Support Now

                            <ArrowUpRight size={20} />

                        </button>

                    </motion.div>

                </div>

            </section>

        </main>
    )
}

export default page
