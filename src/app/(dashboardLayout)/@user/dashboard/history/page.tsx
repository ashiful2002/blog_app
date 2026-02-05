import HistoryTable from "@/components/modules/user/History";
import PaginationControlls from "@/components/ui/PaginationControlls";
import { blogService } from "@/services/blog.service";

const Bloghistory = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await searchParams;
  const { data } = await blogService.getBlogPosts({ page });
  const posts = data.data || [];
  const pagination = data.pagination || {
    total: 13,
    page: 1,
    limit: 0,
    totalPage: 1,
  };
  // console.log(pagination);

  return (
    <div>
      <HistoryTable posts={posts} />
      < PaginationControlls meta={pagination}/>
    </div>
  );
};

export default Bloghistory;
