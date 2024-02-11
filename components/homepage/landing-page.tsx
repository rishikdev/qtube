"use client";

import { themeGradientText } from "@/app/styles.module";
import { cn } from "@/lib/utils";

const LandingPage = () => {
  return (
    <div className="grid h-screen w-full fixed select-none cursor-default">
      <div className="m-auto p-10 drop-shadow-md">
        <div className={cn("text-5xl font-black", themeGradientText)}>
          hello!
        </div>
        <div className={cn("text-xl")}>search something to get started</div>
      </div>
    </div>
  );
};

export default LandingPage;
