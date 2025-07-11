import { Menu, ShoppingBasket } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { Link, useLocation } from "react-router";

import ThemeToggler from "@/components/themeToggler";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

import LogoutButton from "./logoutButton";

const menu = [
  { title: "Home", url: "/" },
  {
    title: "Menu",
    url: "/menu",
  },
  {
    title: "Ingredients",
    url: "/ingredients",
  },
  {
    title: "Categories",
    url: "/categories",
  },
  {
    title: "Area",
    url: "/area",
  },
];
export default function Navbar() {
  const currentPath = useLocation().pathname;
  const { isAuthenticated } = useAuth();

  const { scrollY } = useScroll();
  const width = useTransform(scrollY, [50, 200], ["100vw", "60vw"]);
  const top = useTransform(scrollY, [50, 200], ["0rem", "1rem"]);
  const backdropBlur = useTransform(scrollY, [50, 200], ["blur(0px)", "blur(10px)"]);
  const borderRadius = useTransform(scrollY, [50, 200], ["0px", "3.40282e38px"]);
  const padding = useTransform(scrollY, [50, 200], ["calc(var(--spacing)*4)", "calc(var(--spacing)*2)"]);
  return (
    <motion.div
      className="navbar bg-background fixed top-0 right-0 left-0 z-500 m-auto min-w-fit shadow-2xl"
      style={{
        width,
        top,
        backdropFilter: backdropBlur,
        WebkitBackdropFilter: backdropBlur,
        borderRadius,
      }}
    >
      <motion.div className="container" style={{ paddingTop: padding, paddingBottom: padding }}>
        {/*--------- design 3 -------*/}
        <nav className="hidden justify-between lg:flex">
          <div className="logo-icon">
            <Link to={"/"} className="max-w-36">
              <svg
                width="229.00000000000006"
                height="46.21764852589558"
                viewBox="100 0 369.89473684210526 74.33905457489806"
              >
                <defs id="SvgjsDefs6025"></defs>

                <g
                  id="SvgjsG6027"
                  transform="matrix(2.6532381166578745,0,0,2.6532381166578745,109.61208544197541,4.211393087413061)"
                  fill="#af3e3e"
                >
                  <path d="M14.94 9.74 l-5.1 6.1 l-5.06 -6.1 l0 10.26 l-2.14 0 l0 -12.82 l-1.74 -2.1 l2.82 0 l6.1 7.32 l6.18 -7.32 l2.82 0 l-1.74 2.1 l0 12.82 l-2.14 0 l0 -10.26 z M24.099999999999998 14.02 l0 3.8 l9.2 0 l0 2.18 l-11.38 0 l0 -14.92 l10.5 0 l0 2.2 l-8.32 0 l0 4.52 q0.62 -0.36 1.38 -0.48 q0.56 -0.1 1.44 -0.1 l3.26 0 l0 2.22 l-3.26 0 q-0.82 0 -1.44 0.1 q-0.76 0.14 -1.38 0.48 z M41.46 6.66 l-0.82 -1.84 l2.4 0 l7.18 15.18 l-2.44 0 l-0.98 -2.18 l-4.54 0 q-1.28 0 -2.3 0.24 q-0.9 0.22 -1.5 0.58 q-0.54 0.32 -0.72 0.66 l-0.38 0.7 l-2.36 0 z M43.06 15.620000000000001 l2.76 0 l-3.26 -6.3 l-3.3 7.14 q0.44 -0.38 1.34 -0.6 q1.02 -0.24 2.46 -0.24 z M63.480000000000004 20 l-10.46 0 l0 -14.92 l2.18 0 l0 12.74 l8.28 0 l0 2.18 z M68.22 20 l-2.14 0 l0 -14.92 l2.14 0 l0 14.92 z M74.8 14.02 l0 5.98 l-2.18 0 l0 -14.92 l10.5 0 l0 2.2 l-8.32 0 l0 4.52 q0.62 -0.36 1.38 -0.48 q0.56 -0.1 1.44 -0.1 l3.26 0 l0 2.22 l-3.26 0 q-0.82 0 -1.44 0.1 q-0.76 0.14 -1.38 0.48 z M91.46000000000001 11.64 q1.34 -1.4 2.42 -3.12 t1.72 -3.44 l2.5 0 q-1.02 2.38 -2.48 4.56 q-1.32 1.98 -3.08 3.9 l0 6.46 l-2.16 0 l0 -6.46 q-1.76 -1.92 -3.08 -3.9 q-1.46 -2.18 -2.48 -4.56 l2.5 0 q0.64 1.72 1.72 3.44 t2.42 3.12 z"></path>
                </g>
              </svg>
            </Link>
          </div>
          <div className="tabs flex items-center">
            <NavigationMenu>
              <NavigationMenuList>{menu.map((item) => renderMenuItem(item, currentPath))}</NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="icons flex items-center gap-4">
            <ThemeToggler />
            {isAuthenticated ? (
              <>
                <ShoppingBasket className="text-primary" />
                <LogoutButton />
              </>
            ) : (
              <Button
                asChild
                className="group border-primary text-primary relative overflow-hidden rounded-3xl border-r-3 border-l-3 bg-transparent px-8 py-2 transition-all duration-300 hover:text-white"
              >
                <Link to="/auth/login">
                  <span className="relative z-10">Login</span>
                  <span className="before-animation absolute inset-0 z-0"></span>
                </Link>
              </Button>
            )}
          </div>
        </nav>

        {/* mobile  */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between gap-3">
            <div className="flex flex-1 items-center gap-3">
              <div className="logo-icon max-w-36">
                <svg width="129" height="66.99815159858584" viewBox="0 0 350 54.660496642202894">
                  <defs id="SvgjsDefs5501"></defs>
                  <g
                    id="SvgjsG5502"
                    transform="matrix(3.6008231583214014,0,0,3.6008231583214014,-3.2407411858905175,-17.355966524225135)"
                    fill="#af3e3e"
                  >
                    <path d="M14.94 9.74 l-5.1 6.1 l-5.06 -6.1 l0 10.26 l-2.14 0 l0 -12.82 l-1.74 -2.1 l2.82 0 l6.1 7.32 l6.18 -7.32 l2.82 0 l-1.74 2.1 l0 12.82 l-2.14 0 l0 -10.26 z M24.099999999999998 14.02 l0 3.8 l9.2 0 l0 2.18 l-11.38 0 l0 -14.92 l10.5 0 l0 2.2 l-8.32 0 l0 4.52 q0.62 -0.36 1.38 -0.48 q0.56 -0.1 1.44 -0.1 l3.26 0 l0 2.22 l-3.26 0 q-0.82 0 -1.44 0.1 q-0.76 0.14 -1.38 0.48 z M41.46 6.66 l-0.82 -1.84 l2.4 0 l7.18 15.18 l-2.44 0 l-0.98 -2.18 l-4.54 0 q-1.28 0 -2.3 0.24 q-0.9 0.22 -1.5 0.58 q-0.54 0.32 -0.72 0.66 l-0.38 0.7 l-2.36 0 z M43.06 15.620000000000001 l2.76 0 l-3.26 -6.3 l-3.3 7.14 q0.44 -0.38 1.34 -0.6 q1.02 -0.24 2.46 -0.24 z M63.480000000000004 20 l-10.46 0 l0 -14.92 l2.18 0 l0 12.74 l8.28 0 l0 2.18 z M68.22 20 l-2.14 0 l0 -14.92 l2.14 0 l0 14.92 z M74.8 14.02 l0 5.98 l-2.18 0 l0 -14.92 l10.5 0 l0 2.2 l-8.32 0 l0 4.52 q0.62 -0.36 1.38 -0.48 q0.56 -0.1 1.44 -0.1 l3.26 0 l0 2.22 l-3.26 0 q-0.82 0 -1.44 0.1 q-0.76 0.14 -1.38 0.48 z M91.46000000000001 11.64 q1.34 -1.4 2.42 -3.12 t1.72 -3.44 l2.5 0 q-1.02 2.38 -2.48 4.56 q-1.32 1.98 -3.08 3.9 l0 6.46 l-2.16 0 l0 -6.46 q-1.76 -1.92 -3.08 -3.9 q-1.46 -2.18 -2.48 -4.56 l2.5 0 q0.64 1.72 1.72 3.44 t2.42 3.12 z"></path>
                  </g>
                </svg>
              </div>
              <div className="icons flex-1" />
              <ThemeToggler />
              {isAuthenticated && <ShoppingBasket className="text-primary" />}
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="z-100 overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <Link to={"/"} className="max-w-36">
                      <svg width="129" height="66.99815159858584" viewBox="0 0 350 54.660496642202894">
                        <defs id="SvgjsDefs5501"></defs>
                        <g
                          id="SvgjsG5502"
                          transform="matrix(3.6008231583214014,0,0,3.6008231583214014,-3.2407411858905175,-17.355966524225135)"
                          fill="#af3e3e"
                        >
                          <path d="M14.94 9.74 l-5.1 6.1 l-5.06 -6.1 l0 10.26 l-2.14 0 l0 -12.82 l-1.74 -2.1 l2.82 0 l6.1 7.32 l6.18 -7.32 l2.82 0 l-1.74 2.1 l0 12.82 l-2.14 0 l0 -10.26 z M24.099999999999998 14.02 l0 3.8 l9.2 0 l0 2.18 l-11.38 0 l0 -14.92 l10.5 0 l0 2.2 l-8.32 0 l0 4.52 q0.62 -0.36 1.38 -0.48 q0.56 -0.1 1.44 -0.1 l3.26 0 l0 2.22 l-3.26 0 q-0.82 0 -1.44 0.1 q-0.76 0.14 -1.38 0.48 z M41.46 6.66 l-0.82 -1.84 l2.4 0 l7.18 15.18 l-2.44 0 l-0.98 -2.18 l-4.54 0 q-1.28 0 -2.3 0.24 q-0.9 0.22 -1.5 0.58 q-0.54 0.32 -0.72 0.66 l-0.38 0.7 l-2.36 0 z M43.06 15.620000000000001 l2.76 0 l-3.26 -6.3 l-3.3 7.14 q0.44 -0.38 1.34 -0.6 q1.02 -0.24 2.46 -0.24 z M63.480000000000004 20 l-10.46 0 l0 -14.92 l2.18 0 l0 12.74 l8.28 0 l0 2.18 z M68.22 20 l-2.14 0 l0 -14.92 l2.14 0 l0 14.92 z M74.8 14.02 l0 5.98 l-2.18 0 l0 -14.92 l10.5 0 l0 2.2 l-8.32 0 l0 4.52 q0.62 -0.36 1.38 -0.48 q0.56 -0.1 1.44 -0.1 l3.26 0 l0 2.22 l-3.26 0 q-0.82 0 -1.44 0.1 q-0.76 0.14 -1.38 0.48 z M91.46000000000001 11.64 q1.34 -1.4 2.42 -3.12 t1.72 -3.44 l2.5 0 q-1.02 2.38 -2.48 4.56 q-1.32 1.98 -3.08 3.9 l0 6.46 l-2.16 0 l0 -6.46 q-1.76 -1.92 -3.08 -3.9 q-1.46 -2.18 -2.48 -4.56 l2.5 0 q0.64 1.72 1.72 3.44 t2.42 3.12 z"></path>
                        </g>
                      </svg>
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-2 p-4 pt-0">
                  <Accordion type="single" collapsible className="flex w-full flex-col gap-2">
                    {menu.map((item) => renderMobileMenuItem(item))}
                  </Accordion>

                  <div className="flex flex-col gap-2">
                    <SheetClose asChild>
                      {isAuthenticated ? (
                        <LogoutButton />
                      ) : (
                        <Button
                          asChild
                          className="group border-primary text-primary relative overflow-hidden rounded-3xl border-r-3 border-l-3 bg-transparent px-8 py-2 transition-all duration-300 hover:text-white"
                        >
                          <Link to="/auth/login">
                            <span className="relative z-10">Login</span>
                            <span className="before-animation absolute inset-0 z-0"></span>
                          </Link>
                        </Button>
                      )}
                    </SheetClose>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

const renderMenuItem = (item: (typeof menu)[number], currentPath: string) => {
  const isActive = currentPath === item.url;
  console.log("isActive", isActive, currentPath, item.url);
  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink asChild className="">
        <Link to={item.url} className={cn("text-foreground", isActive && "text-primary font-bold")}>
          {item.title}
        </Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: (typeof menu)[number]) => {
  return (
    <SheetClose key={item.title} asChild>
      <Link to={item.url} className="text-md block py-1 font-semibold">
        {item.title}
      </Link>
    </SheetClose>
  );
};
