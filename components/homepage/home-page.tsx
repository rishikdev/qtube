"use client";

import { useAppSelector } from "@/app/(state)/store";
import ContentContainer from "./content-container";
import LandingPage from "./landing-page";
import { HomePageStatus } from "@/app/(state)/(slices)/home-page-slice";
import HomePageSkeleton from "./home-page-skeleton";
import { useEffect, useState } from "react";
import ErrorPage from "../error/error-page";

const HomePage = () => {
  const status = useAppSelector(
    (state) => state.homePageReducer.value.homePageStatus
  );

  const [homePageStatus, setHomePageStatus] = useState(HomePageStatus.Fresh);

  useEffect(() => {
    setHomePageStatus(status);
  }, [status]);

  const HomePageRender = () => {
    switch (homePageStatus) {
      case HomePageStatus.Fresh: {
        return <LandingPage />;
      }

      case HomePageStatus.Loading: {
        return <HomePageSkeleton />;
      }

      case HomePageStatus.LoadingComplete: {
        return <ContentContainer />;
      }

      case HomePageStatus.Error: {
        return <ErrorPage />;
      }
    }
  };

  return (
    <div
      id="home-page"
      className="w-full duration-500 ease-in-out transition-all"
    >
      {<HomePageRender />}
    </div>
  );
};

export default HomePage;
