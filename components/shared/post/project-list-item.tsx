"use client";

import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { PreviewPost } from "@/types";
import { usePathname, useSearchParams } from "next/navigation";

export default function ProjectListItem({ post }: { post: PreviewPost }) {
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const callbackUrl = `${pathname}?${searchParams.toString()}`;

	return (
		<div>
			<Link
				href={`/projects/${post.slug.current}?callbackUrl=${encodeURIComponent(callbackUrl)}`}
				className="flex flex-col gap-4"
			>
				<div className="relative aspect-[4/3] rounded-[8px] overflow-hidden">
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
		</div>
	);
}
