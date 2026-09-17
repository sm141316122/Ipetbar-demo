import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { PreviewPost } from "@/types";

export default function PostListItem({ post }: { post: PreviewPost }) {
	return (
		<div className="flex flex-col justify-between relative gap-4">
			<Link
				href={`/posts/${post.slug.current}`}
				className="flex flex-col gap-4"
			>
				<div className="relative aspect-16/10 rounded-[10px] overflow-hidden">
					<Image
						src={urlFor(post.coverImage).width(600).url()}
						alt={post.title}
						fill
						sizes="(max-width: 640px) 100vw, 50vw"
						className="object-cover"
						priority
					/>
				</div>
				<p className="font-bold">{post.title}</p>
			</Link>
			<div className="flex-between">
				<div>---</div>
				<div className="text-sm font-bold p-2 px-4 bg-gray-200 rounded-full">
					# {post.category.title}
				</div>
			</div>

			<div className="text-sm font-medium absolute top-0 right-0">
				<div className="mask-tab-1"></div>
				<div className="p-1.5 pr-6 pl-4 bg-white rounded-bl-[14px]">
					<span>{post.publishedAt.slice(0, 10).replaceAll("-", ".")}</span>
				</div>
				<div className="mask-tab-2"></div>
			</div>
		</div>
	);
}
