import React, { useEffect, useState } from "react";
import Search from "../utils/SearchBox";
import { NavLink, useNavigate } from "react-router-dom";
import { options } from "../api/fetchapi";
import { imageUrl } from "../api/links";
import { IoMdArrowRoundBack } from "react-icons/io";
const SearchPage = () => {
  const [SearchArr, setKeyword] = useState([]);
  const [keyword, setKey] = useState("");

  useEffect(() => {
    const fetchSearch = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/multi?query=${keyword}&include_adult=false&language=en-US&page=1`,
          options,
        );
        const data = await response.json();
        setKeyword(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchSearch();
  }, [keyword]);
  console.log(SearchArr);
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center  w-full h-screen">
      <div
        className="w-full flex items-center justify-start text-[25px] h-[45px]  mt-3 lg:hidden "
        onClick={() => navigate(-1)}
      >
        <span className="w-[45px] md:h-[45px] cursor-pointer bg-black/60 backdrop-blur-[5px] h-full ml-3 rounded-full flex items-center justify-center">
          <IoMdArrowRoundBack />
        </span>
      </div>
      <div className="relative w-full flex-grow flex flex-col items-center  ">
        <div className="w-full md:h-[90px]  md:mt-3 grid place-items-center">
          <div className="lg:w-[50%] w-[90%] h-[70%] md:w-[75%]">
            <Search autofocus={true} setKey={setKey} />
          </div>
        </div>
        <div className="w-[100%] h-[80vh]  grid grid-cols-3 mx-auto mt-1  rounded-lg gap-1  text-slate-400 md:grid-cols-4 lg:grid-cols-6 lg:p-5 overflow-auto grid-rows-1 p-1">
          {SearchArr?.results?.map((item, id) => (
            <NavLink to={`/moviesdetails/movies/${item.id}`}>
              <div
                className="w-full h-full flex items-center justify-between relative mt-2 rounded-lg overflow-hidden"
                key={id}
              >
                <img
                  className="w-full h-full object-cover"
                  src={`${imageUrl(item?.poster_path || item?.backdrop_path)}`}
                  alt={`${item?.title || item?.name}`}
                />
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
