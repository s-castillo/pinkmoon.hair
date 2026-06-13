import { NextResponse } from "next/server";
import { Resend } from "resend";

type ContactPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  serviceInterest: string;
  hairDescription: string;
  referralSource: string;
  referralFriendName?: string;
};

function isValidPayload(payload: ContactPayload): boolean {
  return Boolean(
    payload.firstName.trim() &&
      payload.lastName.trim() &&
      payload.email.trim() &&
      payload.serviceInterest.trim() &&
      payload.hairDescription.trim() &&
      payload.referralSource.trim(),
  );
}

function buildTextBody(payload: ContactPayload): string {
  return [
    "New consultation inquiry received:",
    "",
    `First Name: ${payload.firstName}`,
    `Last Name: ${payload.lastName}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone || "Not provided"}`,
    `Service Interest: ${payload.serviceInterest}`,
    `Referral Source: ${payload.referralSource}`,
    payload.referralFriendName ? `Referred by: ${payload.referralFriendName}` : "",
    "",
    "Hair Description:",
    payload.hairDescription,
  ].filter((line, i, arr) => !(line === "" && arr[i - 1] === "")).join("\n");
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as ContactPayload;

    if (!isValidPayload(payload)) {
      return NextResponse.json({ error: "Please complete all required fields." }, { status: 400 });
    }

    const toEmail = process.env.CONTACT_TO_EMAIL;
    const fromEmail = process.env.CONTACT_FROM_EMAIL || "Pink Moon Salon <onboarding@resend.dev>";
    const resendApiKey = process.env.RESEND_API_KEY;
    const formspreeEndpoint = process.env.FORMSPREE_ENDPOINT;

    if (resendApiKey && toEmail) {
      const resend = new Resend(resendApiKey);

      await resend.emails.send({
        from: fromEmail,
        to: toEmail,
        replyTo: payload.email,
        subject: `New Consultation Inquiry - ${payload.firstName} ${payload.lastName}`,
        text: buildTextBody(payload),
      });

      return NextResponse.json({ ok: true, provider: "resend" });
    }

    if (formspreeEndpoint) {
      const formspreeResponse = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!formspreeResponse.ok) {
        return NextResponse.json({ error: "Form submission failed. Please try again." }, { status: 502 });
      }

      return NextResponse.json({ ok: true, provider: "formspree" });
    }

    return NextResponse.json(
      { error: "Form service not configured. Add RESEND_API_KEY + CONTACT_TO_EMAIL, or FORMSPREE_ENDPOINT." },
      { status: 500 },
    );
  } catch (_error) {
    return NextResponse.json({ error: "Unexpected error while sending inquiry." }, { status: 500 });
  }
}
