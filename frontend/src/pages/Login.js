import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/login.css";

function Login() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(0);

  const navigate = useNavigate();

  // Countdown timer
  useEffect(() => {
    let interval;

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timer]);

  // Send OTP
  const handleSendOTP = async () => {
    const phoneRegex = /^[6-9]\d{9}$/;

    if (!phoneRegex.test(phone)) {
      alert("Enter valid 10-digit phone number");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ phone })
      });

      const data = await response.json();

      if (data.success) {
        setOtpSent(true);
        setTimer(30); // start 30 sec timer
        alert("OTP generated. Check backend terminal.");
      } else {
        alert("Failed to send OTP");
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  // Verify OTP
const handleVerifyOTP = async () => {

  const res = await fetch("http://localhost:5000/api/verify-otp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ phone, otp })
  });

  const data = await res.json();

  if (data.success) {

    localStorage.setItem("token", data.token);

    alert("Login successful");

    navigate("/language");

  } else {
    alert(data.message);
  }
};

  // Resend OTP
  const handleResendOTP = async () => {
    if (timer > 0) return;

    try {
      const response = await fetch("http://localhost:5000/api/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ phone })
      });

      const data = await response.json();

      if (data.success) {
        setTimer(30);
        alert("OTP resent");
      }
    } catch (error) {
      alert("Error resending OTP");
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
          maxLength="10"
          disabled={otpSent}
        />

        {!otpSent ? (
          <button onClick={handleSendOTP}>
            Generate OTP
          </button>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength="6"
            />

            <button onClick={handleVerifyOTP}>
              Verify OTP
            </button>

            <div style={{ marginTop: "10px" }}>
              {timer > 0 ? (
                <p>Resend OTP in {timer}s</p>
              ) : (
                <button onClick={handleResendOTP}>
                  Resend OTP
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;