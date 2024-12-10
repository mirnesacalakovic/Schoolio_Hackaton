import React, { useState } from "react";
import { MessageCircle, User, Send } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";

// Sample discussion data
const initialDiscussions = [
  {
    id: 1,
    title: "Upcoming Science Fair Projects",
    author: "Mrs. Johnson",
    comments: [
      {
        id: 1,
        user: "Parent1",
        text: "Are there any guidelines for project complexity?",
      },
      { id: 2, user: "Parent2", text: "My child is excited to participate!" },
    ],
  },
  {
    id: 2,
    title: "Middle School Dance Preparations",
    author: "Mr. Rodriguez",
    comments: [
      { id: 1, user: "Parent3", text: "What's the dress code for the dance?" },
    ],
  },
];

// Background Shape Component (similar to Home page)
const BackgroundShapes = () => {
  const colors = [
    "#E0D7FF", // Soft Lavender
    "#F9E8D2", // Pastel Peach
    "#D1F1F1", // Pale Cyan
    "#FFD6D6", // Soft Salmon
    "#E6FFD6", // Pale Mint
    "#F0E6FF", // Light Periwinkle
  ];

  const generateShapeStyle = (size: number, color: string, zIndex: number) => {
    const rotations = [15, 30, 45, 60, -15, -30, -45, -60];
    const randomRotation =
      rotations[Math.floor(Math.random() * rotations.length)];

    return {
      width: `${size}px`,
      height: `${size}px`,
      backgroundColor: color,
      position: "absolute" as const,
      borderWidth: "4px",
      borderColor: "black",
      borderStyle: "solid",
      transform: `rotate(${randomRotation}deg)`,
      boxShadow: "4px 4px 0px 0px rgba(0,0,0,1)",
      zIndex: zIndex,
      opacity: 0.5,
    };
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        style={{
          ...generateShapeStyle(120, colors[0], 0),
          top: "10%",
          left: "5%",
          borderRadius: "50%",
        }}
      />
      <div
        style={{
          ...generateShapeStyle(80, colors[1], 0),
          top: "25%",
          left: "15%",
          borderRadius: "50%",
        }}
      />
      <div
        style={{
          ...generateShapeStyle(150, colors[2], 0),
          top: "5%",
          right: "10%",
          borderRadius: "50%",
        }}
      />
    </div>
  );
};

const Forum: React.FC = () => {
  const [discussions, setDiscussions] = useState(initialDiscussions);
  const [newComment, setNewComment] = useState<{ [key: number]: string }>({});

  const handleAddComment = (discussionId: number) => {
    if (!newComment[discussionId]?.trim()) return;

    const updatedDiscussions = discussions.map((discussion) => {
      if (discussion.id === discussionId) {
        return {
          ...discussion,
          comments: [
            ...discussion.comments,
            {
              id: discussion.comments.length + 1,
              user: "Anonymous Parent",
              text: newComment[discussionId],
            },
          ],
        };
      }
      return discussion;
    });

    setDiscussions(updatedDiscussions);
    setNewComment((prev) => ({ ...prev, [discussionId]: "" }));
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-[#ffe5f1] text-black font-raleway">
        <div className="relative container mx-auto mt-8 px-4">
          <header className="relative z-10">
            <BackgroundShapes />
            <h1
              className="text-4xl font-black uppercase mb-8 text-center 
                         border-4 border-black p-4 bg-white 
                         shadow-[8px_8px_0_rgba(0,0,0,1)] hover:bg-red-300 
                         transition-colors"
            >
              Parent Forum
            </h1>
          </header>

          {discussions.map((discussion) => (
            <div
              key={discussion.id}
              className="mb-6 bg-white border-4 border-black p-4 
                       shadow-[12px_12px_0_rgba(0,0,0,1)] 
                       hover:shadow-[16px_16px_0_rgba(0,0,0,1)] 
                       transition-all"
            >
              <div className="bg-yellow-200 border-b-4 border-black p-4 mb-4">
                <div className="flex items-center">
                  <MessageCircle className="mr-2" />
                  <h2 className="text-xl font-bold">{discussion.title}</h2>
                </div>
                <p className="text-sm">Started by: {discussion.author}</p>
              </div>

              {/* Comments Section */}
              <div className="space-y-4 mb-4">
                {discussion.comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="bg-white border-2 border-black p-4 
                             shadow-[8px_8px_0_rgba(0,0,0,1)] 
                             hover:shadow-[12px_12px_0_rgba(0,0,0,1)] 
                             transition-all"
                  >
                    <div className="flex items-center mb-2">
                      <User className="mr-2" size={20} />
                      <span className="font-semibold">{comment.user}</span>
                    </div>
                    <p>{comment.text}</p>
                  </div>
                ))}
              </div>

              {/* Comment Input */}
              <div className="flex">
                <input
                  type="text"
                  value={newComment[discussion.id] || ""}
                  onChange={(e) =>
                    setNewComment((prev) => ({
                      ...prev,
                      [discussion.id]: e.target.value,
                    }))
                  }
                  placeholder="Add a comment..."
                  className="flex-grow p-3 border-2 border-black mr-2 
                           bg-white shadow-[4px_4px_0_rgba(0,0,0,1)] 
                           focus:outline-none focus:bg-blue-50 
                           text-lg placeholder-gray-600"
                />
                <button
                  onClick={() => handleAddComment(discussion.id)}
                  className="bg-green-400 text-black p-3 border-4 border-black 
                           hover:bg-green-500 transition-colors
                           shadow-[4px_4px_0_rgba(0,0,0,1)] 
                           hover:shadow-[6px_6px_0_rgba(0,0,0,1)]"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Forum;
