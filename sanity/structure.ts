import type { StructureResolver } from "sanity/structure";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S, context) =>
	S.list()
		.id("root")
		.title("內容管理")
		.items([
			S.documentTypeListItem("post").title("一般文章"),
			S.documentTypeListItem("project").title("案例文章"),
			S.divider(),
			orderableDocumentListDeskItem({
				type: "category",
				id: "post-categories-list",
				title: "一般文章分類",
				filter: "postType == 'post'",
				S,
				context,
			}),
			orderableDocumentListDeskItem({
				type: "category",
				id: "project-categories",
				title: "案例文章分類",
				filter: "postType == 'project'",
				S,
				context,
			}),
		]);
