import nodemailer from 'nodemailer';

function buildEmailHtml(data) {
  const section = (title, content) =>
    content
      ? `<tr>
           <td style="padding: 12px 0; border-bottom: 1px solid #16262a;">
             <strong style="color: #1a9c6c; display: block; margin-bottom: 4px;">${title}</strong>
             <span style="color: #f4f6fb; white-space: pre-wrap;">${content}</span>
           </td>
         </tr>`
      : '';

  return `
    <table style="width: 100%; max-width: 600px; margin: 0 auto; font-family: Inter, system-ui, sans-serif; background: #05060a; color: #f4f6fb; border-collapse: collapse; border: 1px solid #16262a; border-radius: 14px; overflow: hidden;">
      <thead>
        <tr>
          <td style="background: #0a0c12; padding: 24px; border-bottom: 2px solid #1a9c6c;">
            <h1 style="margin: 0; font-size: 22px; color: #f4f6fb;">New Project Brief</h1>
            <p style="margin: 6px 0 0; color: #9aa3b2; font-size: 14px;">Submitted via praeto-group-tech-co.vercel.app</p>
          </td>
        </tr>
      </thead>
      <tbody style="padding: 24px; display: table-row-group;">
        ${section('Company Name', data.companyName)}
        ${section('Industry / Sector', data.industry)}
        ${section('Company Size', data.companySize)}
        ${section('Business Description', data.businessDescription)}
        ${section('Brand Values & Personality', data.brandValues)}
        ${section('Existing Branding', data.existingBranding)}
        ${section('Main Goal', data.projectGoal)}
        ${section('App / Website Type', data.appType + (data.appTypeOther ? ` (${data.appTypeOther})` : ''))}
        ${section('Target Audience', data.targetAudience)}
        ${section('What Customers Should Be Able to Do', data.customerActions)}
        ${section('Customer-Facing Features / Integrations', data.customerIntegrations)}
        ${section('Internal Team / Department', data.internalTeam)}
        ${section('What Internal Users Should Be Able to Do', data.internalActions)}
        ${section('Internal Tool Features / Integrations', data.internalIntegrations)}
        ${section('Success Metrics', data.successMetrics)}
        ${section('Apps / Websites Admired', data.inspiration)}
        ${section('Contact Name', data.contactName)}
        ${section('Contact Role', data.contactRole)}
        ${section('Email', data.email)}
        ${section('Phone', data.phone)}
        ${section('Anything Else', data.extraInfo)}
      </tbody>
    </table>
  `;
}

function buildEmailText(data) {
  return `
New Project Brief
Submitted via praeto-group-tech-co.vercel.app

Company Name: ${data.companyName || ''}
Industry / Sector: ${data.industry || ''}
Company Size: ${data.companySize || ''}

Business Description:
${data.businessDescription || ''}

Brand Values & Personality:
${data.brandValues || ''}

Existing Branding: ${data.existingBranding || ''}

Main Goal:
${data.projectGoal || ''}

App / Website Type: ${data.appType || ''}${data.appTypeOther ? ` (${data.appTypeOther})` : ''}
Target Audience:
${data.targetAudience || ''}

What Customers Should Be Able to Do:
${data.customerActions || ''}

Customer-Facing Features / Integrations:
${data.customerIntegrations || ''}

Internal Team / Department:
${data.internalTeam || ''}

What Internal Users Should Be Able to Do:
${data.internalActions || ''}

Internal Tool Features / Integrations:
${data.internalIntegrations || ''}

Success Metrics:
${data.successMetrics || ''}

Apps / Websites Admired:
${data.inspiration || ''}

Contact Name: ${data.contactName || ''}
Contact Role: ${data.contactRole || ''}
Email: ${data.email || ''}
Phone: ${data.phone || ''}

Anything Else:
${data.extraInfo || ''}
  `.trim();
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    OUTLOOK_EMAIL,
    OUTLOOK_APP_PASSWORD,
  } = process.env;

  if (!OUTLOOK_EMAIL || !OUTLOOK_APP_PASSWORD) {
    return res.status(500).json({
      error: 'Server email credentials are not configured.',
      hint: 'Set OUTLOOK_EMAIL and OUTLOOK_APP_PASSWORD in your Vercel project environment variables.',
    });
  }

  const data = req.body || {};

  const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false,
    auth: {
      user: OUTLOOK_EMAIL,
      pass: OUTLOOK_APP_PASSWORD,
    },
    tls: {
      ciphers: 'SSLv3',
    },
  });

  try {
    await transporter.sendMail({
      from: `Praeto Group TechCo <${OUTLOOK_EMAIL}>`,
      to: 'praetotech@outlook.com',
      replyTo: data.email || OUTLOOK_EMAIL,
      subject: `New Project Brief from ${data.companyName || data.contactName || 'Website'}`,
      text: buildEmailText(data),
      html: buildEmailHtml(data),
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Failed to send project brief email:', error);
    return res.status(500).json({
      error: 'Failed to send email.',
      details: error.message,
    });
  }
}
