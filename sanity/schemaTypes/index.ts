import { type SchemaTypeDefinition } from "sanity";
import { post } from "./post";
import { project } from "./project";
import { category } from "./category";
import { TextSection } from "./textSection";

export const schema: { types: SchemaTypeDefinition[] } = {
	types: [post, project, category, TextSection],
};
