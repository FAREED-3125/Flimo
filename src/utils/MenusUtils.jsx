import { motion as m } from "framer-motion";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export const CloseMenuSlider = ({ isMenu, setMenu }) => {
  const UpperPlateVariant = {
    animate: {
      rotate: 45,
      x: 0,
      y: 0,
      transition: {
        delay: 0.4,
      },
    },
    hidden: {
      x: -100,
      y: -100,
      transition: {
        delay: 0,
      },
    },
  };
  const LowerPlateVariant = {
    animate: {
      rotate: -45,
      x: 0,
      y: 0,
      transition: {
        delay: 0.4,
      },
    },
    hidden: {
      x: -100,
      y: 100,
      transition: {
        delay: 0,
      },
    },
  };
  return (
    <div
      className="flex items-center justify-center w-[50px] h-[50px] flex-col gap-[6px] relative  overflow-hidden"
      onClick={() => setMenu(false)}
    >
      <m.div
        variants={UpperPlateVariant}
        initial="hidden"
        animate={isMenu ? "animate" : "hidden"}
        className="w-[55%] h-[2px] bg-slate-300 rounded-lg absolute"
      ></m.div>

      <m.div
        variants={LowerPlateVariant}
        initial="hidden"
        animate={isMenu ? "animate" : "hidden"}
        className="w-[55%]  h-[2px] bg-slate-300  rounded-l  absolute"
      ></m.div>
    </div>
  );
};

export const MenuSlider = ({ isMenu, setMenu }) => {
  const UpperPlateVariant = {
    hidden: {
      x: 0,
      transition: {
        delay: 0.5,
      },
    },
    animate: {
      x: 100,
    },
  };
  const LowerPlateVariant = {
    hidden: {
      x: 0,
      transition: {
        delay: 0.5,
      },
    },
    animate: {
      x: -100,
    },
  };
  const MiddlePlateVariant = {
    hidden: {
      scale: 1,
      transition: {
        delay: 0.6,
      },
    },
    animate: {
      scale: 0,
    },
  };
  return (
    <div
      className="flex items-center justify-center w-[50px] h-full flex-col gap-[6px] overflow-hidden"
      onClick={() => setMenu(true)}
    >
      <m.div
        variants={UpperPlateVariant}
        initial="hidden"
        animate={isMenu ? "animate" : "hidden"}
        className="w-[35%] h-[2px] bg-slate-300 ml-1 rounded-lg"
      ></m.div>
      <m.div
        variants={MiddlePlateVariant}
        initial="hidden"
        animate={isMenu ? "animate" : "hidden"}
        className="w-[55%] h-[2px]  rounded-lg bg-purple-400"
      ></m.div>
      <m.div
        variants={LowerPlateVariant}
        initial="hidden"
        animate={isMenu ? "animate" : "hidden"}
        className="w-[35%] h-[2px] bg-slate-300 mr-1 rounded-lg"
      ></m.div>
    </div>
  );
};

export const SearchInvoker = () => {
  const navigate = useNavigate();
  return (
    <m.div
      onClick={() => navigate("/search")}
      className="fixed bottom-[70px] right-5 bg-white z-[99999] w-[50px] h-[50px] rounded-full text-slate-950 flex items-center justify-center text-[30px]"
    >
      <span>
        <AiOutlineSearch />
      </span>
    </m.div>
  );
};
