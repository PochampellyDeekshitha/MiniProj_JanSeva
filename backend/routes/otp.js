import express from "express";
import axios from "axios";

const router = express.Router();

let generatedOTP = "";

router.post("/send-otp", async (req, res) => {
  const { phone } = req.body;

  generatedOTP = Math.floor(100000 + Math.random() * 900000);

  try {
    await axios.get("https://www.fast2sms.com/dev/bulkV2", {
      params: {
        authorization: "jzOHWb6cgahNkt2Xplw3dYAomiQruvZqCTEPy14GJ9sIDe0fMSlbd30GtUwHiauWSMLIfOVq7BPYnKkD",
        route: "otp",
        variables_values: generatedOTP,
        numbers: phone
      }
    });

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false });
  }
});

router.post("/verify-otp", (req, res) => {
  const { otp } = req.body;

  if (otp == generatedOTP) {
    res.json({ verified: true });
  } else {
    res.json({ verified: false });
  }
});

export default router;