import Link from "next/link";
import { Button } from "../ui/button";
import Menu from "./menu";

export default function Header() {
	return (
		<header className="w-full p-10 py-4 flex-between">
			<div className="site-logo">
				<Button
					nativeButton={false}
					className="bg-primary rounded-[6px]"
					render={<Link href="/" />}
				>
					LOGO
				</Button>
			</div>
			<Menu />
		</header>
	);
}
