import Link from "next/link";

export default function Menu() {
	return (
		<nav>
			<ul className="flex-between gap-16 text-sm">
				<li>
					<Link href="/about">關於</Link>
				</li>
				<li>
					<Link href="/projects">案例</Link>
				</li>
				<li>
					<Link href="/posts">文章</Link>
				</li>
			</ul>
		</nav>
	);
}
