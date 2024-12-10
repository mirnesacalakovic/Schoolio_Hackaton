import React from "react";
import { Link } from "react-router-dom";
import { Book, MessageCircle, Users, Calendar, Search } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Home: React.FC = () => {
  // Color palette for shapes
  const colors = [
    '#E0D7FF',   // Soft Lavender
    '#F9E8D2',   // Pastel Peach
    '#D1F1F1',   // Pale Cyan
    '#FFD6D6',   // Soft Salmon
    '#E6FFD6',   // Pale Mint
    '#F0E6FF',   // Light Periwinkle
  ];

  // Function to generate random rotation and position with constraints
  const generateShapeStyle = (size: number, color: string, zIndex: number) => {
    const rotations = [15, 30, 45, 60, -15, -30, -45, -60];
    const randomRotation = rotations[Math.floor(Math.random() * rotations.length)];
    
    return {
      width: `${size}px`,
      height: `${size}px`,
      backgroundColor: color,
      position: 'absolute' as const,
      borderWidth: '4px',
      borderColor: 'black',
      borderStyle: 'solid',
      transform: `rotate(${randomRotation}deg)`,
      boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)',
      zIndex: zIndex
    };
  };

  const featuredSections = [
    {
      icon: <Book size={64} />,
      title: "Material Exchange",
      description: "Share textbooks, notes, and literature",
      color: "bg-yellow-200",
      path: "/materials",
    },
    {
      icon: <MessageCircle size={64} />,
      title: "Parent Forum",
      description: "Discussions and advice sharing",
      color: "bg-green-200",
      path: "/forum",
    },
    {
      icon: <Users size={64} />,
      title: "Private Lessons",
      description: "Find the perfect tutor",
      color: "bg-blue-200",
      path: "/teachers",
    },
    {
      icon: <Calendar size={64} />,
      title: "Competitions",
      description: "Sign up and prepare",
      color: "bg-purple-200",
      path: "/competitions",
    },
  ];

  const recentActivities = [
    {
      title: "New Literature Available",
      description: '"The Little Prince" - exchange and download',
      color: "bg-pink-100",
    },
    {
      title: "Mathematics Competition",
      description: "Preparation materials available",
      color: "bg-orange-100",
    },
    {
      title: "New Private Lessons",
      description: "Mathematics, Physics, Chemistry",
      color: "bg-teal-100",
    },
  ];

  // Background Shape Component
  const BackgroundShapes = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Top Left Shapes */}
      <div 
        style={{
          ...generateShapeStyle(120, colors[0], 0),
          top: '10%',
          left: '5%',
          borderRadius: '50%'
        }} 
      />
      <div 
        style={{
          ...generateShapeStyle(80, colors[1], 0),
          top: '25%',
          left: '15%',
          borderRadius: '50%'
        }} 
      />

      {/* Top Right Shapes */}
      <div 
        style={{
          ...generateShapeStyle(150, colors[2], 0),
          top: '5%',
          right: '10%',
          borderRadius: '50%'
        }} 
      />
      <div 
        style={{
          ...generateShapeStyle(100, colors[3], 0),
          top: '30%',
          right: '20%',
          borderRadius: '50%'
        }} 
      />

      {/* Bottom Shapes */}
      <div 
        style={{
          ...generateShapeStyle(200, colors[4], 0),
          bottom: '10%',
          left: '15%',
          borderRadius: '20px'
        }} 
      />
      <div 
        style={{
          ...generateShapeStyle(130, colors[5], 0),
          bottom: '20%',
          right: '15%',
          borderRadius: '20px'
        }} 
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-ffe5f1 text-black font-raleway">
      <Navbar />

      <header className="relative bg-white border-b-4 border-black py-16 text-center text-black overflow-hidden">
        {/* Background Shapes */}
        <BackgroundShapes />

        {/* Main Content - Elevated with z-index */}
        <div className="relative z-10 px-4">
          <h1 className="text-5xl font-black uppercase mb-8 
                         border-4 border-black px-6 py-3 inline-block 
                         hover:bg-red-300 transition-colors text-black">
            Schoolio
          </h1>
          <div className="max-w-xl mx-auto my-5 p-4 flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search discussions, events, and more..."
              className="border-4 border-black rounded-md px-4 py-3 w-full 
                         focus:outline-none focus:bg-blue-50 text-black
                         text-lg placeholder-gray-600"
            />
            <button className="bg-yellow-300 border-4 border-black p-3 
                               hover:bg-yellow-400 transition-colors
                               shadow-[4px_4px_0px_rgba(0,0,0,1)]">
              <Search size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Featured Sections */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {featuredSections.map((section, index) => (
            <Link
              key={index}
              to={section.path}
              className={`${section.color} border-4 border-black p-6 text-center
                          transform transition-transform hover:-translate-x-2 hover:-translate-y-2
                          shadow-[6px_6px_0_rgba(0,0,0,1)] hover:shadow-[10px_10px_0_rgba(0,0,0,1)] text-black`}
            >
              {section.icon}
              <h2 className="text-xl font-bold uppercase mt-4">
                {section.title}
              </h2>
              <p className="text-sm">{section.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent Activities */}
      <section className="bg-white border-t-4 border-black py-12 text-black">
        <div className="container mx-auto px-4">
          <h2
            className="text-3xl font-black uppercase text-center mb-8 
                       border-4 border-black p-3 inline-block text-black"
          >
            Recent Activities
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {recentActivities.map((activity, index) => (
              <div
                key={index}
                className={`${activity.color} border-4 border-black p-6
                            transform transition-transform hover:-translate-x-2 hover:-translate-y-2
                            shadow-[6px_6px_0_rgba(0,0,0,1)] hover:shadow-[10px_10px_0_rgba(0,0,0,1)] text-black`}
              >
                <h3 className="text-xl font-bold uppercase mb-4">
                  {activity.title}
                </h3>
                <p>{activity.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-white border-t-4 border-black py-16 text-center text-black">
        <h2 className="text-4xl font-black uppercase mb-4">
          Join the Community
        </h2>
        <p className="text-xl mb-8 border-4 border-black p-4 inline-block text-black">
          Connect, learn, and grow together
        </p>
        <Link
          to="/register"
          className="bg-green-400 border-4 border-black px-10 py-4 
                     text-2xl font-bold uppercase 
                     transform transition-transform hover:-translate-x-2 hover:-translate-y-2
                     shadow-[8px_8px_0_rgba(0,0,0,1)] hover:shadow-[12px_12px_0_rgba(0,0,0,1)] text-black"
        >
          Sign Up
        </Link>
      </section>

      <Footer />
    </div>
  );
};

export default Home;