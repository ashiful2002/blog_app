import { env } from "@/env";

const BACKEND_URL = env.BACKEND_URL;

interface GetBlogParams {
  isFeatured?: boolean;
  search?: string;
}

interface ServiceOptions {
  cache?: RequestCache;
  relavilated?: number;
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

      const res = await fetch(url.toString(), config);

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
  //   getBlogById: async function (id: string) {
  //     try {
  //       const url = new URL(`${BACKEND_URL}/posts`);
  //       const res = await fetch(`${url}/posts/${id}`);
  //       const data = await res.json();

  //       return { data: data, error: null };
  //     } catch (err) {
  //       console.error(err);
  //       return { data: null, error: { message: "Something Went Wrong" } };
  //     }
  //   },
};
