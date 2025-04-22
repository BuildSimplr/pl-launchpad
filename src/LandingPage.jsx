import React from 'react';
import { motion } from 'framer-motion';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#f8f9f7] text-gray-900 flex flex-col font-sans">
      {/* Hero Section */}
      <header className="bg-[#eaf0ec] text-green-900 py-20 px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Your Lightweight, Powerful Product Management Toolkit</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto text-green-800">Built for startup teams and solo PMs. Stay focused, aligned, and shipping fast — powered by PM Launchpad.</p>
        <div className="mt-10 flex justify-center gap-4 flex-wrap">
          <a href="/app" className="bg-[#f9f9f6] text-green-800 font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-[#e6ebe2] transition">Get Started Free</a>
          <a href="#demo" className="text-green-900 border border-green-800 px-6 py-3 rounded-lg font-medium hover:bg-green-800 hover:text-white transition">See It In Action</a>
        </div>
        <div className="mt-12">
          {/* Static dashboard preview */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }} 
            viewport={{ once: true }}
            className="mx-auto w-full max-w-4xl bg-white rounded-2xl shadow-xl p-4"
          >
            <img
              src="/assets/dashboard-preview.png"
              alt="PM Lite dashboard preview"
              className="rounded-lg w-full object-cover"
            />
          </motion.div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-20 px-6 md:px-16 bg-[#fefdfb]">
        <h2 className="text-3xl font-bold text-center mb-12">Core Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-xl shadow-md text-center">
            <h3 className="text-xl font-semibold mb-2 text-[#417c68]">✅ Simple OKR Tracking</h3>
            <p className="text-gray-700">Set, align, and check in without the clutter.</p>
          </div>
          <div className="p-6 bg-[#f4f5f2] rounded-xl shadow-md text-center">
            <h3 className="text-xl font-semibold mb-2 text-[#417c68]">🗂️ Streamlined Backlog Board</h3>
            <p className="text-gray-700">Focused views for priorities, bugs, and ideas.</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-md text-center">
            <h3 className="text-xl font-semibold mb-2 text-[#417c68]">📝 Smart Meeting Notes</h3>
            <p className="text-gray-700">Actionable summaries with context that stays.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-green-800 text-white py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Start streamlining your product work today.</h2>
        <a href="/app" className="inline-block bg-[#f9f9f6] text-green-800 px-6 py-3 rounded-full font-semibold hover:bg-[#e6ebe2] transition">Launch PM Lite</a>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-white/80 bg-[#1e2d26]">
        &copy; {new Date().getFullYear()} PM Lite. Powered by PM Launchpad.
      </footer>
    </div>
  );
};

export default LandingPage;
