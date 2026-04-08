import { NextResponse } from "next/server";
import { format } from "date-fns";
import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const {
      client_name,
      client_email,
      appointment_date,
      appointment_time,
      department,
      subject,
    } = await request.json();

    if (
      !client_name ||
      !client_email ||
      !appointment_date ||
      !appointment_time
    ) {
      return NextResponse.json(
        { message: "Missing required appointment details" },
        { status: 400 }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      return NextResponse.json(
        { message: "Resend API key not configured" },
        { status: 500 }
      );
    }

    const resend = new Resend(resendApiKey);

    const formattedDate = format(
      new Date(appointment_date),
      "EEEE, MMMM do, yyyy"
    );

    // Build a professional, spam-safe HTML email
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Appointment Rescheduled - DAS Healthcare</title>
</head>
<body style="margin:0;padding:0;background-color:#f0f4f8;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f0f4f8;padding:30px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);">
          
          <!-- Header -->
          <tr>
            <td align="center" style="padding:32px 40px;background:linear-gradient(135deg,#1e3a8a 0%,#2563eb 100%);">
              <h1 style="margin:0;color:#ffffff;font-size:26px;letter-spacing:1px;">DAS Healthcare</h1>
              <p style="margin:6px 0 0;color:#93c5fd;font-size:12px;letter-spacing:2px;text-transform:uppercase;">Healthcare Providers</p>
            </td>
          </tr>

          <!-- Blue Rescheduled Banner -->
          <tr>
            <td align="center" style="padding:20px 40px;background-color:#eff6ff;border-bottom:1px solid #bfdbfe;">
              <p style="margin:0;color:#1e3a8a;font-size:18px;font-weight:bold;">🔄 Appointment Rescheduled!</p>
            </td>
          </tr>
          
          <!-- Body -->
          <tr>
            <td style="padding:32px 40px;">
              <p style="margin:0 0 16px;color:#374151;font-size:16px;">Hello <strong>${client_name}</strong>,</p>
              <p style="margin:0 0 24px;color:#6b7280;font-size:15px;line-height:1.7;">
                Your appointment with DAS Healthcare has been <strong>rescheduled</strong>. We look forward to seeing you. Please review your new appointment details below.
              </p>
              
              <!-- Appointment Details Box -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f8fafc;border-radius:8px;border:1px solid #e2e8f0;margin-bottom:24px;">
                <tr>
                  <td style="padding:20px 24px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="padding:8px 0;border-bottom:1px solid #e2e8f0;">
                          <span style="color:#6b7280;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">📅 New Date</span>
                          <p style="margin:4px 0 0;color:#111827;font-size:15px;font-weight:600;">${formattedDate}</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0;border-bottom:1px solid #e2e8f0;">
                          <span style="color:#6b7280;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">🕐 New Time</span>
                          <p style="margin:4px 0 0;color:#111827;font-size:15px;font-weight:600;">${appointment_time}</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0;border-bottom:1px solid #e2e8f0;">
                          <span style="color:#6b7280;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">📋 Subject</span>
                          <p style="margin:4px 0 0;color:#111827;font-size:15px;font-weight:600;">${subject || "General Consultation"}</p>
                        </td>
                      </tr>
                      ${
                        department
                          ? `
                      <tr>
                        <td style="padding:8px 0;">
                          <span style="color:#6b7280;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">🏥 Department</span>
                          <p style="margin:4px 0 0;color:#111827;font-size:15px;font-weight:600;">${department}</p>
                        </td>
                      </tr>
                      `
                          : ""
                      }
                    </table>
                  </td>
                </tr>
              </table>
              
              <p style="margin:0 0 8px;color:#6b7280;font-size:14px;line-height:1.7;">
                If you need to reschedule again or cancel, please contact us at least <strong>24 hours</strong> in advance.
              </p>
              
              <!-- Contact Info -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top:20px;padding-top:20px;border-top:1px solid #e5e7eb;">
                <tr>
                  <td style="color:#6b7280;font-size:13px;line-height:1.8;">
                    📞 <strong>Tel:</strong> 02036216242<br/>
                    📞 <strong>Direct:</strong> 07856914135<br/>
                    ✉️ <strong>Email:</strong> admin@dascareproviders.com
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding:20px 40px;background-color:#f8fafc;border-top:1px solid #e5e7eb;">
              <p style="margin:0;color:#9ca3af;font-size:12px;line-height:1.6;">
                DAS Healthcare Providers<br/>
                9, Arcus Road, Bromley, Kent, BR1 4NN, UK.<br/>
                <span style="font-size:11px;">You received this email because you booked an appointment with us.</span>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    const { data, error } = await resend.emails.send({
      from: `DAS Healthcare <${process.env.SMTP_FROM_EMAIL || "admin@dascareproviders.com"}>`,
      to: [client_email],
      subject: "Your Appointment is Rescheduled – DAS Healthcare",
      html: htmlContent,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return NextResponse.json(
        { message: "Failed to send email via Resend", error },
        { status: 500 }
      );
    }

    console.log("Rescheduled email sent via Resend:", data?.id);
    return NextResponse.json(
      { success: true, messageId: data?.id },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Failed to send rescheduled email:", error);
    return NextResponse.json(
      { message: "Failed to send email", error: error.message },
      { status: 500 }
    );
  }
}
