import { defineField, defineType } from "sanity";

export const post = defineType({
	name: "post",
	title: "一般文章",
	type: "document",
	fields: [
		defineField({
			name: "title",
			title: "標題",
			type: "string",
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "slug",
			title: "Slug（網址用）",
			type: "slug",
			options: { source: "title" },
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "category",
			title: "分類",
			type: "reference",
			to: [{ type: "category" }],
			options: {
				filter: "postType == 'post'",
			},
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "expert",
			title: "摘要",
			type: "textSection",
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "coverImage",
			title: "封面圖片",
			type: "image",
			options: { hotspot: true },
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "publishedAt",
			title: "發布時間",
			type: "datetime",
			initialValue: () => new Date().toISOString(),
		}),
		defineField({
			name: "body",
			title: "圖文內容",
			type: "array",
			of: [
				{ type: "block" },
				{
					type: "image",
					options: { hotspot: true },
					fields: [{ name: "alt", title: "圖片說明", type: "string" }],
				},
			],
		}),
	],
	preview: {
		select: { title: "title", media: "coverImage" },
	},
});
