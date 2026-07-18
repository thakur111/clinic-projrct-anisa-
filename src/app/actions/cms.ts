"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// --- BLOGS ---
export async function createBlog(data: any) {
  try {
    const blog = await prisma.blog.create({
      data: {
        title: data.title,
        slug: data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
        content: data.content,
        excerpt: data.excerpt,
        imageUrl: data.imageUrl || null,
        category: data.category || "General",
        tags: data.tags || "",
        published: true, // Auto publish for now
      },
    });
    revalidatePath("/admin/blogs");
    return { success: true, data: blog };
  } catch (error) {
    console.error("Error creating blog:", error);
    return { success: false, error: "Failed to create blog" };
  }
}

export async function getBlogById(id: string) {
  try {
    const blog = await prisma.blog.findUnique({ where: { id } });
    return { success: true, data: blog };
  } catch (error) {
    return { success: false, error: "Failed to fetch blog" };
  }
}

export async function updateBlog(id: string, data: any) {
  try {
    const blog = await prisma.blog.update({
      where: { id },
      data: {
        title: data.title,
        slug: data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
        content: data.content,
        excerpt: data.excerpt,
        imageUrl: data.imageUrl || null,
        category: data.category || "General",
        tags: data.tags || "",
      },
    });
    revalidatePath("/admin/blogs");
    return { success: true, data: blog };
  } catch (error) {
    console.error("Error updating blog:", error);
    return { success: false, error: "Failed to update blog" };
  }
}

export async function deleteBlog(id: string) {
  try {
    await prisma.blog.delete({ where: { id } });
    revalidatePath("/admin/blogs");
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

// --- FAQs ---
export async function createFAQ(data: { question: string; answer: string; category: string }) {
  try {
    await prisma.fAQ.create({ data });
    revalidatePath("/admin/faq");
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

export async function deleteFAQ(id: string) {
  try {
    await prisma.fAQ.delete({ where: { id } });
    revalidatePath("/admin/faq");
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

// --- TESTIMONIALS ---
export async function createTestimonial(data: { name: string; content: string; rating: number; published: boolean }) {
  try {
    await prisma.testimonial.create({ data });
    revalidatePath("/admin/testimonials");
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

export async function deleteTestimonial(id: string) {
  try {
    await prisma.testimonial.delete({ where: { id } });
    revalidatePath("/admin/testimonials");
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}
