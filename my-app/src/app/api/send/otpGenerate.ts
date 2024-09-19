import EmailTemplate from "@/components/ui/EmailTemplate";
import { Resend } from "resend";
import EmailSchema from "@/lib/validators/emailSchema";
import { NextResponse } from "next/server";
import Verifyed from "@/lib/model/send";
import { z } from "zod";
type EmailType = z.infer<typeof EmailSchema>;

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOtp({ otp, firstName, email }: EmailType) {
  try {
    const { data, error } = await resend.emails.send({
      from: "poriya.harash@gmail.com",
      to: [email],
      subject: "Your OTP Code",
      react: EmailTemplate({ firstName, otp }),
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function createOtp({ otp, firstName, email }: EmailType) {
  const createdOtp = await Verifyed.create({
    email,
    otp,
    firstName,
  });

  if (!createdOtp) {
    console.log("Error while creating OTP: " + createdOtp);
    return;
  }

  try {
    const otpData = await sendOtp({ otp, firstName, email });
    console.log(otpData);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
