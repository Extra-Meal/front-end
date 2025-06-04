import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/contexts/themeContext";

import { Button } from "./ui/button";

export default function ThemeToggler() {
	const { theme, toggleTheme } = useTheme();
	return (
		<Button
			size={"icon"}
			className="text-primary rounded-full bg-transparent hover:bg-transparent hover:shadow-none data-[state=open]:bg-transparent"
			onClick={toggleTheme}
		>
			{theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
		</Button>
	);
}
