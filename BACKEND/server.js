const express = require("express");
const cors = require("cors");
const twilio = require("twilio");

const app = express();

app.use(cors());
app.use(express.json());

// 🔴 Replace with your Twilio credentials
const ACCOUNT_SID = "YOUR_ACCOUNT_SID";
const AUTH_TOKEN = "YOUR_AUTH_TOKEN";
const TWILIO_NUMBER = "YOUR_TWILIO_PHONE_NUMBER";

const client = twilio("ACxxxxxxxxxxxx","your_real_auth_token");

let otpStore = {};
let users = [];

// Generate OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000);
}
app.post("/send",(req,res)=>{
  const {phone}=req.body;

  const otp=matchMedia.floor(100000+Math.random()*900000);
  otpStor[phone]=otp;

  console.log("otp:",otp);

  res.json({message:"otp sent(check terminal)"});
});

app.post("/send-otp", async (req, res) => {
  const { phone } = req.body;

  if (!phone) {
    return res.status(400).json({ message: "Phone number required" });
  }

  const otp = generateOTP();
  otpStore[phone] = otp;

  try {
    await client.messages.create({
      body: `Your OTP is ${otp}`,
      from: TWILIO_NUMBER,
      to: phone
    });

    console.log("OTP sent:", otp);

    res.json({ message: "OTP sent to phone" });

  } catch (error) {
    console.log("Twilio Error:", error.message);
    res.status(500).json({ message: "Failed to send OTP" });
  }
});

console.log("PHONE:",phone);
console.log("STORED OTP:",otpStore[phone]);
console.log("ENTERED OTP:",otp);


app.post("/verify-otp", (req, res) => {
  const { phone, otp, name } = req.body;

  console.log("Stored OTP:", otpStore[phone]);
  console.log("Entered OTP:", otp);

  if (Number(otpStore[phone]) !== Number(otp)) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  delete otpStore[phone];

  // Check if user exists
  const userExists = users.find(u => u.phone === phone);

  if (userExists) {
    return res.json({ message: "Login successful" });
  }

  // Create new user
  users.push({ name, phone });

  res.json({ message: "Account created successfully" });
});

app.get("/users", (req, res) => {
  res.json(users);
});



app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
