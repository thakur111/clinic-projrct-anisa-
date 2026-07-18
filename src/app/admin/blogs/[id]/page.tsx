"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { getBlogById, updateBlog } from "@/app/actions/cms";
import { uploadImage } from "@/app/actions/upload";

export default function EditBlogPostPage() {
  const router = useRouter();
  const params = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
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

  useEffect(() => {
    async function loadBlog() {
      const result = await getBlogById(params.id as string);
      if (result.success && result.data) {
        setFormData({
          title: result.data.title || "",
          excerpt: result.data.excerpt || "",
          content: result.data.content || "",
          category: result.data.category || "",
          slug: result.data.slug || "",
          tags: result.data.tags || "",
          imageUrl: result.data.imageUrl || "",
        });
      } else {
        alert("Blog not found!");
        router.push("/admin/blogs");
      }
      setIsLoading(false);
    }
    loadBlog();
  }, [params.id, router]);

  const handleUpdate = async () => {
    if (!formData.title || !formData.content) {
      alert("Please provide at least a title and content.");
      return;
    }

    setIsSubmitting(true);
    const result = await updateBlog(params.id as string, formData);
    
    if (result.success) {
      router.push("/admin/blogs");
    } else {
      alert("Failed to update blog post.");
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center text-slate-500">Loading blog data...</div>;
  }

  return (
    <div className="p-8 max-w-5xl mx-auto pb-24">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/blogs" className={buttonVariants({ variant: "outline", size: "icon" })}>
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-3xl font-heading font-bold text-slate-900">Edit Blog Post</h1>
          <p className="text-slate-500 mt-1">Make changes to your published article.</p>
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
              <Button onClick={handleUpdate} disabled={isSubmitting} className="w-full bg-primary text-white">
                <Save className="h-4 w-4 mr-2" />
                {isSubmitting ? "Saving changes..." : "Save Changes"}
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
