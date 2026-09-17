import { defineField, defineType } from "sanity";

export const category = defineType({
	name: "category",
	title: "分類",
	type: "document",
	fields: [
		defineField({
			name: "title",
			title: "分類名稱",
			type: "string",
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "slug",
			title: "Slug",
			type: "slug",
			options: { source: "title" },
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "postType",
			title: "所屬文章類型",
			type: "string",
			options: {
				list: [
					{ title: "一般文章", value: "post" },
					{ title: "案例文章", value: "project" },
				],
				layout: "radio",
			},
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "orderRank",
			type: "string",
			hidden: true,
		}),
	],
	preview: {
		select: { title: "title", subTitle: "postType" },
	},
});
