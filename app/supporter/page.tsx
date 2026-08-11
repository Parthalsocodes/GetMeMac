"use client";

import { Search, Heart, User } from "lucide-react";
import { useSession, signIn, signOut } from "next-auth/react"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Supporters() {
  const router=useRouter()
  const session=useSession().data

  const [search, setSearch] = useState("");
  const [supporters, setSupporters] = useState<any[]>([]);

  useEffect(() => {
    const fetchSupporters = async () => {
      const res = await fetch("/api/auth/supporters");
      const data = await res.json();

      setSupporters(data);
    };

    fetchSupporters();
  }, []);

  const filtered = supporters.filter((supporter:any) =>
    supporter.supporterName
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <main className="h-screen bg-[#F5F5F7] text-[#1D1D1F] pb-8 overflow-y-auto no-scrollbar">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-xl border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">
          <h1 onClick={()=>router.push("/")} className="text-3xl font-bold cursor-pointer">
            Get<span className="text-blue-600">MeMac</span>
          </h1>

          <div className="hidden md:flex gap-10 font-medium">
            <a href="/">Home</a>
            <a href="/dashboard">Dashboard</a>
            <a href="/about">About</a>
            <a href="/supporter" className="text-blue-600">
              Supporters
            </a>
          </div>

          <div className="flex items-center gap-4">
            <img className='w-10 h-10 rounded-full' src={session?.user?.image || "."} alt="Profile" />

                        <h1>{session?.user?.name}</h1>

            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="px-5 py-2 rounded-full border border-red-200 bg-red-50 text-red-600 font-semibold hover:bg-red-600 hover:text-white transition"
            >
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto pt-36 px-6">
        <div className="text-center">
          <Heart
            className="mx-auto text-blue-600"
            size={42}
            fill="#2563EB"
          />

          <h1 className="text-5xl font-bold mt-5">
            Community Supporters
          </h1>

          <p className="text-gray-500 text-lg mt-5">
            Thank you to everyone supporting the journey.
          </p>
        </div>

        {/* Search */}
        <div className="relative mt-16">
          <Search
            className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />

          <input
            type="text"
            placeholder="Search supporter..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-gray-300 rounded-2xl py-4 pl-14 pr-5 outline-none focus:border-blue-600"
          />
        </div>

        <div className="mt-8 text-gray-600 font-medium">
          {filtered.length} Supporters
        </div>

        {/* MongoDB Supporters */}
        <div className="mt-8 space-y-5">
          {filtered.map((supporter) => (
            <div
              key={supporter._id}
              className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 flex justify-between items-center"
            >
              <div className="flex gap-5">
                <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center">
                  <User />
                </div>

                <div>
                  <h2 className="text-xl font-semibold">
                    {supporter.supporterName}
                  </h2>

                  <p className="text-gray-500 mt-2">
                    "{supporter.message}"
                  </p>
                </div>
              </div>

              <div className="text-right">
                <h2 className="text-3xl font-bold text-blue-600">
                  ₹{supporter.amount}
                </h2>

                <p className="text-gray-500">
                  Supported
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
        <footer className="mt-10 py-5 text-center text-gray-400">
  © {new Date().getFullYear()} BuyMeMac • Built with ❤️ by Parth

</footer>
    </main>
    
  );
}