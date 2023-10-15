import React, { useEffect, useRef } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { motion as m } from "framer-motion";

const Search = ({ autofocus = false, setKey }) => {
  const navigate = useNavigate();
  const searchref = useRef();
  useEffect(() => {
    if (autofocus) {
      searchref.current.focus();
    }
  }, []);
  return (
    <m.div
      layoutId="searchbox"
      className="w-[100%] h-[55px] md:mt-0 md:h-full  flex items-center justify-center  mt-3"
      onClick={() => navigate("/search")}
    >
      <div className="w-full mx-auto h-full flex items-center justify-center ring-1 rounded-full overflow-hidden ring-slate-500 p-1">
        <input
          className="text-[16px]  flex-grow h-full bg-transparent outline-none pl-5"
          type="text"
          placeholder={`search movies`}
          ref={searchref}
          onChange={(e) => setKey(e.target.value)}
        />
        <div className="w-[20%] rounded-full bg-purple-400 h-full flex items-center justify-center text-[24px]">
          <AiOutlineSearch />
        </div>
      </div>
    </m.div>
  );
};

export default Search;
