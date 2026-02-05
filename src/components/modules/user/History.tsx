import PaginationControlls from "@/components/ui/PaginationControlls";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BlogPost } from "@/types";

const HistoryTable = ({ posts }: { posts: BlogPost[] }) => {
  return (
    <div>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead>View</TableHead>
              <TableHead>Featured</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell>{post.title}</TableCell>
                <TableCell>{post.tags}</TableCell>
                <TableCell>{post.views}</TableCell>
                <TableCell>{post.isFeatured ? "Featured" : "NO"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
   
    </div>
  );
};

export default HistoryTable;
