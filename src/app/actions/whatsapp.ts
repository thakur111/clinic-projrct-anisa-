"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createWhatsAppLead(data: { name: string; phone: string }) {
  try {
    await prisma.whatsAppLead.create({
      data: {
        name: data.name,
        phone: data.phone,
      },
    });

    revalidatePath("/admin/whatsapp");
    return { success: true };
  } catch (error) {
    console.error("Failed to create WhatsApp lead:", error);
    return { success: false, error: "Failed to create lead" };
  }
}

export async function updateWhatsAppLeadStatus(id: string, status: string) {
  try {
    await prisma.whatsAppLead.update({
      where: { id },
      data: { status },
    });

    revalidatePath("/admin/whatsapp");
    return { success: true };
  } catch (error) {
    console.error("Failed to update WhatsApp lead:", error);
    return { success: false, error: "Failed to update status" };
  }
}

export async function deleteWhatsAppLead(id: string) {
  try {
    await prisma.whatsAppLead.delete({
      where: { id },
    });

    revalidatePath("/admin/whatsapp");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete WhatsApp lead:", error);
    return { success: false, error: "Failed to delete lead" };
  }
}
