import Categories from "@/components/shared/post/categories";
import ProjectGrid from "@/components/shared/post/project-grid";
import { getPosts } from "@/lib/actions/post.action";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "案例",
};

const DEFAULT_CATEGORY = "website-design";

export default async function ProjectPage({
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
		postType: "project",
		categorySlug,
		year,
		keyword,
		page: Number(page),
	});

	if (!res.success) throw new Error("Fetch post failed");

	const projects = res.posts;

	return (
		<div className="content-wrapper">
			<div className="p-30 pb-10">
				<h1 className="h1-bold flex-start gap-20 pb-20">
					<span className="text-sm">Project</span>
					<span>案例</span>
				</h1>
				<Categories postType="project" />
			</div>
			{projects && projects.length > 0 ? (
				<ProjectGrid posts={projects} />
			) : (
				<div>尚未有案例</div>
			)}
		</div>
	);
}
