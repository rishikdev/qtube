"use client";

import NavbarTopComponents from "./navbar-top-components";
import NavbarBottomComponents from "./navbar-bottom-components";
import { cn } from "@/lib/utils";
import { themeGradientBackground } from "@/app/styles.module";

const Navbar = () => {
  return (
    <div
      id="navbar"
      // For dark bg use bg-black/80 text-gray-300
      className={cn(
        "h-[3rem] w-full transition-all duration-500 px-2 md:px-12 fixed top-0 left-0 right-0 z-50",
        themeGradientBackground
      )}
    >
      <NavbarTopComponents />
      <NavbarBottomComponents />
    </div>
  );
};

export default Navbar;
