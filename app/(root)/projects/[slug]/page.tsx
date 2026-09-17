import PostDetails from "@/components/shared/post/postDetails";
import { Button } from "@/components/ui/button";
import { client } from "@/sanity/lib/client";
import { postBySlugQuery } from "@/sanity/lib/queries";
import { PostDetail } from "@/types";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;

	const post = await client.fetch(postBySlugQuery, {
		postType: "project",
		slug,
	});

	return {
		title: post.title,
	};
}

export default async function ProjectPage({
	params,
	searchParams,
}: {
	params: Promise<{ slug: string }>;
	searchParams: Promise<{ callbackUrl: string }>;
}) {
	const { slug } = await params;
	const { callbackUrl } = await searchParams;

	const backHref = callbackUrl ? decodeURIComponent(callbackUrl) : "/projects";

	const post = (await client.fetch(postBySlugQuery, {
		postType: "project",
		slug,
	})) as PostDetail;
	if (!post) return notFound();

	return (
		<div className="p-10 px-30 pb-20">
			<div>
				<Button
					variant="outline"
					nativeButton={false}
					render={<Link href={backHref} />}
				>
					上一頁
				</Button>
			</div>
			<PostDetails postType="project" post={post} backHref={backHref} />
		</div>
	);
}
