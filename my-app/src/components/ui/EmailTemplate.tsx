import React from "react";

const EmailTemplate = ({
  firstName,
  otp,
}: {
  firstName: string;
  otp: string;
}) => {
  return (
    <div>
      <p>Hello {firstName},</p>
      <p>Your OTP is: {otp}</p>
      <p>Please use this OTP to complete your signup.</p>
    </div>
  );
};

export default EmailTemplate;
