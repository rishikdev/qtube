import Navbar from "@/components/navbar/navbar";
import { ThemeProvider } from "@/components/theme/theme-provider";
import WatchPage from "@/components/watch/watch-page";

const WatchVideo = ({ params }: { params: { videoId: string } }) => {
  return (
    <div id="watch-video" className="relative overflow-y-visible">
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Navbar />
        <div className="mt-[4rem] h-full w-full duration-500 ease-in-out transition-all">
          <WatchPage videoId={params.videoId} />
        </div>
      </ThemeProvider>
    </div>
  );
};

export default WatchVideo;
