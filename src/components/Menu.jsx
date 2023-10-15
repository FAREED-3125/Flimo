import React, { useEffect, useRef } from "react";
import { CloseMenuSlider } from "../utils/MenusUtils";
import { NavLink } from "react-router-dom";
import { motion as m } from "framer-motion";
const menuVariant = {
  hidden: {
    scale: 0,
    transition: {
      type: "linear",
      ease: "linear",
      delay: 0.2,
    },
  },
  animate: {
    scale: 1,
    transition: {
      delay: 0.2,
    },
  },
};

const Menu = ({ isMenu, setMenu }) => {
  const menuItems = ["new", "Popular", "now playing", "Upcoming", "Top rating"];
  const menuItems2 = ["On air", "popular", "Highly rated"];
  const navLinks = [
    "/movies",
    "/movies/popular",
    "/movies/nowplaying",
    "/movies/upcoming",
    "/movies/toprated",
  ];

  const Navlinks2 = ["/tvseries/onair", "tvseries/", "/tvseries/highrating"];

  const menuRef = useRef();
  useEffect(() => {
    let handleMouseDown = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setMenu(false);
      }
    };
    document.addEventListener("mousedown", handleMouseDown);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  });
  return (
    <m.div
      className="bg-[#1e1e1e]/70 backdrop-blur-[10px] w-[65%] md:w-[50%] lg:w-[30%] h-[100dvh] absolute top-0 right-0 z-[99900] origin-top-right overflow-auto"
      variants={menuVariant}
      initial={"hidden"}
      animate={isMenu ? "animate" : "hidden"}
      ref={menuRef}
    >
      <div className="w-full h-max flex items-center justify-end p-4">
        <CloseMenuSlider isMenu={isMenu} setMenu={setMenu} />
      </div>

      <div className="w-full h-max flex flex-col items-end justify-center gap-4 p-10 overflow-auto">
        <div className="w-max text-[20px] font-[900] relative">
          <div>Movies</div>
          <div className="absolute w-full h-[2px] bottom-0 bg-purple-400"></div>
        </div>
        {menuItems.map((item, index) => (
          <div className="overflow-hidden" key={index}>
            <NavLink to={`${navLinks[index]}`}>
              <div>
                <span>{item}</span>
              </div>
            </NavLink>
          </div>
        ))}
        <div className="w-max text-[20px] font-[900] relative">
          <div>Tv series</div>
          <div className="absolute w-full h-[2px] bottom-0 bg-purple-400"></div>
        </div>
        {menuItems2.map((item, index) => (
          <div className="overflow-hidden" key={index}>
            <NavLink to={`${Navlinks2[index]}`}>
              <div>
                <span>{item}</span>
              </div>
            </NavLink>
          </div>
        ))}
      </div>
    </m.div>
  );
};

export default Menu;
