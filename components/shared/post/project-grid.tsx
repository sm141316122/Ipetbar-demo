import { Suspense } from "react";
import PostListItem from "./project-list-item";
import { PreviewPost } from "@/types";

export default function ProjectGrid({ posts }: { posts: PreviewPost[] }) {
	return (
		<Suspense
			fallback={
				<div className="h-[500px] w-full animate-pulse rounded-md bg-muted" />
			}
		>
			<div className="grid grid-cols-2 gap-4 gap-y-8">
				{posts &&
					posts.map((post) => <PostListItem key={post._id} post={post} />)}
			</div>
		</Suspense>
	);
}
