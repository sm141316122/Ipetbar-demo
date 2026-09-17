"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Category } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useRef } from "react";

export default function CategoriesFilterList({
	postType,
	categories,
	postYears,
}: {
	postType: "post" | "project";
	categories: Category[];
	postYears: string[];
}) {
	const inputRef = useRef<HTMLInputElement>(null);

	const router = useRouter();

	const searchParams = useSearchParams();
	const categorySlug = searchParams.get("categorySlug") || "all";
	const keyword = searchParams.get("keyword") || "";
	const year = searchParams.get("year") || "";
	const page = searchParams.get("page") || "1";

	const getFilterUrl = ({
		c,
		k,
		y,
		p,
	}: {
		c?: string;
		k?: string;
		y?: string;
		p?: string;
	}) => {
		const params = {
			categorySlug,
			keyword,
			year,
			page,
		} as {
			categorySlug?: string;
			keyword?: string;
			year?: string;
			page?: string;
		};

		if (c) params.categorySlug = c;
		if (k || k === "") params.keyword = k;
		if (y) params.year = y;
		if (p) params.page = p;

		if (!params.categorySlug) delete params.categorySlug;
		if (!params.keyword) delete params.keyword;
		if (!params.year) delete params.year;
		if (!params.page) delete params.page;

		return `/${postType === "post" ? "posts" : "projects"}?${new URLSearchParams(params).toString()}`;
	};

	function handleSearchClick() {
		router.push(getFilterUrl({ k: inputRef.current?.value || "" }));
	}

	function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
		if (e.key === "Enter") {
			handleSearchClick();
		}
	}

	return (
		<div className="flex flex-col items-end font-bold">
			{postType === "project" && (
				<Select value={year || postYears[0]}>
					<SelectTrigger className="w-full max-w-24 rounded-full p-5 px-4 mb-6">
						<SelectValue />
					</SelectTrigger>
					<SelectContent
						alignItemWithTrigger={false}
						className="w-[var(--anchor-width)] min-w-10"
					>
						<SelectGroup>
							{postYears.map((year) => (
								<SelectItem
									key={year}
									value={year}
									className="p-2 px-4"
									render={<Link href={getFilterUrl({ y: year })} />}
								>
									{year}
								</SelectItem>
							))}
						</SelectGroup>
					</SelectContent>
				</Select>
			)}
			{postType === "post" && (
				<Field className="w-fit flex flex-row flex-end mb-6 relative">
					<Input
						ref={inputRef}
						onKeyDown={handleKeyDown}
						placeholder="依關鍵字搜尋"
						className="border-gray-100 bg-gray-100 rounded-full py-4.5 text-gray-600"
					/>
					<Button
						className="max-w-10 bg-transparent absolute top-0 right-0 cursor-pointer hover:bg-transparent"
						onClick={handleSearchClick}
					>
						<SearchIcon className="text-gray-600" />
					</Button>
				</Field>
			)}
			<ul className="flex-between gap-4 text-sm">
				{categories.map((category, index) => (
					<li key={category._id}>
						<Button
							nativeButton={false}
							variant="outline"
							className={`border-transparent hover:bg-transparent hover:border-black p-2 px-2 ${categorySlug === category.slug || (categorySlug === "all" && index === 0) ? "border-black" : ""}`}
							render={<Link href={getFilterUrl({ c: category.slug })} />}
						>
							{category.title}
						</Button>
					</li>
				))}
			</ul>
		</div>
	);
}
