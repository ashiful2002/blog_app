"use client";
import { getBlogs } from "@/actions/blog.action";
import { blogService } from "@/services/blog.service";
import { useEffect, useState } from "react";

const AboutPage = () => {
  const [data, setData] = useState();
  const [error, setError] = useState<{ message: string } | null>(null);

  console.log(data);

  useEffect(() => {
    (async () => {
      const { data, error } = await getBlogs();
      setData(data);
      setError(error);
    })();
  }, []);
  return <div></div>;
};

export default AboutPage;
