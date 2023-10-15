import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { SearchInvoker } from "../utils/MenusUtils";
import Header from "./Header";
const Movies = () => {
  return (
    <>
      <Header />
      <div className="md:mt-20">
        <TopSuggestion />
        <main className="p-2 grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-2 relative  md:mt-2">
          <Outlet />
        </main>
      </div>
      <SearchInvoker />
    </>
  );
};

const TopSuggestion = () => {
  const location = useLocation();
  const suggestions = [
    "movies",
    "toprated",
    "popular",
    "nowplaying",
    "upcoming",
  ];
  const path = location.pathname.split("/")[2];

  useEffect(() => {
    if (!path) {
      setSelect("movies");
    } else {
      setSelect(path);
    }
  }, [path]);

  const [isSelected, setSelect] = useState(!path ? suggestions[0] : path);

  return (
    <div className="w-full">
      <div className="flex items-center w-full md:w-max gap-2 p-1 overflow-auto bg-gray-200 fixed top-0 md:static rounded-lg z-[999]">
        {suggestions.map((suggest, index) => (
          <NavLink
            key={index}
            to={`/movies/${suggest === "movies" ? "" : suggest}`}
            className="relative"
          >
            <div
              onClick={() => setSelect(suggest)}
              style={{
                backgroundColor: "white",
                color: isSelected === suggest ? "white" : "black",
              }}
              className="px-4 py-2 w-max shrink-0 font-[900] rounded-md"
            >
              <span className=" relative z-[99]">{suggest}</span>
            </div>
            <div
              layoutId="selected"
              transition={{
                ease: "linear",
              }}
              style={{
                transform: isSelected === suggest ? "scale(1)" : "scale(0)",
                transition: "all .3s ease ",
              }}
              className="bg-[#1e1e1e] w-full h-full absolute top-0 z-[] rounded-md"
            ></div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Movies;
