import Navbar from "@/components/navbar/navbar";
import { ThemeProvider } from "@/components/theme/theme-provider";
import HomePage from "@/components/homepage/home-page";
import TestComponent from "@/components/test-component";

export default function Home() {
  return (
    <div id="home" className="relative overflow-y-visible">
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Navbar />
        <HomePage />
      </ThemeProvider>
    </div>
    // <div className="h-full w-full">
    //   <TestComponent />
    // </div>
  );
}
