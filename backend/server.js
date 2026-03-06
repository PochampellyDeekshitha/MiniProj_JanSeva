// backend/server.js
import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;
const JWT_SECRET = "janseva_secret_key";

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/janseva")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// OTP Schema
const otpSchema = new mongoose.Schema({
  phone: { type: String, required: true, unique: true },
  otp: { type: String, required: true },
  expiry: { type: Date, required: true },
  attempts: { type: Number, default: 0 },
  blockedUntil: { type: Date, default: null },
  lastSent: { type: Date, default: Date.now },
  verified: { type: Boolean, default: false } // Track if OTP was successfully verified
});

// TTL index to auto-delete expired OTPs
otpSchema.index({ expiry: 1 }, { expireAfterSeconds: 0 });

const OTP = mongoose.model("OTP", otpSchema);

// Helper functions
function maskPhone(phone) {
  return "******" + phone.slice(-4);
}

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Send OTP
app.post("/api/send-otp", async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) return res.json({ success: false, message: "Phone required" });

    const now = new Date();
    let record = await OTP.findOne({ phone });

    // Block check
    if (record?.blockedUntil && now < record.blockedUntil) {
      const wait = Math.ceil((record.blockedUntil - now) / 1000);
      return res.json({ success: false, message: `Too many attempts. Try again in ${wait}s.` });
    }

    // Resend throttle: 30 seconds
    if (record?.lastSent && now - record.lastSent < 30000) {
      const wait = Math.ceil((30000 - (now - record.lastSent)) / 1000);
      return res.json({ success: false, message: `Please wait ${wait}s before resending OTP.` });
    }

    const otp = generateOTP();
    const hashedOtp = await bcrypt.hash(otp, 10);

    if (record) {
      // Update existing document
      record.otp = hashedOtp;
      record.expiry = new Date(now.getTime() + 3 * 60 * 1000); // 3 min expiry
      record.lastSent = now;
      record.verified = false;
      await record.save();
    } else {
      // Create new document
      await OTP.create({
        phone,
        otp: hashedOtp,
        expiry: new Date(now.getTime() + 3 * 60 * 1000),
        lastSent: now
      });
    }

    console.log(`OTP for ${maskPhone(phone)} : ${otp}`);
    res.json({ success: true, message: "OTP sent successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Verify OTP
app.post("/api/verify-otp", async (req, res) => {
  try {
    const { phone, otp } = req.body;
    const record = await OTP.findOne({ phone });
    const now = new Date();

    if (!record) return res.json({ success: false, message: "OTP not found. Generate a new one." });

    // Check if blocked
    if (record.blockedUntil && now < record.blockedUntil) {
      const wait = Math.ceil((record.blockedUntil - now) / 1000);
      return res.json({ success: false, message: `Too many attempts. Try again in ${wait}s.` });
    }

    // Expiry check
    if (now > record.expiry) {
      return res.json({ success: false, message: "OTP expired. Generate a new one." });
    }

    // Compare OTP
    const isValid = await bcrypt.compare(otp, record.otp);

    if (isValid) {
      record.verified = true; // mark verified
      await record.save();

      const token = jwt.sign({ phone }, JWT_SECRET, { expiresIn: "1h" });
      return res.json({ success: true, token });
    }

    // Invalid OTP → increment attempts
    record.attempts++;
    if (record.attempts > 5) {
      record.blockedUntil = new Date(now.getTime() + 5 * 60 * 1000); // 5 min block
    }
    await record.save();

    if (record.attempts > 5) {
      return res.json({ success: false, message: "Too many attempts. Try again after 5 minutes." });
    }

    res.json({ success: false, message: "Invalid OTP. Please try again." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));