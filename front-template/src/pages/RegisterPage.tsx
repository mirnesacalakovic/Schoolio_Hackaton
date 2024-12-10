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

const RegisterFormSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(9, "Please enter a valid phone number"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  confirmPassword: z.string(),
  address: z.string().min(2, "Address must be at least 2 characters"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof RegisterFormSchema>;

const RegisterPage = () => {
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      address: "",
      },
  });

  const register = useUserStore((state) => state.register);


  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const { confirmPassword, ...registerData } = data;
      console.log("Register Data Sent to Backend:", registerData);
  
      await register({
        ...registerData,
        role: "PARENT", // Dodaj podrazumevanu vrednost za role
        teacherRole: null, // Postavi na null ako nije potrebno
      });
  
      toast({
        title: "Registration Successful!",
        description: "Welcome to Schoolio. Please, login.",
      });
    } catch (error) {
      console.log("Registration Error:", error);
      toast({
        title: "Registration Error",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#FFE5F1] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-[#E0D7FF] rounded-full transform rotate-12 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-[#D1F4E0] transform -rotate-12 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"></div>

      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
        <Link 
              to="/" 
              className="text-4xl font-black text-black mb-2 transform -rotate-1"
            >
              Schoolio
            </Link>
          <p className="text-xl font-bold transform rotate-1 text-gray-700">
            Parent Registration 👨‍👩‍👧‍👦
          </p>
        </div>

        <Card className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] bg-white transform rotate-1 hover:rotate-0">
          <CardHeader>
            <CardTitle className="text-2xl font-black text-gray-900">Registration</CardTitle>
            <CardDescription className="text-base">
              Fill out the form to create your account
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold text-base text-gray-900">Full Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your full name"
                            className="border-2 text-black focus:text-gray-900 border-black h-12 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold text-base text-gray-900">Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="email@example.com"
                            type="email"
                            className="border-2 text-black focus:text-gray-900 border-black h-12 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold text-base text-gray-900">Phone Number</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your phone number"
                            className="border-2 text-black focus:text-gray-900 border-black h-12 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold text-base text-gray-900">Address</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your current address"
                            className="border-2  text-black focus:text-gray-900 border-black h-12 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                            {...field}
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
                        <FormLabel className="font-bold text-base text-gray-900">Password</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="••••••••"
                            type="password"
                            className="border-2 text-black focus:text-gray-900 border-black h-12 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold text-base text-gray-900">Confirm Password</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="••••••••"
                            type="password"
                            className="border-2  text-black  focus:text-gray-900 border-black h-12 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 font-bold text-lg border-2 border-black bg-[#E0D7FF] text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform hover:-translate-y-1 transition-all"
                >
                  Register →
                </Button>
              </form>
            </Form>

            <div className="mt-6 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link 
                to="/login" 
                className="font-bold hover:underline decoration-2 underline-offset-4"
              >
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;