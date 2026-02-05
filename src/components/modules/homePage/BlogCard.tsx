import { Button } from "@/components/ui/button";
import { BlogPost } from "@/types";
import Link from "next/link";
import { Eye, MessageCircle, ArrowRight } from "lucide-react";
import Image from "next/image";

const BlogCard = ({ post: item }: { post: BlogPost }) => {
  return (
    <div>
      <div
        key={item.id}
        className="border rounded-lg p-4 hover:shadow-md transition"
      >
        {/* <img
          src="https://media.istockphoto.com/id/1980276924/vector/no-photo-thumbnail-graphic-element-no-found-or-available-image-in-the-gallery-or-album-flat.jpg?s=612x612&w=0&k=20&c=ZBE3NqfzIeHGDPkyvulUw14SaWfDj2rZtyiKv3toItk="
          alt={item?.title}
        /> */}
        <div className="relative w-full h-38 mb-6">
          <Image
            fill
            className="object-cover rounded-md"
            // src="https://media.istockphoto.com/id/1980276924/vector/no-photo-thumbnail-graphic-element-no-found-or-available-image-in-the-gallery-or-album-flat.jpg?s=612x612&w=0&k=20&c=ZBE3NqfzIeHGDPkyvulUw14SaWfDj2rZtyiKv3toItk="

            src="https://media.istockphoto.com/id/2207541574/photo/modern-workspace-with-laptop-displaying-data-in-a-bright-office-setting.jpg?s=612x612&w=0&k=20&c=TiUIUuGSqWWoChrXFy4IqdNctKpNXrWvcgPIg4XsbDk="
            alt="alter text"
          />
        </div>
        <h2 className="text-xl font-semibold my-2">{item.title}</h2>
        <p className="text-sm text-gray-600 mb-3">{item.content}</p>
        <div className="flex flex-wrap gap-2 mb-3">
          {item.tags &&
            item.tags.map((tag: string, index) => (
              <span
                key={index}
                className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded"
              >
                #{tag}
              </span>
            ))}
        </div>

        <hr />
        <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
          {/* Left side: views & comments */}
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              {item.views}
            </span>

            <span className="flex items-center gap-1">
              <MessageCircle className="h-4 w-4" />
              {item._count.comments}
            </span>
          </div>

          {/* Right side: read blog */}
          <Button variant="secondary" size="xs" asChild>
            <Link href={`/blog/${item.id}`} className="flex items-center gap-1">
              Read Blog
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
