import Verifyed from "@/lib/model/send";

export const isOtpExist = async (email: string) => {
  const existingOtp = await Verifyed.findOne({
    email,
  });
  if (!existingOtp) return;
  return existingOtp;
};

export const deleteOtp = async () => {
  const now = new Date();
  const twoMinAgo = new Date(now.getTime() - 10 * 60 * 1000);
  await Verifyed.deleteMany({
    createdAt: {
      $lt: twoMinAgo,
    },
  });
};

export const isOtpValid = async (email: string, otp: number) => {
  const getOtp = await Verifyed.findOne({
    email,
  });
  if (getOtp?.otp == otp) return true;
  return false;
};
