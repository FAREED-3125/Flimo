import React, { useState } from "react";
import { MenuSlider } from "../utils/MenusUtils";
import Menu from "./Menu";
import Search from "../utils/SearchBox";
import { NavLink } from "react-router-dom";
import { BiSearchAlt } from "react-icons/bi";

const Header = () => {
  const [isMenu, setMenu] = useState(false);
  return (
    <>
      <div className="w-full h-[60px] shadow-md flex items-center justify-between px-3 md:absolute md:bg-[#1e1e1e]/50 md:backdrop-blur-[3px] md:top-0 md:z-[999]">
        <NavLink to={"/"}>
          {" "}
          <div className=" font-pixels font-[700] text-[32px] pl-2 ">
            Flim<span className="text-purple-400">o.</span>
          </div>
        </NavLink>
        <div className="w-[320px] ml-auto h-full p-2 hidden md:block lg:z-[999]">
          <Search />
        </div>
        <div className="flex items-start justify-center  h-full">
          <NavLink
            className="md:hidden w-max h-full grid place-items-center"
            to="/search"
          >
            <div className="w-[50px]  h-[50px] rounded-full text-[28px] grid text-purple-400 place-items-center  ">
              <BiSearchAlt />
            </div>
          </NavLink>
          <div className="lg:z-[999] h-full grid place-items-center">
            <MenuSlider isMenu={isMenu} setMenu={setMenu} />
            {/*  */}
          </div>{" "}
        </div>
      </div>
      <Menu isMenu={isMenu} setMenu={setMenu} />
    </>
  );
};

export default Header;
