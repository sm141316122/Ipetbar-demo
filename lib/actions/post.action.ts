"use server";

import { client } from "@/sanity/lib/client";
import {
	categoriesByTypeQuery,
	nextPostQuery,
	postsQuery,
	postsYearQuery,
} from "@/sanity/lib/queries";
import { Category, PreviewPost } from "@/types/index";
import { PAGE_SIZE } from "../constants";

export async function getPosts({
	postType,
	categorySlug = "all",
	year = "",
	keyword = "",
	page = 1,
	pageSize = PAGE_SIZE,
}: {
	postType: "post" | "project";
	categorySlug?: string;
	year?: string;
	keyword?: string;
	page?: number;
	pageSize?: number;
}) {
	try {
		const start = (page - 1) * pageSize;
		const end = start + pageSize;

		const filter = {
			postType,
			categorySlug:
				categorySlug && categorySlug !== "all" && categorySlug !== ""
					? categorySlug
					: null,
			year: year && year !== "" ? year : null,
			keyword: keyword && keyword !== "" ? keyword : null,
			start,
			end,
		};

		const posts = await client.fetch<PreviewPost[]>(postsQuery, filter);

		return { success: true, message: "Fetching posts successfully", posts };
	} catch (error) {
		return { success: false, message: error };
	}
}

export async function getCategoriesByType(postType: "post" | "project") {
	const categories = await client.fetch<Category[]>(categoriesByTypeQuery, {
		postType,
	});

	if (!categories) throw new Error("Fetch categories failed");

	return categories;
}

export async function getAllPostsYear(postType: "post" | "project") {
	const years = await client.fetch<{ publishedAt: string }[]>(postsYearQuery, {
		postType,
	});

	if (!years) throw new Error("Fetch post years failed");

	const sortedYears = [
		...new Set(years.map((year) => year.publishedAt.slice(0, 4))),
	].sort((a, b) => Number(b) - Number(a));

	return sortedYears;
}

export async function getNextPost(postType: string, publishedAt: string) {
	const nextPost = await client.fetch(nextPostQuery, { postType, publishedAt });

	return nextPost;
}
