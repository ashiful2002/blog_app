import { Route } from "@/types";

export const userRoutes: Route[] = [
  {
    title: "User Blog management",
    items: [
      { title: "Create Blog", url: "/dashboard/create-blog" },
      { title: "Blog History", url: "/dashboard/history" },
    ],
  },
];
