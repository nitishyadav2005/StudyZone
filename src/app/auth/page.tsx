"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2, Lock, Mail, User, ShieldCheck, Eye, EyeOff, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth, useUser, initiateEmailSignIn, initiateEmailSignUp } from "@/firebase";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signupSchema = z.object({
  fullName: z.string().min(2, "Full Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function AuthPage() {
  const router = useRouter();
  const { auth } = useAuth();
  const { user, isUserLoading } = useUser();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showSignupConfirmPassword, setShowSignupConfirmPassword] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (user && !isUserLoading) {
      router.push("/dashboard");
    }
  }, [user, isUserLoading, router]);

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signupForm = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onLoginSubmit(values: z.infer<typeof loginSchema>) {
    if (!auth) return;
    initiateEmailSignIn(auth, values.email, values.password);
    setSuccessMessage("Login attempted. Redirecting...");
  }

  function handleSignupSubmit(values: z.infer<typeof signupSchema>) {
    if (!auth) return;
    initiateEmailSignUp(auth, values.email, values.password);
    setSuccessMessage("Account creation attempted. Redirecting...");
  }

  function handleForgotPassword() {
    alert("Password reset functionality placeholder popup triggered.");
  }

  if (isUserLoading) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 bg-background" suppressHydrationWarning>
      <div className="w-full max-w-[450px] animate-in fade-in zoom-in duration-500">
        {successMessage && (
          <Alert className="mb-6 bg-primary/10 border-primary text-primary" suppressHydrationWarning>
            <CheckCircle2 className="h-4 w-4" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>{successMessage}</AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="login" className="w-full" suppressHydrationWarning>
          <TabsList className="grid w-full grid-cols-2 mb-8 h-12" suppressHydrationWarning>
            <TabsTrigger value="login" className="text-sm font-bold" suppressHydrationWarning>Login</TabsTrigger>
            <TabsTrigger value="signup" className="text-sm font-bold" suppressHydrationWarning>Signup</TabsTrigger>
          </TabsList>

          <TabsContent value="login" suppressHydrationWarning>
            <Card className="border-white/10 shadow-2xl glass-card">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl text-center font-headline">Admin Login</CardTitle>
                <CardDescription className="text-center">
                  Enter your email and password to access admin features.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                    <FormField
                      control={loginForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input placeholder="admin@example.com" className="pl-10" {...field} suppressHydrationWarning />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={loginForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input 
                                type={showLoginPassword ? "text" : "password"} 
                                placeholder="••••••••" 
                                className="pl-10 pr-10" 
                                {...field} 
                                suppressHydrationWarning
                              />
                              <button
                                type="button"
                                onClick={() => setShowLoginPassword(!showLoginPassword)}
                                className="absolute right-3 top-3 h-4 w-4 text-muted-foreground hover:text-foreground transition-colors"
                                suppressHydrationWarning
                              >
                                {showLoginPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex justify-end">
                      <button 
                        type="button" 
                        onClick={handleForgotPassword}
                        className="text-xs text-secondary hover:underline font-medium"
                        suppressHydrationWarning
                      >
                        Forgot Password?
                      </button>
                    </div>
                    <Button type="submit" className="w-full font-bold h-11 bg-primary text-primary-foreground" suppressHydrationWarning>
                      Login
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="signup" suppressHydrationWarning>
            <Card className="border-white/10 shadow-2xl glass-card">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl text-center font-headline">Create Admin Account</CardTitle>
                <CardDescription className="text-center">
                  Register to start managing study materials across the platform.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...signupForm}>
                  <form onSubmit={signupForm.handleSubmit(handleSignupSubmit)} className="space-y-4">
                    <FormField
                      control={signupForm.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input placeholder="John Doe" className="pl-10" {...field} suppressHydrationWarning />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={signupForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input placeholder="admin@example.com" className="pl-10" {...field} suppressHydrationWarning />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={signupForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input 
                                type={showSignupPassword ? "text" : "password"} 
                                placeholder="••••••••" 
                                className="pl-10 pr-10" 
                                {...field} 
                                suppressHydrationWarning
                              />
                              <button
                                type="button"
                                onClick={() => setShowSignupPassword(!showSignupPassword)}
                                className="absolute right-3 top-3 h-4 w-4 text-muted-foreground hover:text-foreground transition-colors"
                                suppressHydrationWarning
                              >
                                {showSignupPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={signupForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <ShieldCheck className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input 
                                type={showSignupConfirmPassword ? "text" : "password"} 
                                placeholder="••••••••" 
                                className="pl-10 pr-10" 
                                {...field} 
                                suppressHydrationWarning
                              />
                              <button
                                type="button"
                                onClick={() => setShowSignupConfirmPassword(!showSignupConfirmPassword)}
                                className="absolute right-3 top-3 h-4 w-4 text-muted-foreground hover:text-foreground transition-colors"
                                suppressHydrationWarning
                              >
                                {showSignupConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full font-bold h-11 bg-secondary text-secondary-foreground mt-2" suppressHydrationWarning>
                      Create Account
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
