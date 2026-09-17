import { Metadata } from "next";
import Categories from "@/components/shared/post/categories";
import PostGrid from "@/components/shared/post/post-grid";
import { getPosts } from "@/lib/actions/post.action";

export const metadata: Metadata = {
	title: "文章",
};

const DEFAULT_CATEGORY = "all";

export default async function PostPage({
	searchParams,
}: {
	searchParams: Promise<{
		categorySlug?: string;
		keyword?: string;
		year?: string;
		page?: string;
	}>;
}) {
	const {
		categorySlug = DEFAULT_CATEGORY,
		keyword = "",
		year = "",
		page = "1",
	} = await searchParams;

	const res = await getPosts({
		postType: "post",
		categorySlug,
		year,
		keyword,
		page: Number(page),
	});

	if (!res.success) throw new Error("Fetch post failed");

	const posts = res.posts;

	return (
		<div className="content-wrapper">
			<div className="p-30 pb-10">
				<h1 className="h1-bold flex-start gap-20 pb-20">
					<span className="text-sm">Articles</span>
					<span>文章</span>
				</h1>
				<Categories postType="post" />
			</div>
			{posts && posts.length > 0 ? (
				<PostGrid posts={posts} />
			) : (
				<div className="p-30 py-0">尚未有文章</div>
			)}
		</div>
	);
}
