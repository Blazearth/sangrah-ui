import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = typeof body.email === "string" ? body.email.trim() : "";

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Valid email address is required." },
        { status: 400 }
      );
    }

    // Send email via Resend
    const { error } = await resend.emails.send({
      from: "Sangrah Notifications <onboarding@resend.dev>",
      to: "arthsrivastava1@gmail.com",
      subject: "New Access Request - Sangrah",
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #2563eb;">New Request Access Submission</h2>
          <p>Someone has requested access to the Sangrah platform.</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <br/>
          <p style="font-size: 12px; color: #888;">Submitted at: ${new Date().toISOString()}</p>
        </div>
      `,
    });

    if (error) {
      console.error("[request-access] Resend API Error:", error);
      return NextResponse.json(
        { error: "Failed to send the request. Please try again later." },
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
