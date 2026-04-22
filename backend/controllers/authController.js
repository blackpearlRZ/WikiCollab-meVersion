//Send OTP to user email for passwordless login
const nodemailer = require("nodemailer")
const Otp = require("../models/otp")
const sendEmail = require("../utils/sendEMail")
const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const otpStore = new Map()

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body

    // ✅ CHECK IF USER EXISTS FIRST
    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists. Please login instead.",
        redirect: "/login",
      })
    }

    // ✅ generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000)
    otpStore.set(email, otp)
    console.log("OTP:", otp)

    // 👉 send email here (or skip for now)
    await transporter.sendMail({
  from: process.env.EMAIL_USER,
  to: email,
  subject: "Your OTP Code - WikiCollab",
  html: `
  <div style="font-family: Arial, sans-serif; background:#f4f4f5; padding:30px;">
    <div style="max-width:500px; margin:auto; background:white; padding:20px; border-radius:12px; text-align:center;">

      <h2 style="color:#111827;">WikiCollab Verification</h2>

      <p style="color:#6b7280; font-size:14px;">
        Use the OTP below to verify your email address
      </p>

      <div style="margin:20px 0; font-size:32px; letter-spacing:8px; font-weight:bold; color:#111827;">
        ${otp}
      </div>

      <p style="color:#9ca3af; font-size:12px;">
        This code will expire in 5 minutes
      </p>

      <div style="margin-top:20px; font-size:12px; color:#9ca3af;">
        If you didn’t request this, you can ignore this email.
      </div>

    </div>
  </div>
  `
})
    //console.log("Sending email to:", email)

    res.json({
      message: "OTP sent successfully",
    })

  } catch (err) {
    res.status(500).json({ message: "Failed to send OTP" })
  }
}

// Verify OTP and log in user
exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const storedOtp = otpStore.get(email);

    if (!storedOtp) {
      return res.status(400).json({ message: "OTP expired" });
    }

    if (String(storedOtp) !== String(otp)) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    otpStore.delete(email);

    return res.json({
      message: "OTP verified",
      emailVerified: true,
    });

  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

// Create account after OTP verification
exports.createAccount = async (req, res) => {
  try {
    const { name, email, password } = req.body

    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" })
    }

    // 🔐 hash password (IMPORTANT)
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    })

    return res.json({
      message: "Account created successfully",
      user,
    })

  } catch (err) {
    console.log("CREATE ACCOUNT ERROR:", err)
    res.status(500).json({ message: "Error creating account" })
  }
}

// send reset password link to user email
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    )

    const link = `${process.env.CLIENT_URL}/reset-password/${token}`

    await sendEmail(
      email,
      "Reset Password - WikiCollab",
      `
      <div style="font-family:Arial;padding:20px">
        <h2>Reset your password</h2>
        <p>Click below to reset your password:</p>

        <a href="${link}"
           style="padding:10px 20px;background:#111;color:#fff;
           text-decoration:none;border-radius:6px;display:inline-block;">
          Reset Password
        </a>

        <p style="margin-top:20px;font-size:12px;color:gray;">
          This link expires in 15 minutes
        </p>
      </div>
      `
    )

    res.json({ message: "Reset link sent to email" })

  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Server error" })
  }
}

// reset password using token
exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params
    const { password } = req.body

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await User.findById(decoded.id)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    user.password = hashedPassword
    await user.save()

    res.json({ message: "Password updated successfully" })

  } catch (err) {
    res.status(400).json({ message: "Invalid or expired token" })
  }
}

// Get current logged in user
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};