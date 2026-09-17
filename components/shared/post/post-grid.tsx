import PostListItem from "./post-list-item";
import { PreviewPost } from "@/types";

export default function PostGrid({ posts }: { posts: PreviewPost[] }) {
	return (
		<div className="grid grid-cols-3 gap-4 gap-y-8 p-30 py-0">
			{posts &&
				posts.map((post) => <PostListItem key={post._id} post={post} />)}
		</div>
	);
}
