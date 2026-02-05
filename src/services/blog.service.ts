import { env } from "@/env";
import { cookies } from "next/headers";

const BACKEND_URL = env.BACKEND_URL;

interface GetBlogParams {
  isFeatured?: boolean;
  search?: string;
  page?: string;
}

interface ServiceOptions {
  cache?: RequestCache;
  relavilated?: number;
}

export interface BlogData {
  title: string;
  content: string;
  tag?: string[];
}
export const blogService = {
  getBlogPosts: async function (
    params?: GetBlogParams,
    options?: ServiceOptions
  ) {
    // cache no store is important  here
    try {
      const url = new URL(`${BACKEND_URL}/posts`);

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, value);
          }
        });
      }
      //   console.log(url.toString());
      const config: RequestInit = {};

      if (options?.cache) {
        config.cache = options.cache;
      }

      if (options?.relavilated) {
        config.next = { revalidate: options.relavilated };
      }
      config.next = { ...config.next, tags: ["blogPosts"] };

      const res = await fetch(url.toString(), config);
      // const res = await fetch(url.toString(), {
      //   next: {
      //     tags: ["blogPosts"],
      //   },
      // });

      if (!res.ok) {
        throw new Error("Failed to fetch posts");
      }

      const posts = await res.json();
      return { data: posts, error: null };
    } catch (err) {
      console.error(err);
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },

  getBlogById: async function (id: string, options?: ServiceOptions) {
    try {
      const url = new URL(`${BACKEND_URL}/posts/${id}`);

      const config: RequestInit = {};

      if (options?.cache) {
        config.cache = options.cache;
      }

      if (options?.relavilated) {
        config.next = { revalidate: options.relavilated };
      }

      const res = await fetch(url.toString(), config);

      if (!res.ok) {
        throw new Error("Failed to fetch post");
      }

      const post = await res.json();
      return { data: post, error: null };
    } catch (err) {
      console.error(err);
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },

  createBlogPost: async (blogData: BlogData) => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${BACKEND_URL}/posts`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(blogData),
      });
      const data = await res.json();
      if (data.error) {
        return {
          data: null,
          error: { message: data.error || "ERROR: Post Not Created" },
        };
      }
    } catch (error) {
      return {
        data: null,
        error: {
          message: "something went wrong",
        },
      };
    }
  },
};
