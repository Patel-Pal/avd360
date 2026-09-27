import type { ContactInput } from "@/lib/validation";
import { company } from "@/lib/content";

/**
 * Transactional emails via Resend (https://resend.com).
 *
 * Uses Resend's REST API directly — no extra dependency required.
 *
 * All senders use your OWN verified domain, configured through env vars so
 * this project can use a different sending domain than any other project:
 *
 *   RESEND_API_KEY        — Resend API key (required to send anything)
 *   EMAIL_FROM            — default "from" for all outgoing mail, e.g.
 *                           "AVD 360 Solution <noreply@yourdomain.com>"
 *   SITE_URL              — public site origin used for the logo + links in the
 *                           email, e.g. "https://yourdomain.com" (no trailing /)
 *   CONTACT_NOTIFY_TO     — internal address that receives contact enquiries
 *   CONTACT_NOTIFY_FROM   — optional override for the owner-notification "from"
 *   CONTACT_REPLY_FROM    — optional override for the visitor auto-reply "from"
 *   NEWSLETTER_FROM       — optional override for the newsletter welcome "from"
 *
 * If RESEND_API_KEY (or a required recipient) is not configured, the relevant
 * call logs and returns { sent: false } without throwing, so the contact /
 * newsletter flows still succeed and data is still saved to MongoDB.
 */

const RESEND_ENDPOINT = "https://api.resend.com/emails";

/** Fallback used only when no domain is configured. Cannot send to arbitrary recipients. */
const FALLBACK_FROM = `${company.name} <onboarding@resend.dev>`;

// ---- Brand palette (kept in sync with tailwind.config.ts) ----
const BRAND = {
  navy: "#0B1F3A",
  navyDeep: "#0E2A4D",
  gold: "#F5A623",
  muted: "#5B6B82",
  surfaceAlt: "#F7F9FC",
  border: "#E3E8F0",
} as const;

type SendResult = { sent: boolean; reason?: string };

interface SendEmailParams {
  from: string;
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
}

/** Low-level Resend send. Never throws — returns a structured result. */
async function sendEmail(params: SendEmailParams): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.info("[email] Skipped — RESEND_API_KEY not set.");
    return { sent: false, reason: "not-configured" };
  }

  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: params.from,
        to: params.to,
        subject: params.subject,
        html: params.html,
        ...(params.replyTo ? { reply_to: params.replyTo } : {}),
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("[email] Resend responded with an error:", text);
      return { sent: false, reason: "provider-error" };
    }

    return { sent: true };
  } catch (error) {
    console.error("[email] Failed to send:", error);
    return { sent: false, reason: "exception" };
  }
}

/** Resolve the default "from" address from env, falling back to Resend's sandbox sender. */
function defaultFrom(): string {
  return process.env.EMAIL_FROM || FALLBACK_FROM;
}

/** Public site origin (no trailing slash) used for logo + links in emails. */
function siteUrl(): string {
  return (process.env.SITE_URL || "https://avd360.com").replace(/\/$/, "");
}

/**
 * Wrap body content in the branded, email-client-safe HTML shell.
 *
 * Uses table-based layout and inline styles — the only reliable approach
 * across Gmail, Outlook, Apple Mail, etc.
 */
