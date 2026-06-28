import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const orgName = typeof body.orgName === "string" ? body.orgName.trim() : "";
    const role = typeof body.role === "string" ? body.role.trim() : "";
    const useCase = typeof body.useCase === "string" ? body.useCase.trim() : "";

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Valid email address is required." },
        { status: 400 }
      );
    }

    // Send email via Resend
    // Important: Keep 'from' strictly as 'onboarding@resend.dev' for sandbox accounts
    const { error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "blaze.work0210@gmail.com",
      replyTo: email,
      subject: `New Access Request - Sangrah`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e4e4e7; border-radius: 8px;">
          <h2 style="color: #2563eb; margin-top: 0;">New Request Access Submission</h2>
          <p>Someone has requested access to the Sangrah platform.</p>
          <hr style="border: 0; border-top: 1px solid #e4e4e7; margin: 20px 0;" />
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          ${orgName ? `<p><strong>Organization Name:</strong> ${orgName}</p>` : ""}
          ${role ? `<p><strong>Requested Role:</strong> ${role}</p>` : ""}
          ${useCase ? `
            <div style="margin-top: 15px;">
              <strong>Proposed Use Case:</strong>
              <div style="background: #f4f4f5; padding: 12px; border-radius: 6px; margin-top: 5px; white-space: pre-wrap; font-size: 14px; color: #4b5563;">
                ${useCase}
              </div>
            </div>
          ` : ""}
          <hr style="border: 0; border-top: 1px solid #e4e4e7; margin: 20px 0;" />
          <p style="font-size: 11px; color: #a1a1aa; margin-bottom: 0;">Submitted at: ${new Date().toLocaleString()}</p>
        </div>
      `,
    });

    if (error) {
      console.error("[request-access] Resend API Error:", error);
      return NextResponse.json(
        { error: "Failed to send the request. Please verify your Resend configuration." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[request-access] Unhandled Error:", err);
    return NextResponse.json(
      { error: "Invalid request." },
      { status: 400 }
    );
  }
}
