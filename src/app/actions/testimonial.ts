"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function submitPatientReview(data: {
  name: string;
  content: string;
  rating: number;
}) {
  try {
    if (!data.name || !data.content) {
      return { success: false, error: "Name and review content are required." };
    }

    await prisma.testimonial.create({
      data: {
        name: data.name.trim(),
        content: data.content.trim(),
        rating: Math.min(5, Math.max(1, Number(data.rating) || 5)),
        published: true, // Instantly publish on the page
        createdAt: new Date(),
      },
    });

    revalidatePath("/testimonials");
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error("Error submitting patient review:", error);
    return {
      success: false,
      error: "Failed to submit review. Please try again.",
    };
  }
}