function renderShell(opts: {
  preheader: string;
  heading: string;
  bodyHtml: string;
}): string {
  const url = siteUrl();
  const logoUrl = `${url}/logo.jpeg`;
  const year = new Date().getFullYear();

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="color-scheme" content="light" />
    <title>${escapeHtml(company.name)}</title>
  </head>
  <body style="margin:0;padding:0;background-color:${BRAND.surfaceAlt};">
    <!-- Preheader (hidden preview text) -->
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;height:0;width:0;">
      ${escapeHtml(opts.preheader)}
    </div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${BRAND.surfaceAlt};padding:24px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:600px;background-color:#ffffff;border:1px solid ${BRAND.border};border-radius:12px;overflow:hidden;font-family:'Segoe UI',Helvetica,Arial,sans-serif;">
            <!-- Header -->
            <tr>
              <td style="background-color:${BRAND.navy};padding:28px 32px;text-align:center;">
                <a href="${url}" style="text-decoration:none;">
                  <img src="${logoUrl}" alt="${escapeHtml(company.name)}" width="180" style="display:inline-block;max-width:180px;height:auto;background:#ffffff;border-radius:6px;padding:6px 10px;" />
                </a>
                <p style="margin:14px 0 0;color:${BRAND.gold};font-size:12px;letter-spacing:1px;font-weight:600;text-transform:uppercase;">
                  ${escapeHtml(company.tagline)}
                </p>
              </td>
            </tr>
            <!-- Gold accent bar -->
            <tr><td style="height:4px;background-color:${BRAND.gold};line-height:4px;font-size:0;">&nbsp;</td></tr>
            <!-- Body -->
            <tr>
              <td style="padding:36px 32px 8px;">
                <h1 style="margin:0 0 18px;color:${BRAND.navy};font-size:22px;line-height:1.3;font-weight:700;">
                  ${escapeHtml(opts.heading)}
                </h1>
                ${opts.bodyHtml}
              </td>
            </tr>
            <!-- Footer -->
            <tr>
              <td style="padding:28px 32px 32px;">
                <hr style="border:none;border-top:1px solid ${BRAND.border};margin:0 0 20px;" />
                <p style="margin:0 0 6px;color:${BRAND.navy};font-size:14px;font-weight:700;">${escapeHtml(company.name)}</p>
                <p style="margin:0 0 12px;color:${BRAND.muted};font-size:13px;line-height:1.6;">
                  ${escapeHtml(company.positioning)}
                </p>
                <p style="margin:0 0 4px;color:${BRAND.muted};font-size:13px;">
                  Phone: <a href="${company.phoneHref}" style="color:${BRAND.navy};text-decoration:none;">${escapeHtml(company.phone)}</a>
                </p>
                <p style="margin:0 0 16px;color:${BRAND.muted};font-size:13px;">
                  Email: <a href="${company.emailHref}" style="color:${BRAND.navy};text-decoration:none;">${escapeHtml(company.email)}</a>
                  &nbsp;•&nbsp;
                  Web: <a href="${url}" style="color:${BRAND.navy};text-decoration:none;">${escapeHtml(url.replace(/^https?:\/\//, ""))}</a>
                </p>
                <p style="margin:0;color:${BRAND.muted};font-size:12px;">
                  © ${year} ${escapeHtml(company.name)}. All rights reserved.
                </p>
              </td>
            </tr>
          </table>
          <p style="color:${BRAND.muted};font-size:11px;margin:16px 0 0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;">
            This is an automated message. Please do not reply directly unless invited to.
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

/** A reusable paragraph style for body copy. */
function p(text: string): string {
  return `<p style="margin:0 0 14px;color:${BRAND.navyDeep};font-size:15px;line-height:1.65;">${text}</p>`;
}

/**
 * Notify the internal team of a new contact submission, and send the visitor
 * a professional auto-reply confirming we received their enquiry.
 */
export async function sendContactNotification(
  data: ContactInput
): Promise<{ ownerNotified: boolean; autoReplied: boolean }> {
  const to = process.env.CONTACT_NOTIFY_TO;
  const ownerFrom = process.env.CONTACT_NOTIFY_FROM || defaultFrom();
  const replyFrom = process.env.CONTACT_REPLY_FROM || defaultFrom();

  let ownerNotified = false;
  let autoReplied = false;

  // 1) Internal notification to the team.
  if (to) {
    const rows = [
      ["Name", data.name],
      ["Email", data.email],
      ["Phone", data.phone],
      ["Company", data.company || "—"],
      ["Service", data.service],
    ]
      .map(
        ([label, value]) => `
        <tr>
          <td style="padding:8px 12px;background-color:${BRAND.surfaceAlt};border:1px solid ${BRAND.border};font-size:13px;color:${BRAND.muted};font-weight:600;width:130px;">${escapeHtml(
          label
        )}</td>
          <td style="padding:8px 12px;border:1px solid ${BRAND.border};font-size:14px;color:${BRAND.navyDeep};">${escapeHtml(
          value
        )}</td>
        </tr>`
      )
      .join("");

    const ownerBody = `
      ${p("You have received a new enquiry through the website contact form. The details are below.")}
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin:0 0 18px;">
        ${rows}
      </table>
      <p style="margin:0 0 8px;color:${BRAND.navy};font-size:14px;font-weight:700;">Message</p>
      <div style="padding:14px 16px;background-color:${BRAND.surfaceAlt};border-left:4px solid ${BRAND.gold};border-radius:4px;color:${BRAND.navyDeep};font-size:14px;line-height:1.6;">
        ${escapeHtml(data.message).replace(/\n/g, "<br/>")}
      </div>
    `;

    const result = await sendEmail({
      from: ownerFrom,
      to,
      subject: `New enquiry: ${data.service} — ${data.name}`,
      html: renderShell({
        preheader: `New enquiry from ${data.name} regarding ${data.service}.`,
        heading: "New Contact Enquiry",
        bodyHtml: ownerBody,
      }),
      replyTo: data.email,
    });
    ownerNotified = result.sent;
  } else {
    console.info("[email] Owner notification skipped — CONTACT_NOTIFY_TO not set.");
  }

  // 2) Professional auto-reply to the visitor.
  const replyBody = `
    ${p(`Dear ${escapeHtml(data.name)},`)}
    ${p(
      `Thank you for contacting <strong>${escapeHtml(
        company.name
      )}</strong>. We have successfully received your enquiry regarding <strong>${escapeHtml(
        data.service
      )}</strong>, and a member of our team will review it and respond to you shortly.`
    )}
    ${p("For your reference, here is a copy of the message you submitted:")}
    <div style="padding:14px 16px;background-color:${BRAND.surfaceAlt};border-left:4px solid ${BRAND.gold};border-radius:4px;color:${BRAND.navyDeep};font-size:14px;line-height:1.6;margin:0 0 18px;">
      ${escapeHtml(data.message).replace(/\n/g, "<br/>")}
    </div>
    ${p(
      "In the meantime, feel free to explore our services and platform on our website. If your enquiry is urgent, you are welcome to reach us directly using the contact details below."
    )}
    ${p("We look forward to partnering with you.")}
    ${p(`Warm regards,<br/><strong>The ${escapeHtml(company.name)} Team</strong>`)}
  `;

  const replyResult = await sendEmail({
    from: replyFrom,
    to: data.email,
    subject: `Thank you for contacting ${company.name}`,
    html: renderShell({
      preheader: "We've received your enquiry and will be in touch shortly.",
      heading: "We've Received Your Enquiry",
      bodyHtml: replyBody,
    }),
  });
  autoReplied = replyResult.sent;

  return { ownerNotified, autoReplied };
}

/** Send a professional welcome email to a new newsletter subscriber. */
export async function sendNewsletterWelcome(email: string): Promise<SendResult> {
  const from = process.env.NEWSLETTER_FROM || defaultFrom();

  const body = `
    ${p("Hello,")}
    ${p(
      `Thank you for subscribing to the <strong>${escapeHtml(
        company.name
      )}</strong> newsletter. You're now on the list to receive our latest insights on business excellence, quality management, ISO compliance and digital transformation.`
    )}
    ${p(
      "We share practical guidance and updates designed to help organizations improve efficiency, strengthen their management systems and achieve sustainable growth."
    )}
    ${p("If you did not sign up for this newsletter, you can safely disregard this email.")}
    ${p(`Warm regards,<br/><strong>The ${escapeHtml(company.name)} Team</strong>`)}
  `;

  return sendEmail({
    from,
    to: email,
    subject: `Welcome to ${company.name}`,
    html: renderShell({
      preheader: "Thanks for subscribing — here's what to expect.",
      heading: `Welcome to ${company.name}`,
      bodyHtml: body,
    }),
  });
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
