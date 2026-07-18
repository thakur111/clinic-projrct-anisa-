"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { createBlog } from "@/app/actions/cms";
import { uploadImage } from "@/app/actions/upload";

export default function NewBlogPostPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    slug: "",
    tags: "",
    imageUrl: "",
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const form = new FormData();
    form.append("file", file);

    const result = await uploadImage(form);
    if (result.success && result.url) {
      setFormData({ ...formData, imageUrl: result.url });
    } else {
      alert("Failed to upload image.");
    }
    setIsUploading(false);
  };

  const handlePublish = async () => {
    if (!formData.title || !formData.content) {
      alert("Please provide at least a title and content.");
      return;
    }

    setIsSubmitting(true);
    const result = await createBlog(formData);
    
    if (result.success) {
      router.push("/admin/blogs");
    } else {
      alert("Failed to publish blog post.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto pb-24">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/blogs" className={buttonVariants({ variant: "outline", size: "icon" })}>
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-3xl font-heading font-bold text-slate-900">New Blog Post</h1>
          <p className="text-slate-500 mt-1">Write and publish a new article.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Editor Area */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Article Title</label>
                <Input 
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. 5 Ayurvedic Remedies for PCOS" 
                  className="text-lg py-6" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Excerpt (Short Description)</label>
                <Textarea 
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="A brief summary for the blog listing page..." 
                  className="h-20" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Content</label>
                <RichTextEditor 
                  content={formData.content} 
                  onChange={(html) => setFormData({ ...formData, content: html })} 
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Publishing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={handlePublish} disabled={isSubmitting} className="w-full bg-primary text-white">
                <Save className="h-4 w-4 mr-2" />
                {isSubmitting ? "Publishing..." : "Save & Publish"}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Metadata</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Category</label>
                <Input 
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="e.g. Diet, PCOS, General" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Cover Image</label>
                <div className="flex flex-col gap-3">
                  {formData.imageUrl && (
                    <img src={formData.imageUrl} alt="Cover Preview" className="w-full h-40 object-cover rounded-lg border border-slate-200" />
                  )}
                  <Input 
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUploading}
                    className="cursor-pointer"
                  />
                  {isUploading && <p className="text-xs text-primary animate-pulse font-medium">Uploading image...</p>}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Tags (comma separated)</label>
                <Input 
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="e.g. ayurveda, weight loss" 
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
