import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendOTP, verifyOTP } from "../services/authService";
import "../css/login.css";

function Login() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  const handleSendOTP = async () => {
    await sendOTP(phone);
    setOtpSent(true);
  };

  const handleVerifyOTP = async () => {
    const result = await verifyOTP(otp);
    if (result) {
      navigate("/language");
    } else {
      alert("Invalid OTP");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>JanSeva AI Login</h2>

        <input
          type="text"
          placeholder="Enter Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        {!otpSent ? (
          <button onClick={handleSendOTP}>Send OTP</button>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button onClick={handleVerifyOTP}>Verify OTP</button>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;