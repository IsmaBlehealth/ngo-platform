import { Resend } from "resend";
import { env } from "@/lib/env";
import { logger } from "@/lib/logger";

const resend = env.RESEND_API_KEY ? new Resend(env.RESEND_API_KEY) : null;

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail({ to, subject, html, text }: SendEmailOptions): Promise<boolean> {
  if (!resend) {
    logger.warn("Email not sent — RESEND_API_KEY not configured", { to, subject });
    return false;
  }

  try {
    await resend.emails.send({
      from: "GAD <noreply@gad.org>",
      to,
      subject,
      html,
      text,
    });
    logger.info("Email sent", { to, subject });
    return true;
  } catch (error) {
    logger.error("Failed to send email", { error: String(error), to, subject });
    return false;
  }
}

export function passwordResetEmail(resetUrl: string): { subject: string; html: string; text: string } {
  return {
    subject: "Reset Your Password — Global Approach To Development",
    html: `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"></head>
      <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #1B1F23;">
        <div style="background: #0D5C63; padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">Password Reset</h1>
        </div>
        <div style="background: #FAF9F6; padding: 30px; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb;">
          <p style="font-size: 16px; line-height: 1.6;">You requested a password reset for your GAD account.</p>
          <p style="font-size: 16px; line-height: 1.6;">Click the button below to reset your password. This link expires in 1 hour.</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" style="background: #0D5C63; color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 16px;">Reset Password</a>
          </div>
          <p style="font-size: 14px; color: #6f797a;">If you didn't request this, you can safely ignore this email.</p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
          <p style="font-size: 12px; color: #6f797a; text-align: center;">
            Global Approach To Development • Ontario, CA • 501(c)(3) nonprofit
          </p>
        </div>
      </body>
      </html>
    `,
    text: `Reset your password: ${resetUrl}\n\nThis link expires in 1 hour.\n\nIf you didn't request this, ignore this email.`,
  };
}

export function donationReceiptEmail(amount: number, donationId: string): { subject: string; html: string; text: string } {
  return {
    subject: "Thank You for Your Donation — Global Approach To Development",
    html: `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"></head>
      <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #1B1F23;">
        <div style="background: #0D5C63; padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">Thank You!</h1>
        </div>
        <div style="background: #FAF9F6; padding: 30px; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb;">
          <p style="font-size: 16px; line-height: 1.6;">Your generous donation of <strong>$${(amount / 100).toFixed(2)}</strong> to Global Approach To Development has been received.</p>
          <p style="font-size: 16px; line-height: 1.6;">Donation ID: ${donationId}</p>
          <p style="font-size: 16px; line-height: 1.6;">As a 501(c)(3) nonprofit (EIN: 47-2155496), your donation is tax-deductible to the extent allowed by law.</p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
          <p style="font-size: 12px; color: #6f797a; text-align: center;">
            Global Approach To Development • 3200 E Guasti Rd., Suite 100, Ontario, CA 91761 • 909-728-8111
          </p>
        </div>
      </body>
      </html>
    `,
    text: `Thank you for your donation of $${(amount / 100).toFixed(2)}.\nDonation ID: ${donationId}\n\nAs a 501(c)(3), your donation is tax-deductible.\n\nGlobal Approach To Development • EIN: 47-2155496`,
  };
}
