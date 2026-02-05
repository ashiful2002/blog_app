import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { env } from "@/env";
import { revalidateTag, updateTag } from "next/cache";
import { cookies } from "next/headers";
import { toast } from "sonner";

const BACKEND_URL = env.BACKEND_URL;
const CreateBlogFromServer = () => {
  const createBlog = async (formData: FormData) => {
    "use server";
    // console.log("Title:", formData.get("title"));
    // console.log("Content:", formData.get("content"));
    // console.log("Tags:", formData.get("tags"));
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const tags = formData.get("tags") as string;
    const blogData = {
      title,
      content,
      tags: tags
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item !== ""),
    };
    const cookieStore = await cookies();

    const res = await fetch(`${BACKEND_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(blogData),
    });

    if (res.ok) {
      revalidateTag("blogPosts", "max");
      //   updateTag("bloPosts"); use one instedd of 2
    }
  };

  return (
    <div>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Create Blog</CardTitle>
        </CardHeader>
        <CardContent>
          <form id="blog-form" action={createBlog}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="title">Title</FieldLabel>
                <Input type="text" id="title" name="title" required />
              </Field>

              <Field>
                <FieldLabel htmlFor="content">Content</FieldLabel>
                <Textarea
                  id="content"
                  name="content"
                  rows={8}
                  placeholder="Write your blog content here..."
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="tags">Tags</FieldLabel>
                <Input
                  type="text"
                  id="tags"
                  name="tags"
                  placeholder="e.g., react, nextjs, typescript (comma-separated)"
                />
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full cursor-pointer"
            type="submit"
            form="blog-form"
          >
            Create Blog
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CreateBlogFromServer;
