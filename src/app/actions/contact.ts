"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function submitContact(data: { name: string; email: string; phone: string; message: string }) {
  try {
    const contact = await prisma.contactRequest.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message,
      },
    });

    revalidatePath("/admin/contacts");
    return { success: true, data: contact };
  } catch (error) {
    console.error("Error submitting contact:", error);
    return { success: false, error: "Failed to submit contact request" };
  }
}

export async function updateContactStatus(id: string, status: string) {
  try {
    await prisma.contactRequest.update({
      where: { id },
      data: { status },
    });
    revalidatePath("/admin/contacts");
    return { success: true };
  } catch (error) {
    console.error("Error updating contact status:", error);
    return { success: false };
  }
}
