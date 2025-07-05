import { Outlet } from "react-router";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
