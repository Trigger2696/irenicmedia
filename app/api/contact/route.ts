import { NextResponse } from 'next/server'
import { sendEmail } from '@/lib/mailer'
import { contactUserEmail, contactBusinessEmail } from '@/lib/email-templates'

export async function POST(request: Request) {
  try {
    const { name, email, company, message } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const businessEmail = process.env.BUSINESS_EMAIL || 'irenicsocialmedia@gmail.com'

    // Email to the user
    await sendEmail({
      to: email,
      subject: 'Thanks for contacting Irenic Media!',
      html: contactUserEmail(name),
    })

    // Email to the business
    await sendEmail({
      to: businessEmail,
      subject: `New Contact Inquiry from ${name}`,
      html: contactBusinessEmail({ name, email, company, message }),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact email error:', error)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
