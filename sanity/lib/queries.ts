import { groq } from "next-sanity";

// 取得所有文章
export const postsQuery = groq`
  *[
    _type == $postType
    && (!defined($categorySlug) || category->slug.current == $categorySlug)
    && (!defined($year) || publishedAt <= $year + "12-31")
    && (!defined($keyword) || title match "*" + $keyword + "*" || excerpt.content match "*" + $keyword + "*")
  ] | order(publishedAt desc) [$start...$end] {
    _id,
    title,
    slug,
    coverImage,
    publishedAt,
    "category": category->{title, "slug": slug.current}
  }
`;

// 以postType查詢所有分類
export const categoriesByTypeQuery = groq`
  *[_type == "category" && postType == $postType] | order(orderRank asc) {
    _id, title, "slug": slug.current
  }
`;

// 取得所有文章年分
export const postsYearQuery = groq`
  array::unique(
    *[_type == $postType && defined(publishedAt)].publishedAt
  )
`;

export const postBySlugQuery = groq`
  *[_type == $postType && slug.current == $slug][0] {
    _id,
    title,
    collaborator,
    project,
    description,
    expert,
    coverImage,
    publishedAt,
    body,
    "category": category->{title, "slug": slug.current}
  }
`;

export const nextPostQuery = groq`
  *[_type == $postType && publishedAt < $publishedAt] | order(publishedAt desc) [0] {
    title,
    slug
  }
`;
