import React, { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FetchApi } from "../api/fetchapi";
import { imageUrl } from "../api/links";
import Loading from "../utils/Loading";
import { FaMicrophoneAlt } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import { FavoriteButton, UnderLinePurple } from "../utils/buttons";
import { MovieSlider } from "./HomeSuggestion";
import useDimension from "../utils/useDimension";
import { Swiper, SwiperSlide } from "swiper/react";
import Header from "./Header";
import { format } from "date-fns";
import { IoMdArrowRoundBack } from "react-icons/io";

const MovieDetails = () => {
  const navigate = useNavigate();
  const { movieid, type } = useParams();
  const memoid = useMemo(() => {
    return movieid;
  }, []);
  const innerWidth = useDimension();
  const {
    data: movieDetail,
    err: movErr,
    loading: movloading,
  } = FetchApi(
    type === "movies"
      ? "moviedetails"
      : type === "tvseries"
      ? "tvseriesdetails"
      : "",
    1,
    movieid
  ) ||
  FetchApi("tvseriesdetails", 1, movieid) ||
  FetchApi("moviedetails", 1, movieid);

  const { data: creditArr, loading: credidLoading } = FetchApi(
    "movieCredits",
    1,
    movieid
  );
  const { data: reviewArr, loading: reviewLoading } = FetchApi(
    "moviereview",
    1,
    movieid
  );

  useEffect(() => {
    if (memoid !== movieid) window.location.reload();
  });

  if (movloading) {
    return <Loading />;
  }
  return (
    <div className="w-full h-max overflow-auto  pb-[100px]">
      <div className="hidden md:block">
        <Header />
      </div>
      {/* ===========================================================Mobile viewport Details================================================= */}
      <div
        className="w-full min-h-screen overflow-auto backdrop-blur-[200px] md:hidden relative"
        style={{
          backgroundImage: `url(${imageUrl(movieDetail?.backdrop_path)})`,
          backgroundSize: "cover",
        }}
      >
        <div
          className="w-full flex items-center justify-start text-[25px] h-[35px]  lg:hidden absolute top-3 z-[99]"
          onClick={() => navigate(-1)}
        >
          <span className="w-[45px] md:h-[45px] cursor-pointer backdrop-blur-[5px] h-full ml-3 rounded-full flex items-center justify-center">
            <IoMdArrowRoundBack />
          </span>
        </div>
        <div className="absolute top-2 right-2 z-[99]">
          <FavoriteButton />
        </div>
        <div className="min-w-screen min-h-screen h-max  bg-black/60 backdrop-blur-[50px] ">
          <div className="w-full h-[300px] md:h-[400px]  relative">
            <img
              className="w-full h-full object-cover"
              src={`${imageUrl(
                movieDetail?.backdrop_path || movieDetail?.poster_path
              )}`}
              alt=""
            />
            <div className="w-full h-full bg-gradient-to-t from-black to-transparent absolute top-0 to-[60%]"></div>
            <FloatingMovieDetails movieDetail={movieDetail} />
          </div>
          <BottomMovieDetails movieDetail={movieDetail} />
        </div>
      </div>
      {/* ===============================================tablet and laptop viewport ============================================= */}
      <div className="w-full md:h-[650px] lg:h-[600px] relative z-[0] hidden md:block mt-[70px]">
        <div
          className="w-full h-full flex items-center gap-5"
          style={{
            backgroundImage: `url(${imageUrl(movieDetail?.backdrop_path)})`,
            backgroundSize: "cover",
          }}
        >
          <div className=" w-full  md:h-[650px] lg:h-[600px] bg-black/70 absolute top-0"></div>

          {/* image divition */}
          <div className="w-[30%] h-full grid place-items-center z-[99] ">
            <div className="overflow-hidden w-[90%] h-[90%] rounded-lg relative">
              <img
                className="w-full h-full object-cover"
                src={`${imageUrl(movieDetail?.poster_path)}`}
                alt=""
              />
              <div className="absolute top-2 right-2 z-[99]">
                <FavoriteButton />
              </div>
            </div>
          </div>
          {/* details division */}
          <div className="w-[60%] md:h-[650px] z-[99] grid  lg:h-[600px] place-items-center">
            <div className="w-full h-[90%] flex flex-col items-start justify-start">
              {/* Heading */}
              <h3 className="text-[44px] font-[900]">{movieDetail?.title}</h3>
              {/* Rating */}
              <div className="flex items-center w-max h-[50px] gap-2">
                <h2>Rating:</h2>
                <p className="flex items-center gap-1">
                  <span>
                    <AiFillStar />
                  </span>
                  <span>{Number(movieDetail?.vote_average).toFixed(1)}</span>
                </p>
                <p className="w-max">
                  ({movieDetail?.vote_count} <span>total votes)</span>
                  <UnderLinePurple />
                </p>
              </div>
              {/* rating end */}
              {/* overview */}
              <div className="w-full h-[100px] overflow-auto">
                <h2 className="w-max">
                  overview:
                  <UnderLinePurple />
                </h2>
                <p className="mt-2">{movieDetail?.overview}</p>
                <p className="mt-2">
                  Release date: <span>{movieDetail?.release_date}</span>
                </p>
              </div>
              {/* overview end */}
              {/* genre and language start */}
              <div className="mt-4 w-[90%] h-max flex items-start overflow-auto">
                <div className="w-full">
                  <h2 className="w-max">
                    Genres:
                    <UnderLinePurple />
                  </h2>
                  <div className="flex items-start justify-start gap-2 mt-2">
                    {movieDetail?.genres?.map((genre, index) => (
                      <p className="" key={index}>
                        {genre?.name}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="w-full">
                  <h2 className="w-max">
                    Languages:
                    <UnderLinePurple />
                  </h2>
                  <div className="flex items-start justify-start gap-2 mt-2">
                    {movieDetail?.spoken_languages?.map((language, index) => (
                      <p className="" key={index}>
                        {language?.english_name}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
              {/* genre and language end */}
              {/* production container start */}
              <div className="mt-5 flex-grow w-full flex flex-col">
                <h3 className="w-max">
                  Production companies
                  <UnderLinePurple />
                </h3>
                <div className="flex-grow w-full flex mt-3 bg-white/20 items-center p-3 justify-evenly gap-5 overflow-x-auto rounded-md">
                  {movieDetail?.production_companies?.map(
                    (company, index) =>
                      company?.logo_path &&
                      company?.name && (
                        <div
                          key={index}
                          className="shrink-0 grid place-items-center w-[120px] "
                        >
                          <div className="w-[120px] h-[110px] overflow-hidden">
                            <img
                              className="w-full h-full object-fill"
                              src={imageUrl(company?.logo_path)}
                              alt="no image"
                            />
                          </div>
                          <p className="text-[14px]">{company?.name}</p>
                        </div>
                      )
                  )}
                </div>
              </div>
              {/* production container end */}
            </div>
          </div>
          {/* details end */}
        </div>
      </div>
      {/* =====================Credits and review section
      start================== */}

      <div className="flex items-start flex-col lg:flex-row gap-4">
        {credidLoading ? (
          "loading"
        ) : (
          <>
            {/* cast container start */}
            <div className="lg:w-[60%] w-full p-2 mt-4">
              <h3 className="w-max">
                Casts
                <UnderLinePurple />
              </h3>
              <div className=" mt-5">
                <Swiper
                  slidesPerView={
                    innerWidth <= 740 ? 3 : innerWidth <= 1024 ? 6 : 6
                  }
                  freeMode={true}
                  grabCursor={true}
                  spaceBetween={10}
                >
                  {creditArr?.cast?.map((cast, index) => (
                    <SwiperSlide key={index}>
                      <div className=" w-[120px]">
                        {/* cast image */}
                        <div className="w-full h-[130px]  overflow-hidden rounded-lg">
                          <img
                            className="w-full h-full object-fill"
                            src={imageUrl(cast?.profile_path)}
                            alt="image poster"
                          />
                        </div>
                        <div>
                          <p className="font-[600] text-[14px]">{cast?.name}</p>
                          <p className="font-[400] text-[12px]">
                            {cast?.character}
                          </p>
                        </div>
                      </div>{" "}
                    </SwiperSlide>
                  ))}{" "}
                </Swiper>
              </div>
            </div>
            {/* cast container end */}
            {/* review container start */}
            <div className="w-full lg:w-[40%]">
              <h3 className="w-max mt-5">
                Reviews
                <UnderLinePurple />
              </h3>
              <div className="w-full flex flex-col gap-y-3 mt-4">
                {reviewArr?.results?.map((review, index) => (
                  <div className="w-full p-2">
                    <div
                      className="w-full h-[50px] flex
                      items-center
                      justify-start
                      gap-2"
                    >
                      {review?.author_details?.avatar_path ? (
                        <div className="w-[40px] h-[40px] overflow-hidden rounded-full">
                          <img
                            className="w-fll h-full object-fill"
                            src={imageUrl(review?.author_details?.avatar_path)}
                            alt=""
                          />
                        </div>
                      ) : (
                        <div className="w-[40px] h-[40px]  bg-gray-500 overflow-hidden rounded-full"></div>
                      )}{" "}
                      <div>
                        <h2 className="font-[900] text-[15px]">
                          {review?.author || review?.author_details?.username}
                        </h2>
                        <p className="text-[12px]">
                          {format(new Date(review?.updated_at), "dd-MM-yyyy")}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-[12px]">{review?.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* review container end */}
          </>
        )}
      </div>
      {/* ==========================Credits and review section
    end================ */}
      {/* ======================Bottom recomendation================ */}
      <div className="mt-6">
        <MovieSlider
          innerWidth={innerWidth}
          type={"movies"}
          title={"Related movies"}
          route={"movies"}
          page={1}
        />{" "}
        <MovieSlider
          innerWidth={innerWidth}
          type={"movies"}
          title={"new movies"}
          route={"popular"}
          page={2}
        />
      </div>
    </div>
  );
};

export default MovieDetails;

const FloatingMovieDetails = ({ movieDetail }) => {
  const fixedFunc = (num) => {
    return Number.parseFloat(num).toFixed(1);
  };
  return (
    <div className="w-full h-[230px] absolute bottom-[-150px] flex item-center justify-center gap-2 p-2">
      <div className="w-[40%]  h-full rounded-lg overflow-hidden">
        <img
          className="w-full h-full object-fill"
          src={`${imageUrl(movieDetail?.poster_path)}`}
          alt=""
        />
      </div>
      <div className="w-[60%] h-full font-[900]  backdrop-blur-[2px] bg-black/20 p-3 rounded-lg ">
        <div className="">
          <p>language</p>
          <div className="w-[80px] mt-3">
            <div className="flex items-center justify-center gap-2 ring-2 rounded-full px-2 ">
              <div className="text-[15px] border-r-[2px] border-blue-300 pr-2">
                <FaMicrophoneAlt />
              </div>

              <div>{movieDetail?.original_language}</div>
            </div>
          </div>
        </div>
        <div className="mt-3">
          <div>
            <p>Rating</p>
            <div className="w-[80px] mt-3">
              <div className="flex items-center justify-center gap-2 ring-2 rounded-full px-2 ">
                <div className="text-[15px] border-r-[2px] border-blue-300 pr-2">
                  <AiFillStar />
                </div>

                <div>{fixedFunc(movieDetail?.vote_average)}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-1 items-center mt-5 w-full text-[14px]">
          <div>Total votings:</div>
          <div className="text text-yellow-600">
            {movieDetail?.vote_count} votes
          </div>
        </div>
      </div>
    </div>
  );
};

const BottomMovieDetails = ({ movieDetail }) => {
  return (
    <div className="mt-[155px] p-2 w-full  ">
      <div>
        <h2 className="text-[26px] font-[900] w-full ">
          <div>{movieDetail?.title}</div>
        </h2>
        <h2 className="font-[900] w-max mt-2  ">
          Overview
          <UnderLinePurple />
        </h2>
        <p className="text-[15px] mt-2  ">{movieDetail?.overview}</p>
      </div>
      <div className="mt-2">
        Release date: <span>{movieDetail?.release_date}</span>
      </div>
      <div className="mt-3">
        <h2 className="font-[900] w-max ">
          languages
          <UnderLinePurple />
        </h2>
        <div className="flex items-center justify-start gap-3 mt-2">
          {movieDetail?.spoken_languages?.map((language, index) => (
            <p className="" key={index}>
              {language?.english_name || language?.name}
            </p>
          ))}
        </div>
      </div>
      <div className="mt-3">
        <h2 className="font-[900] w-[60px] ">
          Genres
          <UnderLinePurple />
        </h2>
        <div className="flex items-center justify-start gap-3 mt-2">
          {movieDetail?.genres?.map((genre, index) => (
            <p className="" key={index}>
              {genre?.name}
            </p>
          ))}
        </div>
      </div>
      {movieDetail?.production_companies?.length > 0 && (
        <div className="mt-6">
          <h2 className="font-[900] w-max text ">
            Production companies
            <UnderLinePurple />
          </h2>
          <div className="w-full h-[175px] p-3  rounded-lg flex items-center justify-start gap-[50px] mt-5 bg-white/50 backdrop-blur-[2px] overflow-x-auto overflow-y-hidden">
            {movieDetail?.production_companies?.map(
              (company, index) =>
                company?.logo_path &&
                company?.name && (
                  <div
                    key={index}
                    className="shrink-0 grid place-items-center w-[110px] "
                  >
                    <div className="w-[110px] h-[110px] overflow-hidden">
                      <img
                        className="w-full h-full object-fill"
                        src={imageUrl(company?.logo_path)}
                        alt="no image"
                      />
                    </div>
                    <p className="text-[14px]">{company?.name}</p>
                  </div>
                )
            )}
          </div>
        </div>
      )}
      {movieDetail?.production_countries?.length > 0 && (
        <div className="mt-6">
          <h2 className="font-[900] w-max text ">
            Production countries:
            <UnderLinePurple />
          </h2>
          <div className="flex items-start flex-col justify-normal p-3 gap-2">
            {movieDetail?.production_countries?.map((country, index) => (
              <div key={index} className="">
                <span>{index + 1}. </span> {country?.name}
              </div>
            ))}
          </div>
        </div>
      )}
      {movieDetail?.belongs_to_collection && (
        <div className="w-full mt-5">
          <h2 className="w-max ">
            Belongs to the Collections
            <UnderLinePurple />
          </h2>
          <div className="w-full  h-[250px]   aspect-video relative mt-5">
            <img
              src={`${imageUrl(
                movieDetail?.belongs_to_collection?.backdrop_path
              )}`}
              className="overflow-hidden rounded-lg w-full h-full"
              alt=""
            />
            <div className=" flex flex-col items-start justify-end font-[900] text-[16px] text-center mt-2 bg-gradient-to-t from-black to-transparent to-[50%] absolute bottom-0 w-full  h-full rounded-lg">
              <div className="w-[80%] h-max ml-5 flex items-end justify-start  flex-col mb-5">
                <div className="text-[16px] mb-3">
                  {movieDetail?.belongs_to_collection?.name}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const BottomImageSection = () => {
  const { data: imageArr, loading: imageLoading } = FetchApi();
  return <div></div>;
};
