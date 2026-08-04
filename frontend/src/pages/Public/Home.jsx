import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '/images/Hero.jpeg'

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navmenu = [
    { name: "Home", path: "/" },
    { name: "Feature", path: "/feature" },
    { name: "Pricing", path: "/pricing" },
    { name: "Contact", path: "/contact" } // Fixed typos: Contect -> Contact
  ];

  return (
    <div className="min-h-screen w-full bg-slate-50">
      {/* HEADER / NAVBAR */}
      <header className="w-full bg-white shadow-md sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex flex-col justify-center">
            <h1 className="text-xl md:text-2xl font-bold">
              Its<span className="text-red-500">Manage</span>
            </h1>
            <p className="text-xs text-gray-500 hidden sm:block">
              Manage your institute with ease
            </p>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navmenu.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="font-semibold text-gray-700 hover:text-blue-600 transition-colors py-2 px-3 rounded-lg hover:bg-gray-100"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/login" className="font-semibold text-gray-700 hover:text-blue-600 px-4 py-2 rounded-xl hover:bg-gray-100">
              Login
            </Link>
            <Link to="/register" className="font-semibold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl shadow-sm hover:shadow transition-all">
              Start Free Trial
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700 hover:text-black focus:outline-none p-2"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </nav>

        {/* Mobile Dropdown Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-200 px-4 pt-2 pb-4 space-y-2">
            {navmenu.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className="block font-medium text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md"
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-2 border-t border-gray-100 flex flex-col gap-2">
              <Link to="/login" className="text-center font-medium text-gray-700 hover:bg-gray-100 py-2 rounded-md">
                Login
              </Link>
              <Link to="/register" className="text-center font-medium text-white bg-blue-600 hover:bg-blue-700 py-2 rounded-md">
                Start Free Trial
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center min-h-[30vh]">
          <div className="p-8 rounded-2xl min-h-[250px] flex items-center justify-center">
           <div> <h1 className='text-2xl font-bold md:text-6xl '>The Complete Operating System for Modern <span className='text-red-600'>Institutes....</span></h1>
           <br />
            <p className='md:text-2xl' >Designed specifically for schools, colleges, and coaching centers to run smoothly, stay organized, and scale without friction.</p><br />
            <div className='text-xl'><Link className=' text-gray-600 hover:text-blue-600' to='/register'>Try Its Manage Free </Link><span> | </span><Link className='text-gray-600  hover:text-blue-600' to='/feature'>View Features</Link></div>
            </div>
          </div>
          <div className="p-8rounded-2xl min-h-[250px] flex items-center justify-center">
            <img src={Hero} alt="" className='h-full w-full' />
          </div>
        </div>
      </section>

      <h2 className="text-2xl md:text-3xl font-bold text-center my-8">Featured Topics</h2>

      {/* SECONDARY SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="p-8 bg-amber-300 rounded-2xl min-h-[300px] flex items-center justify-center">
            Feature Left
          </div>
          <div className="flex flex-col gap-4">
            <div className="p-6 bg-red-400 rounded-xl min-h-[150px] flex items-center justify-center">
              Feature Box 1
            </div>
            <div className="p-6 bg-orange-400 rounded-xl min-h-[150px] flex items-center justify-center">
              Feature Box 2
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;