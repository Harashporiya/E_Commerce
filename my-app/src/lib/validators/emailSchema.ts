import { z } from "zod";

const EmailSchema = z.object({
  otp: z.string({ "message": "Otp is 6 character" }).length(6, "Otp required is 6 character");
  firstName: z.string({ "message": "First name is string" });
  email:z.string({"message":"Email should be a string"})
})
export default EmailSchema
