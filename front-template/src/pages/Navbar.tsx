import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Book, MessageCircle, Users, Menu, X } from "lucide-react";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null); // Store user role
  const navigate = useNavigate();

  useEffect(() => {
    // Check for currentUser and role in localStorage
    const user = localStorage.getItem("user");
    const role = localStorage.getItem("role"); // Assuming role is stored in localStorage
    setCurrentUser(user);
    setUserRole(role); // Set the role from localStorage
  }, []);

  const handleLogout = () => {
    // Clear currentUser and role from localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("jwt");
    setCurrentUser(null);
    setUserRole(null);
    navigate("/"); // Redirect user to the home page after logout
  };

  const navItems = [
    { icon: <Book size={20} />, title: "Materials", path: "/materials" },
    { icon: <MessageCircle size={20} />, title: "Forum", path: "/forum" },
    { icon: <Users size={20} />, title: "Tutors", path: "/teacher-dashboard" },
  ];

  return (
    <nav className="bg-white border-b-4 border-black text-black h-20">
      <div className="container mx-auto flex justify-between items-center h-full px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center h-full">
          <img
            src="./logo.png"
            alt="logo"
            className="h-full max-h-12 object-contain"
          />
        </Link>
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center space-x-2 
                         border-4 border-black px-3 py-1.5
                         hover:bg-green-200 transition-colors
                         shadow-[4px_4px_0_rgba(0,0,0,1)] text-sm font-semibold"
            >
              {item.icon}
              <span>{item.title}</span>
            </Link>
          ))}

          {/* Parent Dashboard Button (only for PARENT role) */}
          {userRole === "PARENT" && (
            <Link
              to="/parent-dashboard"
              className="flex items-center space-x-2
                         border-4 border-black px-3 py-1.5
                         hover:bg-yellow-200 transition-colors
                         shadow-[4px_4px_0_rgba(0,0,0,1)] text-sm font-semibold"
            >
              <span>Parent Dashboard</span>
            </Link>
          )}

          
          
          <Link
            to="/lost-and-found"
            className="flex items-center space-x-2
                        border-4 border-black px-3 py-1.5
                        hover:bg-orange-200 transition-colors
                        shadow-[4px_4px_0_rgba(0,0,0,1)] text-sm font-semibold"
          >
            <span>Lost & Found</span>
          </Link>
          

          {/* Conditional zakazianje i plaćanje priatnih časoa  Buttons */}
          {currentUser ? (
            <button
              onClick={handleLogout}
              className="bg-red-400 border-4 border-black px-4 py-1.5
                         font-semibold uppercase
                         hover:bg-red-500 transition-colors
                         shadow-[4px_4px_0_rgba(0,0,0,1)]"
            >
              Logout
            </button>
          ) : (
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="bg-blue-200 border-4 border-black px-4 py-1.5
                           font-semibold uppercase
                           hover:bg-blue-300 transition-colors
                           shadow-[4px_4px_0_rgba(0,0,0,1)] text-sm"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-green-400 border-4 border-black px-4 py-1.5
                           font-semibold uppercase
                           hover:bg-green-500 transition-colors
                           shadow-[4px_4px_0_rgba(0,0,0,1)] text-sm"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="border-4 border-black rounded-md p-2 
                       hover:bg-yellow-300 transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t-4 border-black">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsMenuOpen(false)}
              className="block border-b-2 border-black p-3 
                         hover:bg-green-200 transition-colors text-center font-semibold text-sm"
            >
              {item.icon}
              {item.title}
            </Link>
          ))}
          {/* Mobile Parent Dashboard Button */}
          {userRole === "PARENT" && (
            <Link
              to="/parent-dashboard"
              onClick={() => setIsMenuOpen(false)}
              className="block border-b-2 border-black p-3 
                         hover:bg-yellow-200 transition-colors text-center font-semibold text-sm"
            >
              Parent Dashboard
            </Link>
          )}

          {/* Mobile Lost & Found Button (only for PARENT and ADMIN roles) */}
          {(userRole === "PARENT" || userRole === "ADMIN") && (
            <Link
              to="/lost-and-found"
              onClick={() => setIsMenuOpen(false)}
              className="block border-b-2 border-black p-3 
                         hover:bg-orange-200 transition-colors text-center font-semibold text-sm"
            >
              Lost & Found
            </Link>
          )}

          {/* Mobile Conditional Buttons */}
          <div className="p-4 space-y-4">
            {currentUser ? (
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="block bg-red-400 border-4 border-black px-4 py-1.5
                           text-center font-semibold uppercase
                           hover:bg-red-500 transition-colors"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block bg-blue-200 border-4 border-black px-4 py-1.5
                             text-center font-semibold uppercase
                             hover:bg-blue-300 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block bg-green-400 border-4 border-black px-4 py-1.5
                             text-center font-semibold uppercase
                             hover:bg-green-500 transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
