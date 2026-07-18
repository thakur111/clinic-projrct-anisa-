import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendEmailConfirmation, sendWhatsAppConfirmation } from '@/lib/notifications';

// This forces Next.js to not cache this API route
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  // Simple security check so random people can't trigger your reminders
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET || 'anisa_cron_secret_123'}`) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    // 1. Fetch appointments that haven't had a reminder sent and aren't cancelled
    const appointments = await prisma.appointment.findMany({
      where: {
        reminderSent: false,
        status: { not: 'cancelled' } 
      }
    });

    const now = new Date();
    const remindersSent = [];

    for (const appt of appointments) {
      // 2. Parse the preferredTime string (e.g. "10:30 AM" or "14:00")
      const timeMatch = appt.preferredTime.match(/(\d+):(\d+)\s*(AM|PM)?/i);
      if (!timeMatch) continue;

      let hours = parseInt(timeMatch[1]);
      const minutes = parseInt(timeMatch[2]);
      const ampm = timeMatch[3]?.toUpperCase();

      if (ampm === 'PM' && hours < 12) hours += 12;
      if (ampm === 'AM' && hours === 12) hours = 0;

      // 3. Construct exact appointment datetime
      const apptDate = new Date(appt.preferredDate);
      apptDate.setHours(hours, minutes, 0, 0);

      // 4. Calculate time difference in minutes
      const diffMs = apptDate.getTime() - now.getTime();
      const diffMinutes = Math.floor(diffMs / 1000 / 60);

      // 5. If the appointment is in exactly 5 minutes (we allow a window of 4 to 7 mins in case cron is slightly delayed)
      if (diffMinutes >= 4 && diffMinutes <= 7) {
        const notificationData = {
          name: appt.name,
          email: appt.email,
          phone: appt.phone,
          date: apptDate.toLocaleDateString(),
          time: appt.preferredTime,
        };

        // Send reminders (passing 'true' to activate the reminder template)
        await sendEmailConfirmation(notificationData, true);
        await sendWhatsAppConfirmation(notificationData, true);

        // Mark as sent in the database so we don't send it again
        await prisma.appointment.update({
          where: { id: appt.id },
          data: { reminderSent: true }
        });

        remindersSent.push(appt.id);
      }
    }

    return NextResponse.json({ 
      success: true, 
      checkedCount: appointments.length, 
      remindersSentCount: remindersSent.length, 
      sentIds: remindersSent 
    });
    
  } catch (error) {
    console.error('Cron job error:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
