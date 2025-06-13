import { Outlet } from "react-router";


import ThemeToggler from "@/components/themeToggler";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
