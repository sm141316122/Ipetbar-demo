import Image from "next/image";
import { PortableText, PortableTextComponents } from "next-sanity";
import { PostDetail } from "@/types";
import { urlFor } from "@/sanity/lib/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getNextPost } from "@/lib/actions/post.action";
import ScrollToTop from "@/components/scroll-to-top";

export default async function PostDetails({
	post,
	postType,
	backHref,
}: {
	post: PostDetail;
	postType: "post" | "project";
	backHref: string;
}) {
	const components: PortableTextComponents = {
		types: {
			image: ({ value }) => (
				<div className="relative w-full aspect-video">
					<Image
						src={urlFor(value).url()}
						alt={value.alt || ""}
						fill
						sizes="auto"
						className="object-cover"
					/>
				</div>
			),
		},
		block: {
			normal: ({ children }) => {
				const isEmpty =
					Array.isArray(children) &&
					children.every(
						(child) => typeof child === "string" && child.trim() === "",
					);

				return (
					<p
						className={`whitespace-pre-line leading-8 ${isEmpty ? "h-8" : ""}`}
					>
						{children}
					</p>
				);
			},
		},
	};

	const nextPost = await getNextPost(postType, post.publishedAt);

	return (
		<article className="mt-10">
			<span className="text-sm">
				{post.publishedAt.split("T")[0].replaceAll("-", ".")}
			</span>
			<h1 className="h1-bold mt-4">{post.title}</h1>
			<div className="mt-14">
				<div className="grid grid-cols-17">
					{postType === "project" ? (
						<div className="col-span-3">
							<p className="text-[12px] font-bold mb-2">合作團體</p>
							<p>{post.collaborator}</p>
						</div>
					) : (
						<div className="col-span-3">
							<p className="text-[12px] font-bold mb-2">分類</p>
							<p>{post.category.title}</p>
						</div>
					)}

					<div className="col-span-6">
						{postType === "project" && (
							<div>
								<p className="text-[12px] font-bold mb-2">項目</p>
								<p>{post.project}</p>
							</div>
						)}
					</div>
					{postType === "project" ? (
						<div className="col-span-8">
							<p className="text-[12px] font-bold mb-2">說明</p>
							<section>
								<h3 className="h3-bold mb-4">{post.description?.subtitle}</h3>
								<p className="text-sm whitespace-pre-line leading-relaxed">
									{post.description?.content}
								</p>
							</section>
						</div>
					) : (
						<div className="col-span-8">
							<p className="text-[12px] font-bold mb-2">摘要</p>
							<section>
								<h3 className="h3-bold mb-4">{post.expert?.subtitle}</h3>
								<p className="text-sm whitespace-pre-line leading-relaxed">
									{post.expert?.content}
								</p>
							</section>
						</div>
					)}
				</div>
				{post.coverImage && (
					<div className="relative aspect-video my-20">
						<Image
							src={urlFor(post.coverImage).width(1600).url()}
							alt={post.title}
							fill
							sizes="(max-width: 640px) 100vw, 50vw"
							className="object-cover rounded-2xl"
							priority
						/>
					</div>
				)}
			</div>

			<div className="w-full mx-auto max-w-[800px]">
				<PortableText value={post.body} components={components} />
				<section>
					<div className="flex-start gap-4 mt-10">
						{nextPost && (
							<Button
								variant="outline"
								nativeButton={false}
								render={
									<Link
										href={`/${postType === "post" ? "posts" : "projects"}/${nextPost.slug.current}?callbackUrl=${encodeURIComponent(backHref)}`}
									/>
								}
							>
								下一篇： {nextPost.title}
							</Button>
						)}
						<ScrollToTop />
					</div>
				</section>
			</div>
		</article>
	);
}
