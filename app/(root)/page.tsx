import ProjectGrid from "@/components/shared/post/project-grid";
import { getPosts } from "@/lib/actions/post.action";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "首頁",
};

export default async function Homepage() {
	const res = await getPosts({
		postType: "project",
		pageSize: 4,
	});

	if (!res.success) console.log(res.message);

	const posts = res.posts;

	return (
		<div className="content-wrapper">
			<h2 className="h1-bold mb-10">作品</h2>
			{posts && posts.length > 0 ? (
				<ProjectGrid posts={posts} />
			) : (
				<div>尚未有作品</div>
			)}
		</div>
	);
}
