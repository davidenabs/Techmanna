import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    // Validate the input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // Forward the submission to Web3Forms
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: process.env.WEB3FORMS_ACCESS_KEY || "3d3cc23c-2694-427e-baef-14be9a23cd24",
        name,
        email,
        phone,
        message,
        subject: "New Contact Form Submission from Techmanna Website",
        from_name: "Techmanna Website",
      }),
    });

    const result = await response.json();

    if (result.success) {
      return NextResponse.json(
        { message: "Thanks for reaching out! We'll be in touch soon." },
        { status: 200 }
      );
    } else {
      console.error("Web3Forms error:", result);
      return NextResponse.json(
        { error: result.message || "Failed to submit form." },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
