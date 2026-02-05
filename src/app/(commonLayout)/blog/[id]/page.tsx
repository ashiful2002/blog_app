import { blogService } from "@/services/blog.service";
import type { BlogPost } from "@/types";
import { Eye, MessageCircle, Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";

// disable dynamic params to enable static generation
export const dynamicParams = false;

export async function generateStaticParams() {
  const { data: blogs } = await blogService.getBlogPosts();
  return blogs?.data?.map((blog: BlogPost) => ({ id: blog.id })).splice(0, 3); // limit to first 3 for performance
}

const BlogPost = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const { data: blog } = await blogService.getBlogById(id);

  return (
    <section className="max-w-4xl mx-auto px-4 py-10">
      {/* Back button */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-gray-200 hover:text-gray-50 mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Blogs
      </Link>

      {/* Cover Image */}
      <img
        src="https://media.istockphoto.com/id/1980276924/vector/no-photo-thumbnail-graphic-element-no-found-or-available-image-in-the-gallery-or-album-flat.jpg?s=612x612&w=0&k=20&c=ZBE3NqfzIeHGDPkyvulUw14SaWfDj2rZtyiKv3toItk="
        alt={blog.title}
        className="w-full h-[320px] object-cover rounded-lg mb-6"
      />

      {/* Title */}
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>

      {/* Meta Info */}
      <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-6">
        <span className="flex items-center gap-1">
          <Calendar className="h-4 w-4" />
          {new Date(blog.createdAt).toLocaleDateString()}
        </span>

        <span className="flex items-center gap-1">
          <Eye className="h-4 w-4" />
          {blog.views} views
        </span>

        <span className="flex items-center gap-1">
          <MessageCircle className="h-4 w-4" />
          {blog._count.comments} comments
        </span>
      </div>

      {/* Tags */}
      {blog.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {blog.tags.map((tag: string) => (
            <span
              key={tag}
              className="text-xs bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Content */}
      <article className="prose dark:prose-invert max-w-none">
        {blog.content}
      </article>
    </section>
  );
};

export default BlogPost;
