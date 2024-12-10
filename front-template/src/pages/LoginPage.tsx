import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/stores/userStore";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

const LoginFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof LoginFormSchema>;

const LoginPage = () => {
  const [isStudent, setIsStudent] = useState(true);
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const login = useUserStore((state) => state.login);

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await login(data.email, data.password);
    } catch (error) {
      console.log(error);
      toast({
        title: "Login failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#FFE5F1] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-[#E0D7FF] rounded-full transform rotate-12 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-[#D1F4E0] transform -rotate-12 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"></div>

      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
            <Link 
              to="/" 
              className="text-4xl font-black text-black mb-2 transform -rotate-1"
            >
              Schoolio
            </Link>
          
          <p className="text-xl font-bold transform rotate-1 text-gray-700">
            Learning is fun! 📚
          </p>
        </div>

        <Card className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] bg-white transform rotate-1 hover:rotate-0">
          <CardHeader className="space-y-6">
            <div className="flex gap-2">
              <Button
                type="button"
                onClick={() => setIsStudent(true)}
                className={`flex-1 h-12 font-bold border-2 border-black transition-all ${
                  isStudent
                    ? 'bg-[#D1F4E0] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                    : 'bg-white hover:bg-[#D1F4E0]/50'
                }`}
              >
                STUDENT
              </Button>
              <Button
                type="button"
                onClick={() => setIsStudent(false)}
                className={`flex-1 h-12 font-bold border-2 border-black transition-all ${
                  !isStudent
                    ? 'bg-[#E0D7FF] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                    : 'bg-white hover:bg-[#E0D7FF]/50'
                }`}
              >
                PARENT
              </Button>
            </div>
            <CardTitle className="text-2xl font-black text-black">Login</CardTitle>
            <CardDescription className="text-base">
            Enter your account access information
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-base text-black">Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field} // Povezivanje input polja sa formom
                        placeholder="email@schoolio.com"
                        type="email"
                        className="border-2 border-black h-12 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:text-gray-900 text-black transition-all"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                />


                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel className="font-bold text-base text-black">Password</FormLabel>
                        <Link
                          to="/"
                          className="text-sm font-medium hover:underline decoration-2 underline-offset-4 text-gray-500"
                        >
                          You forgot your password?
                        </Link>
                      </div>
                      <FormControl>
                        <Input
                          {...field} // Povezivanje input polja sa formom
                          placeholder="••••••••"
                          type="password"
                          className="border-2 text-black focus:text-gray-900 border-black h-12 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />


                <Button 
                  type="submit" 
                  className="w-full h-12 font-bold text-lg border-2 border-black bg-[#FFE5F1] text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform hover:-translate-y-1 transition-all"
                >
                  Login →
                </Button>
              </form>
            </Form>

            <div className="mt-6 text-center text-sm text-gray-500">
              You don't have an account?{" "}
              <Link 
                to="/register" 
                className="font-bold hover:underline decoration-2 underline-offset-4 text-gray-500"
              >
                Register
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;