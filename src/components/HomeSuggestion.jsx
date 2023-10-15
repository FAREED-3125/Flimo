import { FetchApi } from "../api/fetchapi";
import { Swiper, SwiperSlide } from "swiper/react";
import { imageUrl } from "../api/links";
import { NavLink } from "react-router-dom";
import { GrFormPreviousLink } from "react-icons/gr";
import { GrFormNextLink } from "react-icons/gr";
import { motion as m } from "framer-motion";
import { useEffect, useState } from "react";
import { Navigation } from "swiper/modules";
import { FavoriteButton } from "../utils/buttons";

export const MovieSlider = ({ title, route, page, type }) => {
  const {
    data: moviearr,
    err: movieerr,
    loading: mloading,
  } = FetchApi(`${route}`, page);
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
    <div className="explore-slider min-h-[200px] flex flex-col justify-evenly overflow-hidden mt-3 relative">
      <div className="text-[20px] font-[900] pl-2 mb-2">{title}</div>
      <div className="flex items-center  relative">
        <Swiper
          slidesPerView={
            innerWidth < 500
              ? 3
              : innerWidth < 740
              ? 4
              : innerWidth < 1024
              ? 6
              : 10
          }
          modules={[Navigation]}
          spaceBetween={10}
          navigation={{
            nextEl: ".next-button",
            prevEl: ".prev-button",
          }}
          grabCursor={true}
          freeMode={true}
        >
          {moviearr?.results?.map((movies, index) => (
            <SwiperSlide key={index}>
              <NavLink to={`/moviesdetails/${type}/${movies.id}`}>
                <m.div
                  layout="moviebanner"
                  key={index}
                  className="shrink-0 object-cover rounded-md overflow-hidden relative"
                >
                  <img
                    loading="lazy"
                    decoding="async"
                    src={imageUrl(movies?.poster_path)}
                    alt=""
                  />
                  <div className="absolute top-1 right-1">
                    <FavoriteButton />
                  </div>
                </m.div>
              </NavLink>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="h-full w-[60px] md:grid bg-black/50 backdrop-blur-[3px] place-items-center absolute z-[9999]  hidden prev-button ">
          <div className="w-[40px] h-[40px] bg-white/100 backdrop-blur-[10px] text-white grid place-items-center text-[32px] rounded-full cursor-pointer">
            <GrFormPreviousLink />
          </div>
        </div>
        <div className="h-full top-0  w-[60px] md:grid bg-black/50 backdrop-blur-[3px]  place-items-center absolute z-[9999] right-0  hidden next-button">
          <div className="w-[40px] h-[40px] bg-white text-white grid place-items-center text-[32px] rounded-full cursor-pointer">
            <GrFormNextLink />
          </div>
        </div>
      </div>
    </div>
  );
};

// export const BottomHomeSlide = () => {
//   const {
//     data: movieArr2,
//     err: movieErr2,
//     loading: movieLoad2,
//   } = FetchApi("upcoming", 2);

//   return (
//     <>
//       <div className="font-[900] text-[20px] pl-2 mt-7 hidden">
//         Upcoming movies
//       </div>
//       <div className="bottom-slider w-full min-h-[280px]   flex items-center justify-start  ">
//         <Swiper
//           effect="coverflow"
//           modules={[EffectCoverflow, Autoplay]}
//           grabCursor={true}
//           coverflowEffect={{
//             rotate: 0,
//             stretch: 0,
//             depth: 100,
//             modifier: 2.5,
//           }}
//           loop={true}
//           spaceBetween={50}
//           // autoplay={{ delay: 3000 }}
//         >
//           {movieArr2?.results?.map((movies, index) => (
//             <NavLink to="/search">
//               <SwiperSlide key={index}>
//                 <img
//                   src={`${imageUrl(movies?.backdrop_path)}`}
//                   className="overflow-hidden rounded-lg"
//                   alt=""
//                 />
//                 <div className=" flex flex-col items-start justify-end font-[900] text-[16px] text-center mt-2 bg-gradient-to-t from-black to-transparent to-[50%] absolute bottom-[40px] w-full h-full">
//                   <div className="w-[80%] h-[30%] ml-5 flex items-center justify-start ">
//                     {movies?.title}
//                   </div>
//                 </div>
//                 <div className="w-full h-[40px]"></div>
//                 <NavLink
//                   to="/search"
//                   className="absolute bottom-4 right-8 z-[900]"
//                 >
//                   <WatchButton>
//                     <span className="text-purple-400">
//                       <BsFillPlayFill />
//                     </span>
//                   </WatchButton>
//                 </NavLink>
//               </SwiperSlide>
//             </NavLink>
//           ))}
//         </Swiper>
//       </div>{" "}
//     </>
//   );
// };
