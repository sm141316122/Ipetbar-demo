import {
	getAllPostsYear,
	getCategoriesByType,
} from "@/lib/actions/post.action";
import CategoriesFilterList from "./categories-filter-list";

export default async function Categories({
	postType,
}: {
	postType: "post" | "project";
}) {
	const categories = await getCategoriesByType(postType);
	const postYears = await getAllPostsYear(postType);

	return (
		<CategoriesFilterList
			postType={postType}
			categories={categories}
			postYears={postYears}
		/>
	);
}
