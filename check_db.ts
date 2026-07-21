import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function check() {
  const blogs = await prisma.blog.findMany();
  console.log("Blogs:");
  blogs.forEach(b => console.log(b.id, b.title, b.imageUrl));
}

check().catch(console.error).finally(() => prisma.$disconnect());
