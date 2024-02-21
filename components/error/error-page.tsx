"use client";

import { themeGradientText } from "@/app/styles.module";
import { cn } from "@/lib/utils";

const ErrorPage = () => {
  return (
    <div className="grid h-screen w-full fixed select-none cursor-default">
      <div className="m-auto p-10 drop-shadow-md">
        <div className={cn("text-5xl font-black", themeGradientText)}>
          oh, no!
        </div>
        <div className={cn("text-xl")}>something went wrong</div>
      </div>
    </div>
  );
};

export default ErrorPage;
