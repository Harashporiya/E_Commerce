"use client";
import Link from "next/link";
import toast, { Toaster } from 'react-hot-toast';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SigninRoute from "../api/signin/route";
import { signIn } from "@/auth";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    try {
      const error = await SigninRoute(formData);

      if (error) {
        toast.error(String(error));
      } else {
        toast.success("Login successful");
        setTimeout(() => {
          router.push("/home");
        }, 2000);
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signIn("google");
    } catch (error) {
      toast.error("Google sign-in failed");
    }
  };

  return (
    <div className="flex items-center min-h-screen bg-gray-200">
      <Card className="mx-auto max-w-sm bg-gray-300">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  name="email"
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link href="#" className="ml-auto inline-block text-sm underline">
                    Forgot your password?
                  </Link>
                </div>
                <Input id="password" type="password" name="password" />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleGoogleSignIn}
              >
                Login with Google
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
      <Toaster />
    </div>
  );
};

export default LoginForm;
