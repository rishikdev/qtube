/*
 * This page will not be rendered. A redirect rule has been defined in next.config.js that redirects traffic to "/" homepage.
 */

import Navbar from "@/components/navbar/navbar";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { themeGradientText } from "../styles.module";
import { cn } from "@/lib/utils";

export default function Watch() {
  return (
    <div id="watch" className="relative overflow-y-visible">
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Navbar />
        <div id="watch-page" className="grid h-screen">
          <div className="m-auto p-10 drop-shadow-md">
            <div className={cn("text-5xl font-black", themeGradientText)}>
              hey!
            </div>
            <div className={cn("text-xl")}>how did you get here?</div>
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
}
