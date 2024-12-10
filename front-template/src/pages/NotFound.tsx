import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import Navbar from './Navbar';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-black font-raleway">
      <Navbar />

      {/* 404 Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center flex flex-col items-center">
        <div className="bg-white border-4 border-black rounded-xl p-8 mb-8 flex flex-col items-center">
          <h1 className="text-6xl font-black uppercase text-black text-center">
            404
          </h1>
          <p className="text-2xl font-bold uppercase mt-4 text-center">
            Page not found
          </p>
        </div>

        <div className="flex justify-center space-x-6">
          <Link 
            to="/" 
            className="bg-blue-200 border-4 border-black rounded-xl px-10 py-4 
                       text-xl font-bold uppercase 
                       transform transition-transform hover:-translate-x-2 hover:-translate-y-2
                       shadow-[8px_8px_0_rgba(0,0,0,1)] hover:shadow-[12px_12px_0_rgba(0,0,0,1)] text-black
                       flex items-center gap-3"
          >
            <Home size={24} />
            Go back to home
          </Link>
        </div>
      </section>

      {/* Playful Error Illustrations */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-yellow-100 border-4 border-black rounded-xl p-6
                          transform transition-transform hover:-translate-x-2 hover:-translate-y-2
                          shadow-[6px_6px_0_rgba(0,0,0,1)] hover:shadow-[10px_10px_0_rgba(0,0,0,1)] text-black">
            <h3 className="text-xl font-bold uppercase mb-4">What happened?</h3>
            <p>The page you are looking for might have been moved, renamed, or is temporarily unavailable.</p>
          </div>
          <div className="bg-green-100 border-4 border-black rounded-xl p-6
                          transform transition-transform hover:-translate-x-2 hover:-translate-y-2
                          shadow-[6px_6px_0_rgba(0,0,0,1)] hover:shadow-[10px_10px_0_rgba(0,0,0,1)] text-black">
            <h3 className="text-xl font-bold uppercase mb-4">Check the link</h3>
            <p>Make sure you have entered the correct address or used a valid link.</p>
          </div>
          <div className="bg-purple-100 border-4 border-black rounded-xl p-6
                          transform transition-transform hover:-translate-x-2 hover:-translate-y-2
                          shadow-[6px_6px_0_rgba(0,0,0,1)] hover:shadow-[10px_10px_0_rgba(0,0,0,1)] text-black">
            <h3 className="text-xl font-bold uppercase mb-4">Need help?</h3>
            <p>If you are still having trouble, please contact our support team.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t-4 border-black py-6 text-center text-black">
        <p className="font-bold">© 2024 SchoolHub - Page not found</p>
      </footer>
    </div>
  );
};

export default NotFound;
