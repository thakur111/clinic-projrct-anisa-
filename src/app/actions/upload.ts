"use server";

import { writeFile } from "fs/promises";
import path from "path";

export async function uploadImage(formData: FormData) {
  try {
    const file = formData.get("file") as File;
    if (!file) {
      return { success: false, error: "No file uploaded" };
    }

    // Read the file as an ArrayBuffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Convert the buffer to a Base64 string
    // Format: data:[<mediatype>];base64,<data>
    const mimeType = file.type || 'image/jpeg';
    const base64Data = buffer.toString('base64');
    const base64Url = `data:${mimeType};base64,${base64Data}`;

    // Return the Base64 URL directly, avoiding local filesystem writes which fail on Vercel
    return { success: true, url: base64Url };
  } catch (error) {
    console.error("Error uploading image:", error);
    return { success: false, error: "Upload failed" };
  }
}
