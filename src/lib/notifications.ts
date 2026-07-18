import nodemailer from 'nodemailer';
import twilio from 'twilio';

/**
 * ==========================================
 * EMAIL NOTIFICATIONS (100% FREE via GMAIL)
 * ==========================================
 * To use this:
 * 1. Go to your Google Account -> Security
 * 2. Enable 2-Step Verification
 * 3. Search for "App Passwords" and create one
 * 4. Put your email and that App Password in your .env file
 */
export async function sendEmailConfirmation(appointmentDetails: any, isReminder: boolean = false) {
  try {
    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_APP_PASSWORD;

    if (!user || !pass) {
      console.warn("Skipping email confirmation: EMAIL_USER or EMAIL_APP_PASSWORD not set in .env");
      return false;
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass }
    });

    const headerText = isReminder ? "Appointment Reminder" : "Appointment Confirmed!";
    const bodyText = isReminder 
      ? "This is a friendly reminder that your appointment at Dr. Anisa's Clinic starts in exactly 5 minutes." 
      : "Your appointment at Dr. Anisa's Clinic has been successfully requested.";
    
    const subjectLine = isReminder 
      ? "Reminder: Your appointment starts in 5 minutes! - Dr. Anisa Clinic"
      : "Your Appointment is Confirmed - Dr. Anisa Clinic";

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 10px; overflow: hidden;">
        <div style="background-color: ${isReminder ? '#b45309' : '#0f4c3a'}; color: white; padding: 20px; text-align: center;">
          <h2 style="margin: 0;">${headerText}</h2>
        </div>
        <div style="padding: 30px; background-color: #f8fafc;">
          <p style="font-size: 16px; color: #334155;">Hello <strong>${appointmentDetails.name}</strong>,</p>
          <p style="font-size: 16px; color: #334155;">${bodyText}</p>
          
          <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #e2e8f0;">
            <p style="margin: 5px 0; color: #475569;"><strong>Date:</strong> ${appointmentDetails.date}</p>
            <p style="margin: 5px 0; color: #475569;"><strong>Time:</strong> ${appointmentDetails.time}</p>
            <p style="margin: 5px 0; color: #475569;"><strong>Phone:</strong> ${appointmentDetails.phone}</p>
          </div>
          
          <p style="font-size: 14px; color: #64748b; margin-top: 30px;">
            If you need to reschedule or have any questions, please reply to this email or contact us via WhatsApp.
          </p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"Dr. Anisa Clinic" <${user}>`,
      to: appointmentDetails.email,
      subject: subjectLine,
      html: htmlContent,
    });

    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
}


/**
 * ==========================================
 * WHATSAPP NOTIFICATIONS (Via TWILIO)
 * ==========================================
 * To use this:
 * 1. Create a free Twilio account (twilio.com)
 * 2. Activate the WhatsApp Sandbox
 * 3. Put your SID, Auth Token, and Twilio Sandbox Number in your .env file
 */
export async function sendWhatsAppConfirmation(appointmentDetails: any, isReminder: boolean = false) {
  try {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const fromWhatsAppNumber = process.env.TWILIO_WHATSAPP_NUMBER; // e.g., 'whatsapp:+14155238886'

    if (!accountSid || !authToken || !fromWhatsAppNumber) {
      console.warn("Skipping WhatsApp confirmation: Twilio credentials not set in .env");
      return false;
    }

    const client = twilio(accountSid, authToken);

    // Format phone number (Twilio expects E.164 format, e.g., +919876543210)
    // If user entered '9876543210' without country code, we can safely prepend +91 for India
    let toPhone = appointmentDetails.phone.replace(/\D/g, ''); // Remove non-digits
    if (toPhone.length === 10) {
      toPhone = '+91' + toPhone;
    } else if (!toPhone.startsWith('+')) {
      toPhone = '+' + toPhone;
    }

    const message = isReminder 
      ? `*Dr. Anisa Clinic - REMINDER*\n\nHello ${appointmentDetails.name}!\nThis is a friendly reminder that your appointment starts in exactly *5 minutes* (at ${appointmentDetails.time}).\n\nPlease be ready. Reply if you need assistance!`
      : `*Dr. Anisa Clinic*\n\nHello ${appointmentDetails.name}!\nYour appointment is confirmed for *${appointmentDetails.date}* at *${appointmentDetails.time}*.\n\nWe look forward to seeing you. Reply to this message if you need assistance!`;

    await client.messages.create({
      body: message,
      from: fromWhatsAppNumber,
      to: `whatsapp:${toPhone}`
    });

    return true;
  } catch (error) {
    console.error("Error sending WhatsApp message:", error);
    return false;
  }
}
