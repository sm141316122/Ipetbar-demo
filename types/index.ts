export type Category = {
	_id?: string;
	title: string;
	slug: string;
};

export type PreviewPost = {
	_id: string;
	title: string;
	slug: { current: string };
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	coverImage: any;
	publishedAt: string;
	category: Category;
};

export type PostDetail = {
	_id: string;
	title: string;
	collaborator?: string;
	project?: string;
	description?: { subtitle: string; content: string };
	expert?: { subtitle: string; content: string };
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	coverImage: any;
	publishedAt: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	body: any[];
	category: Category;
};
