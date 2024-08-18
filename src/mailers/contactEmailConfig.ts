import NodeMailer from 'nodemailer'

export const transporter = NodeMailer.createTransport({
  port: 465,
  service: 'gmail',
  host: process.env.MAIL_HOST,
  secure: true,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD
  }
});