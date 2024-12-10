import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, UserPlus, Users } from "lucide-react";
import Navbar from "./Navbar";

interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
}

const AdminDashboardPage = () => {
  // Mock data - replace with actual API calls
  const [teachers, setTeachers] = React.useState<User[]>([
    {
      id: "1",
      name: "John Smith",
      email: "john@example.com",
      phoneNumber: "123-456-7890",
      role: "Math Teacher",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah@example.com",
      phoneNumber: "123-456-7891",
      role: "English Teacher",
    },
  ]);

  const [students, setStudents] = React.useState<User[]>([
    {
      id: "1",
      name: "Mike Brown",
      email: "mike@example.com",
      phoneNumber: "123-456-7892",
      role: "Grade 8",
    },
    {
      id: "2",
      name: "Emily Davis",
      email: "emily@example.com",
      phoneNumber: "123-456-7893",
      role: "Grade 7",
    },
  ]);

  const [parents, setParents] = React.useState<User[]>([
    {
      id: "1",
      name: "Robert Wilson",
      email: "robert@example.com",
      phoneNumber: "123-456-7894",
      role: "Parent",
    },
    {
      id: "2",
      name: "Lisa Anderson",
      email: "lisa@example.com",
      phoneNumber: "123-456-7895",
      role: "Parent",
    },
  ]);

  const [searchQuery, setSearchQuery] = React.useState("");

  const UserTable = ({
    users,
    userType,
  }: {
    users: User[];
    userType: string;
  }) => (
    <div>
      <div className="flex items-center justify-between space-y-2 py-4">
        <div className="flex items-center space-x-2">
          <Input
            placeholder={`Search ${userType}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-12 w-[300px] border-4 border-black rounded-none bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] placeholder:text-gray-600"
          />
          <Button
            size="icon"
            className="h-12 w-12 bg-[#FFB6C1] border-4 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
          >
            <Search className="h-4 w-4 text-black" />
          </Button>
        </div>
        <Button className="h-12 bg-[#98FB98] text-black border-4 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
          <UserPlus className="mr-2 h-4 w-4" />
          Add {userType}
        </Button>
      </div>
      <div className="border-4 border-black bg-white">
        <Table>
          <TableHeader>
            <TableRow className="border-b-4  text-gray-800 border-black bg-[#E0D7FF] hover:bg-[#E0D7FF]">
              <TableHead className="text-black font-black">Name</TableHead>
              <TableHead className="text-black font-black">Email</TableHead>
              <TableHead className="text-black font-black">
                Phone Number
              </TableHead>
              <TableHead className="text-black font-black">
                {userType === "Student" ? "Grade" : "Role"}
              </TableHead>
              <TableHead className="text-black font-black text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                className="border-b-4 border-black hover:bg-[#F0F8FF]"
              >
                <TableCell className="font-medium text-gray-800">
                  {user.name}
                </TableCell>
                <TableCell className="font-medium text-gray-800">
                  {user.email}
                </TableCell>
                <TableCell className="font-medium text-gray-800">
                  {user.phoneNumber}
                </TableCell>
                <TableCell className="font-medium text-gray-800">
                  {user.role}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    className="border-4 border-black rounded-none bg-[#E0D7FF] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    className="ml-2 border-4 border-black rounded-none bg-[#FFB6C1] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );

  return (
    <div>
      <Navbar />
      <div className="flex-1 space-y-4 p-8 pt-6 bg-[#FFE5F1]">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-4xl font-black tracking-tight transform -rotate-1">
            Admin Dashboard
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all bg-[#E0D7FF] rounded-none transform rotate-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-black text-gray-800">
                Total Teachers
              </CardTitle>
              <Users className="h-6 w-6 text-black " />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black">{teachers.length}</div>
            </CardContent>
          </Card>
          <Card className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all bg-[#98FB98] rounded-none transform -rotate-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-black  text-gray-800">
                Total Students
              </CardTitle>
              <Users className="h-6 w-6 text-black" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black">{students.length}</div>
            </CardContent>
          </Card>
          <Card className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all bg-[#FFB6C1] rounded-none transform rotate-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-black  text-gray-800">
                Total Parents
              </CardTitle>
              <Users className="h-6 w-6 text-black" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black">{parents.length}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="teachers" className="space-y-4">
          <TabsList className="border-4 border-black bg-white h-12 p-1">
            <TabsTrigger
              value="teachers"
              className=" rounded-none data-[state=active]:bg-[#E0D7FF] data-[state=active]:text-black font-bold"
            >
              Teachers
            </TabsTrigger>
            <TabsTrigger
              value="students"
              className="rounded-none data-[state=active]:bg-[#98FB98] data-[state=active]:text-black font-bold"
            >
              Students
            </TabsTrigger>
            <TabsTrigger
              value="parents"
              className="rounded-none data-[state=active]:bg-[#FFB6C1] data-[state=active]:text-black font-bold "
            >
              Parents
            </TabsTrigger>
          </TabsList>
          <TabsContent value="teachers" className="space-y-4">
            <Card className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-none bg-white">
              <CardHeader className="border-b-4 border-black">
                <CardTitle className="text-2xl font-black  text-gray-800">
                  Teachers
                </CardTitle>
                <CardDescription className="text-base font-medium">
                  Manage all teachers in the system
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <UserTable users={teachers} userType="Teacher" />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="students" className="space-y-4">
            <Card className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-none bg-white">
              <CardHeader className="border-b-4 border-black">
                <CardTitle className="text-2xl font-black text-gray-800">
                  Students
                </CardTitle>
                <CardDescription className="text-base font-medium">
                  Manage all students in the system
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <UserTable users={students} userType="Student" />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="parents" className="space-y-4">
            <Card className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-none bg-white">
              <CardHeader className="border-b-4 border-black">
                <CardTitle className="text-2xl font-black text-gray-800">
                  Parents
                </CardTitle>
                <CardDescription className="text-base font-medium">
                  Manage all parents in the system
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <UserTable users={parents} userType="Parent" />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
