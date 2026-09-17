import { defineField, defineType } from "sanity";

export const project = defineType({
	name: "project",
	title: "案例文章",
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
				filter: "postType == 'project'",
			},
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "collaborator",
			title: "合作團體",
			type: "string",
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "project",
			title: "項目",
			type: "string",
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "description",
			title: "說明",
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
