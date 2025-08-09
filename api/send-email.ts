import { Resend } from "resend";

// Vercel serverless function to send transactional emails via Resend
// Required env vars (set per project in Vercel):
// - RESEND_API_KEY
// - EMAIL_FROM (e.g., "Your Brand <no-reply@yourdomain.com>")
// - EMAIL_TO (recipient for leads)

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const to = process.env.EMAIL_TO;
  const from = process.env.EMAIL_FROM || "Transactional <no-reply@yourdomain.com>";

  if (!resendApiKey || !to) {
    res.status(500).json({ error: "Resend not configured (missing RESEND_API_KEY or EMAIL_TO)" });
    return;
  }

  const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  const {
    type,
    address,
    services = [],
    name,
    phone,
    email,
    message,
    pageUrl,
  } = body || {};

  const subjectBase = type === "estimate_request" ? "New Estimate Request" : "New Form Submission";
  const subject = `${subjectBase}${name ? ` from ${name}` : ""}`;

  const html = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;line-height:1.5;color:#111">
      <h2 style="margin:0 0 12px 0">${subjectBase}</h2>
      <table style="border-collapse:collapse;width:100%;max-width:640px">
        <tbody>
          ${name ? `<tr><td style="padding:6px 8px;font-weight:600">Name</td><td style="padding:6px 8px">${escapeHtml(name)}</td></tr>` : ""}
          ${phone ? `<tr><td style="padding:6px 8px;font-weight:600">Phone</td><td style="padding:6px 8px">${escapeHtml(phone)}</td></tr>` : ""}
          ${email ? `<tr><td style="padding:6px 8px;font-weight:600">Email</td><td style="padding:6px 8px">${escapeHtml(email)}</td></tr>` : ""}
          ${address ? `<tr><td style="padding:6px 8px;font-weight:600">Address</td><td style="padding:6px 8px">${escapeHtml(address)}</td></tr>` : ""}
          ${Array.isArray(services) && services.length ? `<tr><td style="padding:6px 8px;font-weight:600">Services</td><td style="padding:6px 8px">${services.map(escapeHtml).join(", ")}</td></tr>` : ""}
          ${message ? `<tr><td style="padding:6px 8px;font-weight:600">Message</td><td style="padding:6px 8px;white-space:pre-wrap">${escapeHtml(message)}</td></tr>` : ""}
          ${pageUrl ? `<tr><td style="padding:6px 8px;font-weight:600">Page</td><td style="padding:6px 8px"><a href="${escapeAttr(pageUrl)}">${escapeHtml(pageUrl)}</a></td></tr>` : ""}
          <tr><td style="padding:6px 8px;font-weight:600">Submitted</td><td style="padding:6px 8px">${new Date().toLocaleString()}</td></tr>
        </tbody>
      </table>
    </div>
  `;

  try {
    const resend = new Resend(resendApiKey);
    await resend.emails.send({
      from,
      to,
      subject,
      reply_to: email,
      html,
    });
    res.status(200).json({ ok: true });
  } catch (err: any) {
    res.status(500).json({ error: err?.message || "Email send failed" });
  }
}

function escapeHtml(str: string) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function escapeAttr(str: string) {
  return String(str).replace(/"/g, "&quot;");
}
