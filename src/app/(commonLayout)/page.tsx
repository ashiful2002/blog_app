import BlogCard from "@/components/modules/homePage/BlogCard";
import { Button } from "@/components/ui/button";
import { blogService } from "@/services/blog.service";
import { userService } from "@/services/user.service";
import Link from "next/link";

const HomePage = async () => {
  const { data: posts } = await blogService.getBlogPosts(
    {
      isFeatured: false,
      search: "",
    },
    { cache: "no-store" }
  );

  return (
    <div className="p-6">
      {posts.data && posts.data.length > 0 ? (
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {posts.data.map((item: any) => (
            <BlogCard post={item} key={item?.id}></BlogCard>
          ))}
        </div>
      ) : (
        <p className="mt-8 text-gray-500">No posts found.</p>
      )}
    </div>
  );
};

export default HomePage;
