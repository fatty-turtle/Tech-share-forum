import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// Verify transporter connection
transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP Connection Error:", error);
  } else {
    console.log("SMTP Server is ready to take our messages");
  }
});

/**
 * Sends a verification email to the user
 * @param {string} email - User's email address
 * @param {string} token - Verification token
 * @returns {Promise<void>}
 */
async function sendVerificationEmail(email, token) {
  const link = `${process.env.APP_URL}:${process.env.CLIENT_PORT}/verify-email/${token}`;

  await transporter.sendMail({
    from: `"Your App" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Verify your account",
    html: `
      <h2>Verify your account</h2>
      <p>Click the link below to activate your account:</p>
      <a href="${link}">${link}</a>
    `,
  });
}

export { sendVerificationEmail };
