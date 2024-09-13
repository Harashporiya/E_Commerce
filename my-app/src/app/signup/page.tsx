'use client'
import Link from "next/link"
import toast, { Toaster } from "react-hot-toast"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import SignupRoute from "../api/signup/route"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useState } from "react"

const SignupForm = () => {
  const [accountCreate, setAccountCreate] = useState(false)

  const handleSubmit = async (formData: FormData) => {
    const error = await SignupRoute(formData);
    if (error) {
      toast.error(error);
    } else {
      toast.success("Account created successfully");
      setAccountCreate(true);
    }
  };

  return (
    <div className="flex items-center min-h-screen bg-black">
      <Card className="mx-auto w-full max-w-sm rounded-3xl bg-black border-[1px] border-gray-200">
        <CardHeader>
          <CardTitle className="text-xl text-white">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target as HTMLFormElement);
              handleSubmit(formData);
            }}
            className="w-full"
          >
            <div className="grid gap-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="first-name" className="text-white font-sans">
                    First name
                  </Label>
                  <Input
                    id="first-name"
                    className="flex h-10 w-full border-none bg-[#27272a] text-white font-sans"
                    placeholder="John"
                    name="firstName"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="last-name" className="text-white font-sans">
                    Last name
                  </Label>
                  <Input
                    id="last-name"
                    name="lastName"
                    placeholder="Doe"
                    className="flex h-10 w-full border-none bg-[#27272a] text-white font-sans"
                    required
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-white font-sans">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@example.com"
                  required
                  className="flex h-10 w-full border-none bg-[#27272a] text-white font-sans"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password" className="text-white font-sans">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder=".................."
                  name="password"
                  className="flex h-10 w-full border-none bg-[#27272a] text-white font-sans"
                  required
                />
              </div>

              <Button type="submit" className="w-full text-white bg-black border-[1px] font-sans">
                Create Account
              </Button>


              <Dialog open={accountCreate} onOpenChange={setAccountCreate} >
                <DialogContent className="sm:max-w-[425px] bg-black">
                  <DialogHeader className="bg-black">
                    <DialogTitle>Email Verification Required</DialogTitle>
                    <DialogDescription>
                      Your account has been created. Please check your email to verify your account.
                    </DialogDescription>
                    <InputOTP maxLength={6}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </DialogHeader>
                  <DialogFooter>
                    <Button>Verify email</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Button variant="outline" className="w-full text-white font-sans">
                Sign up with Google
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center text-sm text-white">
            Already have an account?{" "}
            <Link href="/signin" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
      <Toaster />
    </div>
  );
};

export default SignupForm;
