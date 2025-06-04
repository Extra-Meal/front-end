import { Outlet } from "react-router";

import ThemeToggler from "@/components/themeToggler";

export default function MainLayout() {
	return (
		<div className="flex min-h-screen flex-col">
			<nav>
				<h1>Navbar</h1>
				<ThemeToggler />
			</nav>
			<main className="flex-1">
				<Outlet />
			</main>
			<footer>Footer</footer>
		</div>
	);
}
