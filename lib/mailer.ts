import nodemailer from 'nodemailer'
import path from 'path'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

const logoPath = path.join(process.cwd(), 'public', 'logo-white.png')

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string
  subject: string
  html: string
}) {
  return transporter.sendMail({
    from: `"Irenic Media" <${process.env.SMTP_FROM}>`,
    to,
    subject,
    html,
    attachments: [
      {
        filename: 'logo.png',
        path: logoPath,
        cid: 'irenic-logo',
      },
    ],
  })
}
