function layout(content: string) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </head>
    <body style="margin: 0; padding: 0; background-color: #f4f4f5; font-family: 'Helvetica Neue', Arial, sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f5; padding: 40px 20px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%;">

              <!-- Header with logo -->
              <tr>
                <td style="background-color: #010101; padding: 32px 40px; border-radius: 16px 16px 0 0; text-align: center;">
                  <img src="cid:irenic-logo" alt="Irenic Media" style="height: 100px; width: auto;" />
                </td>
              </tr>

              <!-- Purple accent line -->
              <tr>
                <td style="background: linear-gradient(90deg, #C82AEF, #9333ea); height: 4px; font-size: 0; line-height: 0;">&nbsp;</td>
              </tr>

              <!-- Body -->
              <tr>
                <td style="background-color: #ffffff; padding: 40px;">
                  ${content}
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background-color: #fafafa; padding: 24px 40px; border-radius: 0 0 16px 16px; border-top: 1px solid #e5e5e5;">
                  <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 13px; text-align: center;">
                    Irenic Media &mdash; Strategy-Led Digital Marketing & Technology
                  </p>
                  <p style="margin: 0; color: #9ca3af; font-size: 12px; text-align: center;">
                    Navi Mumbai, India &bull; irenicsocialmedia@gmail.com
                  </p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `
}

// ===== CONTACT FORM EMAILS =====

export function contactUserEmail(name: string) {
  return layout(`
    <h1 style="margin: 0 0 20px 0; font-size: 24px; font-weight: 700; color: #1a1a1a;">
      Thank you for reaching out, ${name}!
    </h1>
    <p style="margin: 0 0 16px 0; font-size: 15px; line-height: 1.7; color: #4b5563;">
      We've received your message and truly appreciate your interest in working with us.
    </p>
    <div style="background-color: #faf5ff; border-left: 4px solid #C82AEF; padding: 16px 20px; border-radius: 0 8px 8px 0; margin: 24px 0;">
      <p style="margin: 0; font-size: 15px; color: #4b5563;">
        Our team will review your inquiry and get back to you within <strong style="color: #1a1a1a;">1–2 business days</strong>.
      </p>
    </div>
    <p style="margin: 24px 0 0 0; font-size: 15px; line-height: 1.7; color: #4b5563;">
      In the meantime, feel free to explore our services. We look forward to helping you grow.
    </p>
    <p style="margin: 32px 0 0 0; font-size: 14px; color: #9ca3af;">
      Warm regards,<br />
      <strong style="color: #4b5563;">The Irenic Media Team</strong>
    </p>
  `)
}

export function contactBusinessEmail({ name, email, company, message }: {
  name: string; email: string; company: string; message: string
}) {
  return layout(`
    <h1 style="margin: 0 0 8px 0; font-size: 22px; font-weight: 700; color: #1a1a1a;">
      New Contact Form Submission
    </h1>
    <p style="margin: 0 0 24px 0; font-size: 14px; color: #9ca3af;">
      A potential client has submitted the contact form on the website.
    </p>
    <table width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
      <tr>
        <td style="padding: 14px 20px; background-color: #faf5ff; font-size: 13px; font-weight: 600; color: #6b7280; width: 120px; border-bottom: 1px solid #e5e7eb;">Name</td>
        <td style="padding: 14px 20px; font-size: 15px; color: #1a1a1a; border-bottom: 1px solid #e5e7eb;">${name}</td>
      </tr>
      <tr>
        <td style="padding: 14px 20px; background-color: #faf5ff; font-size: 13px; font-weight: 600; color: #6b7280; border-bottom: 1px solid #e5e7eb;">Email</td>
        <td style="padding: 14px 20px; font-size: 15px; border-bottom: 1px solid #e5e7eb;"><a href="mailto:${email}" style="color: #C82AEF; text-decoration: none;">${email}</a></td>
      </tr>
      <tr>
        <td style="padding: 14px 20px; background-color: #faf5ff; font-size: 13px; font-weight: 600; color: #6b7280; border-bottom: 1px solid #e5e7eb;">Company</td>
        <td style="padding: 14px 20px; font-size: 15px; color: #1a1a1a; border-bottom: 1px solid #e5e7eb;">${company || '—'}</td>
      </tr>
      <tr>
        <td style="padding: 14px 20px; background-color: #faf5ff; font-size: 13px; font-weight: 600; color: #6b7280; vertical-align: top;">Message</td>
        <td style="padding: 14px 20px; font-size: 15px; color: #1a1a1a; line-height: 1.6;">${message}</td>
      </tr>
    </table>
  `)
}

// ===== PRICING INQUIRY EMAILS =====

export function pricingUserEmail(name: string, plan: string) {
  return layout(`
    <h1 style="margin: 0 0 20px 0; font-size: 24px; font-weight: 700; color: #1a1a1a;">
      Great choice, ${name}!
    </h1>
    <p style="margin: 0 0 16px 0; font-size: 15px; line-height: 1.7; color: #4b5563;">
      Thank you for your interest in our <strong style="color: #1a1a1a;">${plan}</strong> plan. We're excited to potentially work together.
    </p>
    <div style="background: linear-gradient(135deg, #faf5ff, #f3e8ff); border: 1px solid #e9d5ff; padding: 20px 24px; border-radius: 12px; margin: 24px 0; text-align: center;">
      <p style="margin: 0 0 4px 0; font-size: 13px; color: #9ca3af; text-transform: uppercase; letter-spacing: 1px;">Selected Plan</p>
      <p style="margin: 0; font-size: 28px; font-weight: 800; color: #C82AEF;">${plan}</p>
    </div>
    <div style="background-color: #faf5ff; border-left: 4px solid #C82AEF; padding: 16px 20px; border-radius: 0 8px 8px 0; margin: 24px 0;">
      <p style="margin: 0; font-size: 15px; color: #4b5563;">
        A member of our team will reach out within <strong style="color: #1a1a1a;">1–2 business days</strong> to discuss the details and get you started.
      </p>
    </div>
    <p style="margin: 24px 0 0 0; font-size: 15px; line-height: 1.7; color: #4b5563;">
      We can't wait to help you grow.
    </p>
    <p style="margin: 32px 0 0 0; font-size: 14px; color: #9ca3af;">
      Warm regards,<br />
      <strong style="color: #4b5563;">The Irenic Media Team</strong>
    </p>
  `)
}

export function pricingBusinessEmail({ name, email, phone, plan }: {
  name: string; email: string; phone: string; plan: string
}) {
  return layout(`
    <div style="background: linear-gradient(135deg, #faf5ff, #f3e8ff); border: 1px solid #e9d5ff; padding: 16px 20px; border-radius: 12px; margin: 0 0 24px 0; text-align: center;">
      <p style="margin: 0 0 4px 0; font-size: 12px; color: #9ca3af; text-transform: uppercase; letter-spacing: 1px;">New Pricing Inquiry</p>
      <p style="margin: 0; font-size: 24px; font-weight: 800; color: #C82AEF;">${plan} Plan</p>
    </div>
    <p style="margin: 0 0 24px 0; font-size: 14px; color: #6b7280;">
      A potential client has selected the <strong>${plan}</strong> plan and submitted their details.
    </p>
    <table width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
      <tr>
        <td style="padding: 14px 20px; background-color: #faf5ff; font-size: 13px; font-weight: 600; color: #6b7280; width: 120px; border-bottom: 1px solid #e5e7eb;">Name</td>
        <td style="padding: 14px 20px; font-size: 15px; color: #1a1a1a; border-bottom: 1px solid #e5e7eb;">${name}</td>
      </tr>
      <tr>
        <td style="padding: 14px 20px; background-color: #faf5ff; font-size: 13px; font-weight: 600; color: #6b7280; border-bottom: 1px solid #e5e7eb;">Email</td>
        <td style="padding: 14px 20px; font-size: 15px; border-bottom: 1px solid #e5e7eb;"><a href="mailto:${email}" style="color: #C82AEF; text-decoration: none;">${email}</a></td>
      </tr>
      <tr>
        <td style="padding: 14px 20px; background-color: #faf5ff; font-size: 13px; font-weight: 600; color: #6b7280; border-bottom: 1px solid #e5e7eb;">Phone</td>
        <td style="padding: 14px 20px; font-size: 15px; color: #1a1a1a; border-bottom: 1px solid #e5e7eb;">${phone}</td>
      </tr>
      <tr>
        <td style="padding: 14px 20px; background-color: #faf5ff; font-size: 13px; font-weight: 600; color: #6b7280;">Plan</td>
        <td style="padding: 14px 20px; font-size: 15px; font-weight: 700; color: #C82AEF;">${plan}</td>
      </tr>
    </table>
  `)
}
