import React from "react";
import Header from "./Header";
import { Swiper, SwiperSlide } from "swiper/react";
import { FetchApi } from "../api/fetchapi";
import { imageUrl } from "../api/links";
import { EffectCoverflow, Autoplay, EffectFade } from "swiper/modules";
import {
  FavoriteButton,
  PrimaryButton,
  SecondaryButton,
  WatchButton,
} from "../utils/buttons";
import { MovieSlider } from "./HomeSuggestion";
import { BsFillExclamationCircleFill, BsFillPlayFill } from "react-icons/bs";
import { FaMicrophoneAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

const Home = () => {
  const [innerWidth, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const detectWidth = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", detectWidth);

    return () => {
      window.removeEventListener("resize", detectWidth);
    };
  });
  return (
    <>
      <Header />

      <HomeSlides innerWidth={innerWidth} />
      <MovieSlider
        innerWidth={innerWidth}
        type={"movies"}
        title={"Explore movies"}
        route={"movies"}
        page={1}
      />
      <MovieSlider
        type={"movies"}
        title={`popular`}
        route={"popular"}
        page={3}
      />
      <MovieSlider
        type={"tvseries"}
        title={`Tv series (popular)`}
        route={"tvseries-p"}
        page={2}
      />
      <MovieSlider
        type={"tvseries"}
        title={"On the Air"}
        route={"onair"}
        page={1}
      />
    </>
  );
};

const HomeSlides = () => {
  const { data: movieArr2 } = FetchApi("popular");
  const [innerWidth, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const detectWidth = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", detectWidth);

    return () => {
      window.removeEventListener("resize", detectWidth);
    };
  });
  console.log(movieArr2);

  return (
    <>
      <div className="home-slider md:relative md:top-[-13px] w-full min-h-[240px] hidden md:flex   items-center justify-start ">
        <Swiper
          effect={innerWidth < 740 ? "coverflow" : ""}
          modules={[EffectCoverflow, Autoplay, EffectFade]}
          grabCursor={true}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
          }}
          slidesPerView={1}
          loop={true}
          spaceBetween={0}
          autoplay={{ delay: 7000 }}
        >
          {movieArr2?.results?.map((movies, index) => (
            <SwiperSlide key={index}>
              <div className="w-full md:w-full md:mx-auto md:h-[450px] lg:h-[600px]  aspect-video relative ">
                <div className="absolute top-1 right-1">
                  <FavoriteButton />
                </div>
                <img
                  src={`${imageUrl(movies?.backdrop_path)}`}
                  className="overflow-hidden rounded-lg"
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
                <div className=" flex flex-col items-start justify-end md:justify-center font-[900] text-[16px] text-center mt-2 bg-gradient-to-t from-black to-transparent to-[50%] absolute bottom-[40px] md:bottom-0 w-full md:to-[120%] h-full rounded-lg">
                  <div className="w-[80%] lg:w-[60%] h-max ml-5 flex items-start justify-start  flex-col mb-5">
                    <div className="text-[10px] md:text-[14px] lg:text-[15px] text-purple-300 ">
                      #{index + 1} trending
                    </div>
                    <div className="md:text-[28px] lg:text-[32px] text-[16px] mb-3">
                      {movies?.title}
                    </div>
                    <div className="hidden md:block text-left font-[400] text-[14px] text-white text-ellipsis h-[100px] md:w-[60%] lg:w-[70%] overflow-hidden">
                      {movies?.overview}
                    </div>
                    <div>
                      <div className="flex items-center justify-center gap-2 md:mt-5 ring-1 rounded-full px-2 ">
                        <div className="text-[15px] border-r-[1px] border-blue-300 pr-2">
                          <FaMicrophoneAlt />
                        </div>

                        <div>{movies?.original_language}</div>
                      </div>
                    </div>
                    <div className="hidden  mt-5 md:flex items-center justify-center  gap-7">
                      <NavLink to={`/moviesdetails/movies/${movies?.id}`}>
                        <PrimaryButton width={120} height={50}>
                          <div className="flex gap-2 items-center justify-between">
                            <div>
                              <BsFillPlayFill />
                            </div>
                            <div> Play now</div>
                          </div>
                        </PrimaryButton>
                      </NavLink>
                      <NavLink to={`/moviesdetails/movies/${movies?.id}`}>
                        <SecondaryButton width={120} height={50}>
                          <div className="flex gap-2 items-center justify-between">
                            <div>
                              <BsFillExclamationCircleFill />
                            </div>
                            <div> Details</div>
                          </div>
                        </SecondaryButton>
                      </NavLink>
                    </div>
                  </div>
                </div>

                <div className="w-full md:hidden h-[40px]"></div>
                <NavLink
                  to={`/moviesdetails/movies/${movies?.id}`}
                  className="absolute bottom-4 md:bottom-0 right-8 z-[900]
                md:hidden"
                >
                  <WatchButton>
                    <span className="text-purple-400">
                      <BsFillPlayFill />
                    </span>
                  </WatchButton>
                </NavLink>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="home-slider md:hidden w-full min-h-[240px]  flex   items-center justify-start ">
        <Swiper
          effect={"coverflow"}
          modules={[EffectCoverflow, Autoplay, EffectFade]}
          grabCursor={true}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
          }}
          slidesPerView={1}
          loop={true}
          spaceBetween={0}
          autoplay={{ delay: 7000 }}
        >
          {movieArr2?.results?.map((movies, index) => (
            <SwiperSlide key={index}>
              <div className="w-full h-[250px] aspect-video relative ">
                <NavLink to={`/moviesdetails/movies/${movies?.id}`}>
                  <div className="absolute z-[9999] bottom-[7%] right-7">
                    <WatchButton>
                      <BsFillPlayFill />
                    </WatchButton>
                  </div>{" "}
                </NavLink>
                <div className="absolute top-1 right-1">
                  <FavoriteButton />
                </div>
                <img
                  src={`${imageUrl(movies?.backdrop_path)}`}
                  className="overflow-hidden rounded-lg w-full h-[80%]"
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
                <div className=" flex flex-col items-start justify-end font-[900] text-[16px] text-center mt-2 bg-gradient-to-t from-black to-transparent to-[50%] absolute top-0 w-full  h-[80%] rounded-lg">
                  <div className="w-[80%] lg:w-[60%] h-max ml-5 flex items-start justify-start  flex-col mb-5">
                    <div className="text-[10px] md:text-[14px] lg:text-[15px] text-purple-300 ">
                      #{index + 1} trending
                    </div>
                    <div className="md:text-[28px] lg:text-[32px] text-[16px] mb-3">
                      {movies?.title}
                    </div>
                    <div className="hidden md:block text-left font-[400] text-[14px] text-white text-ellipsis h-[100px] md:w-[60%] lg:w-[70%] overflow-hidden">
                      {movies?.overview}
                    </div>
                    <div>
                      <div className="flex items-center justify-center gap-2 md:mt-5 ring-1 rounded-full px-2 ">
                        <div className="text-[15px] border-r-[1px] border-blue-300 pr-2">
                          <FaMicrophoneAlt />
                        </div>

                        <div>{movies?.original_language}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Home;
