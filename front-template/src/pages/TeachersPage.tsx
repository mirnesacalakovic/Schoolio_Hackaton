import React from "react";
import { Mail, Phone } from "lucide-react";
import Navbar from "./Navbar";

interface Teacher {
  name: string;
  subject: string;
  phone: string;
  email: string;
  bio: string;
}

const teachersData: Teacher[] = [
  {
    name: "Emily Rodriguez",
    subject: "Mathematics",
    phone: "(555) 123-4567",
    email: "emily.rodriguez@tutoring.com",
    bio: "Experienced math tutor with over 10 years of teaching high school students.",
  },
  {
    name: "Michael Chen",
    subject: "Physics",
    phone: "(555) 987-6543",
    email: "michael.chen@tutoring.com",
    bio: "Passionate about physics and helping students grasp complex concepts.",
  },
  {
    name: "Sarah Johnson",
    subject: "English Literature",
    phone: "(555) 456-7890",
    email: "sarah.johnson@tutoring.com",
    bio: "Specializes in literature analysis and writing skills for high school students.",
  },
];

const TeacherCard: React.FC<{ teacher: Teacher }> = ({ teacher }) => {
  return (
    <div
      className="bg-white border-4 border-black p-6 
      shadow-[8px_8px_0px_rgba(0,0,0,1)] mb-6 
      transform transition-transform 
      hover:-translate-x-2 hover:-translate-y-2 
      hover:shadow-[4px_4px_0px_rgba(0,0,0,1)]"
    >
      <h2 className="text-2xl font-black uppercase border-b-4 border-black pb-2 mb-4 text-black">
        {teacher.name}
      </h2>
      <div className="space-y-3">
        <p className="text-xl font-black uppercase bg-yellow-200 border-4 border-black px-3 py-1 text-black">
          Subject: {teacher.subject}
        </p>
        <div className="flex items-center space-x-2">
          <Phone className="h-6 w-6 text-black" strokeWidth={2.5} />
          <span className="text-lg text-black">{teacher.phone}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Mail className="h-6 w-6 text-black" strokeWidth={2.5} />
          <span className="text-lg text-black">{teacher.email}</span>
        </div>
        <p className="text-lg mt-4 bg-blue-100 border-4 border-black p-3 text-black">
          {teacher.bio}
        </p>
      </div>
    </div>
  );
};

const Teachers: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div className="bg-white min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-black uppercase mb-4 text-center border-b-8 border-black pb-4 text-black">
            Extra Lessons Teachers
          </h1>
          <p className="text-center text-xl uppercase mb-12 border-4 border-black p-4 inline-block mx-auto text-black">
            Meet our highly experienced tutors, dedicated to helping you succeed
            in various subjects.
          </p>
          <div className="flex flex-col space-y-6">
            {teachersData.map((teacher, index) => (
              <TeacherCard key={index} teacher={teacher} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teachers;
