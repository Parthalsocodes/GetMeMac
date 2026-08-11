"use client"

import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import Router, { useRouter } from 'next/navigation'

const page = () => {
  const router=useRouter()
  const session=useSession().data
  return (
    <div className='h-screen overflow-y-auto no-scrollbar'>
       <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-xl border-b border-gray-200 z-50">
              <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">
                <h1 onClick={()=>router.push("/")} className="text-3xl font-bold cursor-pointer">
                  Get<span className="text-blue-600">MeMac</span>
                </h1>
      
                <div className="hidden md:flex gap-10 font-medium">
                  <a href="/">Home</a>
                  <a href="/dashboard">Dashboard</a>
                  <a href="/about" className="text-blue-600" >About</a>
                  <a href="/supporter">
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

            <section className="max-w-6xl mx-auto pt-36 px-6">

  {/* Hero */}

  <div className="text-center">

    <p className="text-blue-600 font-semibold tracking-wide">
      ABOUT GETMEMAC
    </p>

    <h1 className="text-5xl md:text-6xl font-bold mt-5">
      More than a MacBook.
      <br />
      A tool for building bigger ideas.
    </h1>

    <p className="text-gray-500 text-lg mt-6 max-w-3xl mx-auto leading-8">
      BuyMeMac is my journey towards becoming a better developer,
      building meaningful projects, and continuously learning
      new technologies.
    </p>

  </div>

  {/* Story Card */}

  <div className="bg-white rounded-3xl border border-gray-300 shadow-sm p-10 mt-16">

    <h2 className="text-3xl font-bold mb-6">
      My Story
    </h2>

    <div className="space-y-6 text-gray-600 leading-8 text-lg">

      <p>
        Hi, I'm Parth. I'm a student and aspiring full-stack developer
        passionate about building web applications and learning modern
        technologies.
      </p>

      <p>
        What started as curiosity about programming gradually turned into
        a passion for creating projects that solve real problems. Every
        application I build teaches me something new and helps me improve
        as a developer.
      </p>

      <p>
        Through GetMeMac, I'm working towards getting the tools needed
        to take my projects to the next level, learn faster, and explore
        new opportunities like iOS development and advanced software
        engineering.
      </p>

    </div>

  </div>

</section>

<div className='px-6'>

<div className="bg-white rounded-3xl border border-gray-300 shadow-sm p-8 mt-12">

  <h2 className="text-3xl font-bold mb-6">
    Why GetMeMac?
  </h2>

  <div className="space-y-6 text-gray-600 leading-8 text-lg">

    <p>
      As I continue learning and building projects, having
      the right tools becomes increasingly important. A MacBook
      would help me work more efficiently and unlock new
      opportunities to explore technologies that aren't
      available on my current setup.
    </p>

    <p>
      More importantly, it would allow me to expand my skills,
      improve my workflow, and continue creating projects that
      challenge me to become a better developer every day.
    </p>

  </div>

</div>
</div>

{/* What Your Support Helps Me Achieve */}

<div className="text-center mt-14">

  <h2 className="text-3xl font-bold">
    What Your Support Helps Me Achieve
  </h2>

  <p className="text-gray-500 mt-3">
    Every contribution directly supports these goals.
  </p>

</div>

{/* Cards */}

<div className="grid md:grid-cols-3 gap-8 mt-10 px-6">

  <div className="bg-white rounded-3xl border border-gray-300 shadow-sm p-8">

    <div className="text-5xl mb-5">
      💻
    </div>

    <h3 className="text-xl font-semibold mb-3">
      Build Better Apps
    </h3>

    <p className="text-gray-500 leading-7">
      Create faster, smoother, and more polished web
      applications using better development tools.
    </p>

  </div>

  <div className="bg-white rounded-3xl border border-gray-300 shadow-sm p-8 ">

    <div className="text-5xl mb-5">
      📱
    </div>

    <h3 className="text-xl font-semibold mb-3">
      Learn iOS Development
    </h3>

    <p className="text-gray-500 leading-7">
      Explore the Apple ecosystem and build native
      applications while expanding my technical skills.
    </p>

  </div>

  <div className="bg-white rounded-3xl border border-gray-300 shadow-sm p-8">

    <div className="text-5xl mb-5">
      🚀
    </div>

    <h3 className="text-xl font-semibold mb-3">
      Bigger Ideas
    </h3>

    <p className="text-gray-500 leading-7">
      Turn ambitious concepts into real products and
      continue growing as a developer and creator.
    </p>

  </div>

</div>

<div className="text-center mt-16 mb-12">

  <h2 className="text-4xl font-bold">
    Thank You For Being Part
    <br />
    Of This Journey ❤️
  </h2>

  <p className="text-gray-500 mt-5 text-lg">
    Every contribution helps bring new ideas to life.
  </p>

  <button onClick={()=>router.push("/dashboard")} className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold transition">
    Start Supporting
  </button>

</div>
    </div>
    
  )
}

export default page
