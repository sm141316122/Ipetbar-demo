"use client";

import { Button } from "./ui/button";

export default function ScrollToTop() {
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	return (
		<Button variant="outline" className="cursor-pointer" onClick={scrollToTop}>
			回頂端
		</Button>
	);
}
