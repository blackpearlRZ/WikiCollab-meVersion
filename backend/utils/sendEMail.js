const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    user: process.env.BREVO_USER,
    pass: process.env.BREVO_PASS,
  },
})

const sendEmail = async (to, subject, html) => {
  await transporter.sendMail({
    from: `"WikiCollab" <${process.env.BREVO_USER}>`,
    to,
    subject,
    html,
  })
}

module.exports = sendEmail