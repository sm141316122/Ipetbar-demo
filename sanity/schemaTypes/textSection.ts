import { defineField, defineType } from "sanity";

export const TextSection = defineType({
	name: "textSection",
	title: "文字區塊(摘要 or 說明)",
	type: "object",
	fields: [
		defineField({
			name: "subtitle",
			title: "小標題",
			type: "string",
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "content",
			title: "內容",
			type: "text",
			rows: 4,
			validation: (rule) => rule.required(),
		}),
	],
});
