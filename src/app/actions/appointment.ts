"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { sendEmailConfirmation, sendWhatsAppConfirmation } from "@/lib/notifications";

export async function createAppointment(data: any) {
  try {
    // 1. Check if patient exists by phone number
    let patient = await prisma.patient.findUnique({
      where: { phone: data.phone },
    });

    // 2. If patient doesn't exist, create them
    if (!patient) {
      patient = await prisma.patient.create({
        data: {
          name: data.name,
          phone: data.phone,
          email: data.email,
        },
      });
    }

    // 3. Create the appointment
    const appointment = await prisma.appointment.create({
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email,
        age: Number(data.age),
        gender: data.gender,
        reason: data.reason,
        preferredDate: new Date(data.preferredDate),
        preferredTime: data.preferredTime,
        mode: data.mode,
        patientId: patient.id,
      },
    });

    // 4. Send background notifications (We don't await them so the user doesn't wait)
    const notificationData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      date: new Date(data.preferredDate).toLocaleDateString(),
      time: data.preferredTime,
    };
    
    sendEmailConfirmation(notificationData).catch(console.error);
    sendWhatsAppConfirmation(notificationData).catch(console.error);

    revalidatePath("/admin/appointments");
    return { success: true, data: appointment };
  } catch (error) {
    console.error("Error creating appointment:", error);
    return { success: false, error: "Failed to submit appointment" };
  }
}
