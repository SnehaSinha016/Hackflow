import React from 'react'
import logo from '../assets/Logo.png'
import {Link} from 'react-router-dom'

const navbar = () => {
  return (
    <nav className="w-full flex items-center justify-between px-4 md:px-8 py-4">
  <div className="flex items-center gap-0">
        <img src={logo} alt="logo" className="w-10 h-10"/>
        <p className="px-1 text-xl font-semibold">HackFlow</p>
        </div>
      <div className="hidden lg:flex items-center gap-12">
        <Link className="px-2">Features</Link>
        <Link className="px-2">How it works</Link>
        <Link className="px-2">Pricing</Link>
        <Link className="px-2">Testimonials</Link>
      </div>
        
       <div className="hidden lg:flex items-center gap-6">
        <Link to="/login">Login</Link>
        <Link to="/signup">
          <button className="bg-[#633ce4] text-white px-4 py-2 rounded">Get Started</button>
        </Link>
       </div>
       
    </nav>
  )
}

export default navbar