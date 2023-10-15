import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Homelayout = () => {
  return (
    <>
      <Navbar />
      <main className="w-full overflow-auto flex-grow pb-[130px]">
        <Outlet />
      </main>
    </>
  );
};

export default Homelayout;
