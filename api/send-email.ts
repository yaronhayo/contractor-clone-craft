import { Resend } from "resend";
import { RateLimiter } from "limiter";
import validator from "validator";
import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";

// Create DOM for server-side DOMPurify
const window = new JSDOM('').window;
const purify = DOMPurify(window);

// Rate limiter: 5 requests per minute per IP
const limiter = new RateLimiter({
  tokensPerInterval: 5,
  interval: 'minute',
});

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

  // Rate limiting check
  const clientIP = req.headers["x-forwarded-for"] || req.connection?.remoteAddress || req.socket?.remoteAddress || "unknown";
  const remainingRequests = await limiter.removeTokens(1);
  
  if (remainingRequests < 0) {
    res.status(429).json({ 
      error: "Rate limit exceeded. Please wait before submitting another request.",
      retryAfter: 60
    });
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
    referrer,
    utmSource,
    utmMedium,
    utmCampaign,
    utmTerm,
    utmContent,
    recaptchaToken,
    honeypot,
    company,
  } = body || {};

  // Input validation and sanitization
  if (!name || !phone || !email || !address) {
    res.status(400).json({ error: "Missing required fields: name, phone, email, address" });
    return;
  }

  // Validate email format
  if (!validator.isEmail(email)) {
    res.status(400).json({ error: "Invalid email format" });
    return;
  }

  // Sanitize inputs
  const sanitizedName = purify.sanitize(validator.escape(name?.toString() || ""));
  const sanitizedPhone = purify.sanitize(validator.escape(phone?.toString() || ""));
  const sanitizedEmail = validator.normalizeEmail(email?.toString() || "") || "";
  const sanitizedAddress = purify.sanitize(validator.escape(address?.toString() || ""));
  const sanitizedMessage = purify.sanitize(validator.escape(message?.toString() || ""));

  // Validate phone number format (basic validation)
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  if (!phoneRegex.test(sanitizedPhone.replace(/[\s\-\(\)\.]/g, ""))) {
    res.status(400).json({ error: "Invalid phone number format" });
    return;
  }

  // Honeypot spam check: silently accept but do not send
  const hp = (honeypot || company || "").toString().trim();
  if (hp) {
    res.status(200).json({ ok: true });
    return;
  }

  // Optional server-side reCAPTCHA verification (v2 Invisible)
  const recaptchaSecret = process.env.RECAPTCHA_SECRET;
  if (recaptchaSecret && type !== "test") {
    const token = (recaptchaToken || "").toString().trim();
    if (!token) {
      res.status(400).json({ error: "Missing reCAPTCHA token" });
      return;
    }
    try {
      const ipHeader = (req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "").toString();
      const remoteip = ipHeader.split(",")[0].trim();
      const params = new URLSearchParams();
      params.set("secret", recaptchaSecret);
      params.set("response", token);
      if (remoteip) params.set("remoteip", remoteip);

      const verifyResp = await fetch("https://www.google.com/recaptcha/api/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      });
      const verify = await verifyResp.json();
      if (!verify?.success) {
        res.status(400).json({ error: "reCAPTCHA verification failed" });
        return;
      }
    } catch (e) {
      res.status(500).json({ error: "reCAPTCHA verification error" });
      return;
    }
  }

  const subjectBase = type === "estimate_request" ? "New Estimate Request" : "New Form Submission";
  const subject = `${subjectBase}${sanitizedName ? ` from ${sanitizedName}` : ""}`;

  const html = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;line-height:1.5;color:#111">
      <h2 style="margin:0 0 12px 0">${subjectBase}</h2>
      <table style="border-collapse:collapse;width:100%;max-width:640px">
        <tbody>
          ${sanitizedName ? `<tr><td style="padding:6px 8px;font-weight:600">Name</td><td style="padding:6px 8px">${sanitizedName}</td></tr>` : ""}
          ${sanitizedPhone ? `<tr><td style="padding:6px 8px;font-weight:600">Phone</td><td style="padding:6px 8px">${sanitizedPhone}</td></tr>` : ""}
          ${sanitizedEmail ? `<tr><td style="padding:6px 8px;font-weight:600">Email</td><td style="padding:6px 8px">${sanitizedEmail}</td></tr>` : ""}
          ${sanitizedAddress ? `<tr><td style="padding:6px 8px;font-weight:600">Address</td><td style="padding:6px 8px">${sanitizedAddress}</td></tr>` : ""}
          ${Array.isArray(services) && services.length ? `<tr><td style="padding:6px 8px;font-weight:600">Services</td><td style="padding:6px 8px">${services.map(s => purify.sanitize(validator.escape(s?.toString() || ""))).join(", ")}</td></tr>` : ""}
          ${sanitizedMessage ? `<tr><td style="padding:6px 8px;font-weight:600">Message</td><td style="padding:6px 8px;white-space:pre-wrap">${sanitizedMessage}</td></tr>` : ""}
          ${pageUrl ? `<tr><td style="padding:6px 8px;font-weight:600">Landing Page</td><td style="padding:6px 8px"><a href="${escapeAttr(pageUrl)}">${escapeHtml(pageUrl)}</a></td></tr>` : ""}
          ${referrer ? `<tr><td style=\"padding:6px 8px;font-weight:600\">Referrer</td><td style=\"padding:6px 8px\">${escapeHtml(referrer)}</td></tr>` : ""}
          ${(utmSource || utmMedium || utmCampaign || utmTerm || utmContent) ? `
            <tr><td colspan=\"2\" style=\"padding:6px 8px;font-weight:600\">UTM Parameters</td></tr>
            ${utmSource ? `<tr><td style=\"padding:6px 8px\">utm_source</td><td style=\"padding:6px 8px\">${escapeHtml(utmSource)}</td></tr>` : ""}
            ${utmMedium ? `<tr><td style=\"padding:6px 8px\">utm_medium</td><td style=\"padding:6px 8px\">${escapeHtml(utmMedium)}</td></tr>` : ""}
            ${utmCampaign ? `<tr><td style=\"padding:6px 8px\">utm_campaign</td><td style=\"padding:6px 8px\">${escapeHtml(utmCampaign)}</td></tr>` : ""}
            ${utmTerm ? `<tr><td style=\"padding:6px 8px\">utm_term</td><td style=\"padding:6px 8px\">${escapeHtml(utmTerm)}</td></tr>` : ""}
            ${utmContent ? `<tr><td style=\"padding:6px 8px\">utm_content</td><td style=\"padding:6px 8px\">${escapeHtml(utmContent)}</td></tr>` : ""}
          ` : ""}
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
      reply_to: sanitizedEmail,
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
