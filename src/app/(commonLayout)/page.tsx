import BlogCard from "@/components/modules/homePage/BlogCard";
import { blogService } from "@/services/blog.service";

const HomePage = async () => {
  const { data: featuredPostsPromise } = await blogService.getBlogPosts(
    {
      isFeatured: true,
    },
    { cache: "no-store" }
  );
  const { data: postsPromise } = await blogService.getBlogPosts(
    { isFeatured: false, search: "" },
    { cache: "no-store" }
  );

  const [featuredPosts, posts] = await Promise.all([
    featuredPostsPromise,
    postsPromise,
  ]);
  
  return (
    <div>
      {/* featured posts */}
      <div className="p-6">
        {featuredPosts.data && featuredPosts.data.length > 0 ? (
          <>
            <h2 className="text-2xl text-center font-semibold">
              Featured Posts
            </h2>
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6">
              {featuredPosts.data.map((item: any) => (
                <BlogCard post={item} key={item?.id}></BlogCard>
              ))}
            </div>
          </>
        ) : (
          <p className="mt-8 text-gray-500"></p>
        )}
      </div>

      {/* all posts */}
      <div className="p-6">
        <h2 className="text-2xl  text-center font-semibold">All Posts</h2>
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
    </div>
  );
};

export default HomePage;
