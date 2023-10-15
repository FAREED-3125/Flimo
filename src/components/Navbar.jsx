import React, { useState } from "react";
import { HiHome } from "react-icons/hi";
import { RiMovie2Fill } from "react-icons/ri";
import { AiOutlineHeart } from "react-icons/ai";
import { MdAccountCircle } from "react-icons/md";
import { PiTelevision } from "react-icons/pi";
import { NavLink, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const path =
    location.pathname.split("/")[1] === ""
      ? "Home"
      : location.pathname.split("/")[1];
  const navArr = ["Home", "movies", "tvseries", "Favorites", "account"];
  const navIcons = [
    <HiHome />,
    <RiMovie2Fill />,
    <PiTelevision />,
    <AiOutlineHeart />,
    <MdAccountCircle />,
  ];
  const [selectNav, setNav] = useState(path);
  return (
    <div className="shadow-md bg-black/60 backdrop-blur-[5px] w-full h-[55px]  mx-auto fixed left-[50%] translate-x-[-50%] bottom-0 p-[5px] text-slate-300  flex items-center justify-evenly gap-2 lg:hidden z-[9999]">
      {navArr.map((nav, index) => (
        <NavLink
          to={`${nav === "Home" ? "/" : `/${nav}`}`}
          key={index}
          className="flex w-full h-full items-center justify-center flex-col relative "
          style={{
            color: selectNav === nav && "rgb(168 85 247)",
          }}
          onClick={() => setNav(nav)}
        >
          <div className="text-[20px]">{navIcons[index]}</div>
          <div className="text-[12px] font-[400]">{nav}</div>
        </NavLink>
      ))}
    </div>
  );
};

export default Navbar;
