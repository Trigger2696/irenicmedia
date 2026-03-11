import { NextResponse } from 'next/server'
import { sendEmail } from '@/lib/mailer'
import { pricingUserEmail, pricingBusinessEmail } from '@/lib/email-templates'

export async function POST(request: Request) {
  try {
    const { name, email, phone, plan } = await request.json()

    if (!name || !email || !phone || !plan) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const businessEmail = process.env.BUSINESS_EMAIL || 'irenicsocialmedia@gmail.com'

    // Email to the user
    await sendEmail({
      to: email,
      subject: `Thanks for your interest in our ${plan} plan — Irenic Media`,
      html: pricingUserEmail(name, plan),
    })

    // Email to the business
    await sendEmail({
      to: businessEmail,
      subject: `Pricing Inquiry: ${plan} plan — ${name}`,
      html: pricingBusinessEmail({ name, email, phone, plan }),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Pricing inquiry email error:', error)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
