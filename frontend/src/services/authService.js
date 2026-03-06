export const sendOTP = (phone) => {
  return new Promise((resolve) => {
    console.log("Sending OTP to:", phone);
    setTimeout(() => {
      resolve(true);
    }, 1000);
  });
};

export const verifyOTP = (otp) => {
  return new Promise((resolve) => {
    console.log("Verifying OTP:", otp);
    setTimeout(() => {
      resolve(true);
    }, 1000);
  });
};