'use client'
import Link from "next/link"
import toast ,{Toaster} from "react-hot-toast"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import SignupRoute from "../api/signup/route"
import { signIn } from "@/auth"



export const description =
  "A sign up form with first name, last name, email and password inside a card. There's an option to sign up with GitHub and a link to login if you already have an account"

const  SignupForm=()=> {
  const handleSubmit = async (formData:FormData) => {
    const error = await SignupRoute(formData);
    if (error) {
      toast.error(error);
    } else {
      toast.success("Create account successful");
    }
  };

  return (<div className="flex items-center min-h-screen bg-black">
    <Card className="mx-auto w-full max-w-sm rounded-3xl bg-black border-[1px] border-gray-200">
      <CardHeader>
        <CardTitle className="text-xl text-white">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={handleSubmit} className="w-full">
        <div className="grid gap-4">
          <div className="grid  gap-4">
            <div className="grid gap-2">
              <Label htmlFor="first-name" className="text-white font-sans">First name</Label>
              <Input id="first-name" className="flex h-10 w-full border-none bg-[#27272a] text-white font-sans" placeholder="Jhon" name="firstName" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="last-name" className="text-white font-sans">Last name</Label>
              <Input id="last-name" name="lastName" placeholder="Robinson" className="flex h-10 w-full border-none bg-[#27272a] text-white font-sans" required />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email" className="text-white font-sans">Email</Label>
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
            <Label htmlFor="password" className="text-white font-sans">Password</Label>
            <Input id="password" type="password" placeholder=".................." name="password" className="flex h-10 w-full border-none bg-[#27272a] text-white font-sans" required />
          </div>
          <Button type="submit"   className="w-full text-white bg-black border-[1px] font-sans">
            Create an account
          </Button>
          <Button variant="outline"  className="w-full text-white font-sans">
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
    <Toaster/>
    </div>
  )
}
export default SignupForm
