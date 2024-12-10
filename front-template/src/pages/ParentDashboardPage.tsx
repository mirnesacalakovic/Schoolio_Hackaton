import React, { useEffect, useState } from "react";
import {
  User,
  PlusCircle,
  Bell,
} from "lucide-react";
import Navbar from "./Navbar";

// TypeScript interfaces for type safety
interface Child {
  id: string;
  fullName: string;
  email: string;
  role: string;
}

const ParentDashboardPage: React.FC = () => {
  const [children, setChildren] = useState<Child[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [newChild, setNewChild] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setCurrentUser(parsedUser);
  
      if (parsedUser.role === "PARENT") {
        fetchChildren(); // Preuzimanje dece
      }
    }
  }, []);
  
  useEffect(() => {
    if (currentUser && currentUser.role === "PARENT") {
      fetchChildren(); // Ažuriranje dece pri promeni korisnika
    }
  }, [currentUser]);
  
  const fetchChildren = async () => {
    if (!currentUser || !currentUser.id) return;
  
    try {
      const response = await fetch(
        'https://localhost:7102/api/Auth/get-children/${currentUser.id}'
      );
      if (!response.ok) {
        throw new Error("Failed to fetch children");
      }
  
      const childrenData: Child[] = await response.json();
      setChildren(childrenData);
    } catch (error) {
      console.error("Error fetching children:", error);
    }
  };
  
  

  // Child Registration Handler
  const handleChildRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      // API poziv bez slanja "role"
      console.log(currentUser);
      const response = await fetch(
        "https://localhost:7102/api/Auth/register-student",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName: newChild.fullName,
            email: newChild.email,
            password: newChild.password, // Samo neophodna polja
            parentId: currentUser.id
          }),
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to register child");
      }
  
      const registeredChild: Child = await response.json();
  
      // Ažuriranje stanja
      setChildren([...children, registeredChild]);
      setShowRegistrationModal(false);
      setNewChild({ fullName: "", email: "", password: "" });
    } catch (error) {
      console.error("Error registering child:", error);
    }
  };
  

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-white text-black font-raleway p-6">
        {/* Header */}
        <header className="flex justify-between items-center border-b-4 border-black pb-6 mb-8">
          <h1 className="text-5xl font-black uppercase border-4 border-black px-4 py-2 inline-block hover:bg-red-200 transition-colors">
            Parent Dashboard
          </h1>
          <div className="flex items-center space-x-4">
            <button className="relative">
              <Bell size={32} />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 text-xs">
                3
              </span>
            </button>
            <User size={32} />
          </div>
        </header>

        {/* Children Section */}
        <div className="space-y-6">
          <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0_rgba(0,0,0,1)]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold uppercase">My Children</h2>
              {currentUser && currentUser.role === "PARENT" && (
                <button
                  onClick={() => setShowRegistrationModal(true)}
                  className="bg-blue-200 border-4 border-black px-4 py-2 flex items-center gap-2 hover:-translate-x-1 hover:-translate-y-1 transition-transform"
                >
                  <PlusCircle /> Add Child
                </button>
              )}

            </div>

            {children.map((child) => (
              <div
                key={child.id}
                className="bg-green-100 border-4 border-black p-4 mb-4 hover:-translate-x-2 hover:-translate-y-2 transition-transform shadow-[6px_6px_0_rgba(0,0,0,1)]"
              >
                <h3 className="text-2xl font-bold">{child.fullName}</h3>
                <p>Email: {child.email}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Child Registration Modal */}
        {showRegistrationModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white border-4 border-black w-full max-w-md shadow-[12px_12px_0_rgba(0,0,0,1)]">
              <div className="bg-blue-200 border-b-4 border-black p-6">
                <h2 className="text-3xl font-black uppercase">
                  Register Child
                </h2>
              </div>
              <form
                onSubmit={handleChildRegistration}
                className="p-6 space-y-6"
              >
                <div>
                  <label className="block text-xl font-bold uppercase mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={newChild.fullName}
                    onChange={(e) =>
                      setNewChild({ ...newChild, fullName: e.target.value })
                    }
                    className="w-full border-4 border-black p-3 text-xl"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xl font-bold uppercase mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={newChild.email}
                    onChange={(e) =>
                      setNewChild({ ...newChild, email: e.target.value })
                    }
                    className="w-full border-4 border-black p-3 text-xl"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xl font-bold uppercase mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={newChild.password}
                    onChange={(e) =>
                      setNewChild({ ...newChild, password: e.target.value })
                    }
                    className="w-full border-4 border-black p-3 text-xl"
                    required
                  />
                </div>
                <div className="flex justify-between space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowRegistrationModal(false)}
                    className="flex-1 bg-gray-200 border-4 border-black p-4 uppercase font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-blue-300 border-4 border-black p-4 uppercase font-bold"
                  >
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ParentDashboardPage;


// import React, { useState } from "react";
// import {
//   User,
//   PlusCircle,
//   Activity,
//   Calendar,
//   MessageSquare,
//   Bell,
//   CreditCard,
//   Settings,
// } from "lucide-react";
// import Navbar from "./Navbar";

// // TypeScript interfaces for type safety
// interface Child {
//   id: number;
//   name: string;
//   age: number;
//   grade: string;
//   activities: Activity[];
// }

// interface Activity {
//   id: number;
//   name: string;
//   date: string;
//   type: "academic" | "extracurricular" | "social";
//   details: string;
// }

// const ParentDashboardPage: React.FC = () => {
//   // State management
//   const [children, setChildren] = useState<Child[]>([
//     {
//       id: 1,
//       name: "Emma Johnson",
//       age: 12,
//       grade: "7th Grade",
//       activities: [
//         {
//           id: 1,
//           name: "Math Competition",
//           date: "2024-03-15",
//           type: "academic",
//           details: "Participated in regional math olympiad",
//         },
//         {
//           id: 2,
//           name: "Soccer Practice",
//           date: "2024-03-20",
//           type: "extracurricular",
//           details: "Weekly soccer training with school team",
//         },
//       ],
//     },
//   ]);

//   const [showRegistrationModal, setShowRegistrationModal] = useState(false);
//   const [newChild, setNewChild] = useState({
//     name: "",
//     age: "",
//     grade: "",
//   });

//   // Child Registration Handler
//   const handleChildRegistration = (e: React.FormEvent) => {
//     e.preventDefault();
//     const childToAdd = {
//       id: Date.now(),
//       name: newChild.name,
//       age: parseInt(newChild.age),
//       grade: newChild.grade,
//       activities: [],
//     };

//     setChildren([...children, childToAdd]);
//     setShowRegistrationModal(false);
//     setNewChild({ name: "", age: "", grade: "" });
//   };

//   // Activity Type Color Mapping
//   const getActivityColor = (type: string) => {
//     switch (type) {
//       case "academic":
//         return "bg-yellow-100";
//       case "extracurricular":
//         return "bg-green-100";
//       case "social":
//         return "bg-blue-100";
//       default:
//         return "bg-gray-100";
//     }
//   };

//   return (
//     <div>
//       <Navbar />
//       <div className="min-h-screen bg-white text-black font-raleway p-6">
//         {/* Header */}
//         <header className="flex justify-between items-center border-b-4 border-black pb-6 mb-8">
//           <h1 className="text-5xl font-black uppercase border-4 border-black px-4 py-2 inline-block hover:bg-red-200 transition-colors">
//             Parent Dashboard
//           </h1>
//           <div className="flex items-center space-x-4">
//             <button className="relative">
//               <Bell size={32} />
//               <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 text-xs">
//                 3
//               </span>
//             </button>
//             <User size={32} />
//           </div>
//         </header>

//         {/* Main Dashboard Grid */}
//         <div className="grid md:grid-cols-3 gap-6">
//           {/* Children Section */}
//           <div className="col-span-2 space-y-6">
//             <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0_rgba(0,0,0,1)]">
//               <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-3xl font-bold uppercase">My Children</h2>
//                 <button
//                   onClick={() => setShowRegistrationModal(true)}
//                   className="bg-blue-200 border-4 border-black px-4 py-2 flex items-center gap-2 hover:-translate-x-1 hover:-translate-y-1 transition-transform"
//                 >
//                   <PlusCircle /> Add Child
//                 </button>
//               </div>

//               {children.map((child) => (
//                 <div
//                   key={child.id}
//                   className="bg-green-100 border-4 border-black p-4 mb-4 hover:-translate-x-2 hover:-translate-y-2 transition-transform shadow-[6px_6px_0_rgba(0,0,0,1)]"
//                 >
//                   <div className="flex justify-between items-center">
//                     <div>
//                       <h3 className="text-2xl font-bold">{child.name}</h3>
//                       <p>
//                         {child.grade} | Age: {child.age}
//                       </p>
//                     </div>
//                     <button className="bg-white border-4 border-black px-3 py-1">
//                       Details
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Recent Activities */}
//             <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0_rgba(0,0,0,1)]">
//               <h2 className="text-3xl font-bold uppercase mb-6">
//                 Recent Activities
//               </h2>
//               {children.flatMap((child) =>
//                 child.activities.map((activity) => (
//                   <div
//                     key={activity.id}
//                     className={`${getActivityColor(
//                       activity.type
//                     )} border-4 border-black p-4 mb-4 hover:-translate-x-2 hover:-translate-y-2 transition-transform`}
//                   >
//                     <div className="flex justify-between items-center">
//                       <div>
//                         <h4 className="text-xl font-bold">{activity.name}</h4>
//                         <p>
//                           {activity.date} | {activity.type}
//                         </p>
//                       </div>
//                       <Activity size={24} />
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>

//           {/* Sidebar Shortcuts */}
//           <div className="space-y-6">
//             {[
//               {
//                 icon: <Calendar size={24} />,
//                 label: "Schedules",
//                 color: "bg-yellow-200",
//               },
//               {
//                 icon: <MessageSquare size={24} />,
//                 label: "Communications",
//                 color: "bg-blue-200",
//               },
//               {
//                 icon: <CreditCard size={24} />,
//                 label: "Payments",
//                 color: "bg-green-200",
//               },
//               {
//                 icon: <Settings size={24} />,
//                 label: "Settings",
//                 color: "bg-gray-200",
//               },
//             ].map((shortcut) => (
//               <button
//                 key={shortcut.label}
//                 className={w-full ${shortcut.color} border-4 border-black p-6 text-left text-xl font-bold uppercase flex justify-between items-center hover:-translate-x-2 hover:-translate-y-2 transition-transform shadow-[6px_6px_0_rgba(0,0,0,1)]}
//               >
//                 {shortcut.label}
//                 {shortcut.icon}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Child Registration Modal */}
//         {showRegistrationModal && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
//             <div className="bg-white border-4 border-black w-full max-w-md shadow-[12px_12px_0_rgba(0,0,0,1)]">
//               <div className="bg-blue-200 border-b-4 border-black p-6">
//                 <h2 className="text-3xl font-black uppercase">
//                   Register Child
//                 </h2>
//               </div>
//               <form
//                 onSubmit={handleChildRegistration}
//                 className="p-6 space-y-6"
//               >
//                 <div>
//                   <label className="block text-xl font-bold uppercase mb-2">
//                     Child's Name
//                   </label>
//                   <input
//                     type="text"
//                     value={newChild.name}
//                     onChange={(e) =>
//                       setNewChild({ ...newChild, name: e.target.value })
//                     }
//                     className="w-full border-4 border-black p-3 text-xl hover:-translate-x-1 hover:-translate-y-1 transition-transform"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-xl font-bold uppercase mb-2">
//                     Age
//                   </label>
//                   <input
//                     type="number"
//                     value={newChild.age}
//                     onChange={(e) =>
//                       setNewChild({ ...newChild, age: e.target.value })
//                     }
//                     className="w-full border-4 border-black p-3 text-xl hover:-translate-x-1 hover:-translate-y-1 transition-transform"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-xl font-bold uppercase mb-2">
//                     Grade
//                   </label>
//                   <input
//                     type="text"
//                     value={newChild.grade}
//                     onChange={(e) =>
//                       setNewChild({ ...newChild, grade: e.target.value })
//                     }
//                     className="w-full border-4 border-black p-3 text-xl hover:-translate-x-1 hover:-translate-y-1 transition-transform"
//                     required
//                   />
//                 </div>
//                 <div className="flex justify-between space-x-4">
//                   <button
//                     type="button"
//                     onClick={() => setShowRegistrationModal(false)}
//                     className="flex-1 bg-gray-200 border-4 border-black p-4 uppercase font-bold hover:-translate-x-2 hover:-translate-y-2 transition-transform"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="flex-1 bg-blue-300 border-4 border-black p-4 uppercase font-bold hover:-translate-x-2 hover:-translate-y-2 transition-transform"
//                   >
//                     Register
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}

//         {/* Footer */}
//         <footer className="mt-8 border-t-4 border-black pt-6 text-center">
//           <p className="font-bold">© 2024 Schoolio - Connecting Parents</p>
//         </footer>
//       </div>
//     </div>
//   );
// };

// export default ParentDashboardPage;
