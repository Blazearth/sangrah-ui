import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";
    const agreed = body.agreedToPrivacy === true;

    if (!name || name.length < 2) {
      return NextResponse.json(
        { error: "Please enter your name." },
        { status: 400 }
      );
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Valid email address is required." },
        { status: 400 }
      );
    }

    if (!message || message.length < 10) {
      return NextResponse.json(
        { error: "Please enter a message (at least 10 characters)." },
        { status: 400 }
      );
    }

    if (!agreed) {
      return NextResponse.json(
        { error: "You must agree to the Privacy Policy." },
        { status: 400 }
      );
    }

    // Send email via Resend
    // Important: Keep 'from' strictly as 'onboarding@resend.dev' for sandbox accounts
    const { error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "arthsrivastava1@gmail.com",
      replyTo: email,
      subject: `New Message from ${name} - Sangrah Contact Form`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #2563eb;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Agreed to Privacy Policy:</strong> Yes</p>
          <h3 style="margin-top: 20px;">Message:</h3>
          <div style="background: #f4f4f5; padding: 15px; border-radius: 5px; white-space: pre-wrap;">
            ${message}
          </div>
          <br/>
          <p style="font-size: 12px; color: #888;">Submitted at: ${new Date().toISOString()}</p>
        </div>
      `,
    });

    if (error) {
      console.error("[contact] Resend API Error:", error);
      return NextResponse.json(
        { error: "Failed to send the message. Please try again later." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact] Unhandled Error:", err);
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
