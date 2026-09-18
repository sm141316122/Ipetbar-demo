import type { Metadata } from "next";
import { Geist, Inter } from "next/font/google";
import "./globals.css";
import { SERVER_URL } from "@/lib/constants";
import { SanityLive } from "@/sanity/lib/live";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: {
		template: `%s | 寵愛吧`,
		default: "寵愛吧",
	},
	description: "寵愛吧 - 浪我們一起寵愛吧！",
	metadataBase: new URL(SERVER_URL),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
	return (
		<html
			lang="en"
			className={`${geist.variable} ${inter.className} h-full antialiased`}
		>
			<body>
				{children}
				<SanityLive />
			</body>
		</html>
	);
}
