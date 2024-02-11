"use client";

import { themeGradientText } from "@/app/styles.module";
import { cn } from "@/lib/utils";
import React, { useEffect } from "react";

const TestComponent = () => {
  useEffect(() => {
    console.log("LOAD");
  }, []);

  return (
    <div className="grid h-screen w-full fixed select-none cursor-default">
      <div className="m-auto p-10 drop-shadow-md">
        <div className={cn("text-5xl font-black", themeGradientText)}>
          test page
        </div>
        <div className={cn("text-xl")}>
          this page is not meant to go into production
        </div>
      </div>
    </div>
  );
};

export default TestComponent;
