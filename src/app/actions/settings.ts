"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function saveSiteSettings(formData: FormData) {
  try {
    const data = {
      clinicName: formData.get("clinicName") as string,
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
      address: formData.get("address") as string,
      workingHours: formData.get("workingHours") as string,
      facebook: formData.get("facebook") as string,
      instagram: formData.get("instagram") as string,
    };

    await prisma.siteSettings.upsert({
      where: { id: "default" },
      update: data,
      create: {
        id: "default",
        ...data,
      },
    });

    revalidatePath("/admin/settings");
    revalidatePath("/");
    
    return { success: true };
  } catch (error) {
    console.error("Error saving settings:", error);
    return { success: false, error: "Failed to save settings" };
  }
}
