"use server";
import { signIn } from "@/auth"
import { CredentialsSignin } from "next-auth";


const SigninRoute = async (formData: FormData)=> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
  } catch (error) {
    const err = error as CredentialsSignin;
   
    return  err.cause ;
  }
};

export default SigninRoute;
