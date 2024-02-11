"use client";

import { useAppSelector } from "@/app/(state)/store";
import ContentContainer from "./content-container";
import LandingPage from "./landing-page";
import { HomePageStatus } from "@/app/(state)/(slices)/home-page-slice";

const HomePage = () => {
  const status = useAppSelector(
    (state) => state.homePageReducer.value.homePageStatus
  );

  return (
    <div
      id="home-page"
      className="w-full duration-500 ease-in-out transition-all"
    >
      {status === HomePageStatus.Fresh ? <LandingPage /> : <ContentContainer />}
    </div>
  );
};

export default HomePage;
