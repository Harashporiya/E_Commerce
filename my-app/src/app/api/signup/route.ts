"use server";
import { connectToDataBase } from "@/lib/db/db";
import { User } from "@/lib/model/user";
import { hash } from "bcryptjs";
import { redirect } from "next/navigation";

const SignupRoute = async (formData: FormData) => {
 
  const firstName = formData.get("firstName") as string
  const lastName = formData.get("lastName") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string


  await connectToDataBase();

  const existingUser = await User.findOne({ email });
  if (existingUser) console.log("User already exists");

  const hashedPassword = await hash(password, 10);

 const userCreate = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });
  redirect("/signup");
};

export default SignupRoute;
