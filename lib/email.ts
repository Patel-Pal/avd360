import type { ContactInput } from "@/lib/validation";

/**
 * Email notifications via Resend (https://resend.com).
 *
 * Uses Resend's REST API directly — no extra dependency required.
 *
 * All senders use your OWN verified domain, configured through env vars so
 * this project can use a different sending domain than any other project:
 *
 *   RESEND_API_KEY        — Resend API key (required to send anything)
 *   EMAIL_FROM            — default "from" for all outgoing mail, e.g.
 *                           "AVD 360 Solution <noreply@yourdomain.com>"
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
const FALLBACK_FROM = "AVD 360 Solution <onboarding@resend.dev>";

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

/**
 * Notify the internal team of a new contact submission, and send the visitor
 * an auto-reply confirming we received their enquiry.
 *
 * Returns which of the two emails were sent so the caller can surface it.
 */
export async function sendContactNotification(
  data: ContactInput
): Promise<{ ownerNotified: boolean; autoReplied: boolean }> {
  const to = process.env.CONTACT_NOTIFY_TO;
  const ownerFrom = process.env.CONTACT_NOTIFY_FROM || defaultFrom();
  const replyFrom = process.env.CONTACT_REPLY_FROM || defaultFrom();

  let ownerNotified = false;
  let autoReplied = false;

  // 1) Notify the team.
  if (to) {
    const ownerHtml = `
      <h2>New contact submission — AVD 360 Solution</h2>
      <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(data.phone)}</p>
      <p><strong>Company:</strong> ${escapeHtml(data.company || "-")}</p>
      <p><strong>Service:</strong> ${escapeHtml(data.service)}</p>
      <p><strong>Message:</strong><br/>${escapeHtml(data.message).replace(
        /\n/g,
        "<br/>"
      )}</p>
    `;
    const result = await sendEmail({
      from: ownerFrom,
      to,
      subject: `New enquiry: ${data.service} — ${data.name}`,
      html: ownerHtml,
      replyTo: data.email,
    });
    ownerNotified = result.sent;
  } else {
    console.info("[email] Owner notification skipped — CONTACT_NOTIFY_TO not set.");
  }

  // 2) Auto-reply to the visitor.
  const replyHtml = `
    <h2>Thanks for reaching out, ${escapeHtml(data.name)}!</h2>
    <p>We've received your enquiry about <strong>${escapeHtml(
      data.service
    )}</strong> and a member of our team will get back to you shortly.</p>
    <p>Here's a copy of what you sent us:</p>
    <blockquote style="border-left:3px solid #d4af37;margin:0;padding:0 0 0 12px;color:#555;">
      ${escapeHtml(data.message).replace(/\n/g, "<br/>")}
    </blockquote>
    <p>Warm regards,<br/>The AVD 360 Solution Team</p>
  `;
  const replyResult = await sendEmail({
    from: replyFrom,
    to: data.email,
    subject: "We've received your enquiry — AVD 360 Solution",
    html: replyHtml,
  });
  autoReplied = replyResult.sent;

  return { ownerNotified, autoReplied };
}

/** Send a welcome email to a new newsletter subscriber. */
export async function sendNewsletterWelcome(email: string): Promise<SendResult> {
  const from = process.env.NEWSLETTER_FROM || defaultFrom();

  const html = `
    <h2>Welcome to AVD 360 Solution</h2>
    <p>Thanks for subscribing! You'll now receive our latest insights on business
    excellence, quality management and digital transformation.</p>
    <p>If you didn't sign up, you can safely ignore this email.</p>
    <p>Warm regards,<br/>The AVD 360 Solution Team</p>
  `;

  return sendEmail({
    from,
    to: email,
    subject: "Welcome to AVD 360 Solution",
    html,
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
