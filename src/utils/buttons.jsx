import { AiOutlineHeart } from "react-icons/ai";

export const PrimaryButton = ({ children, width, height }) => {
  return (
    <div
      className={`bg-black rounded-lg flex items-center justify-center border-2 border-purple-400 text-purple-400`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      {children}
    </div>
  );
};

export const SecondaryButton = ({ children, width, height }) => {
  return (
    <div
      className={`bg-purple-400 backdrop-blur-[2px] border-2 border-gray-900   text-gray-900 rounded-md flex items-center justify-center`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      {children}
    </div>
  );
};

export const WatchButton = ({ children }) => {
  return (
    <div className="w-[60px] h-[60px] rounded-full flex items-center justify-center bg-black border-2 border-purple-400 text-[24px]">
      {children}
    </div>
  );
};

export const UnderLinePurple = () => {
  return <span className="block w-full h-[1px] bg-purple-400 "></span>;
};

export const FavoriteButton = () => {
  return (
    <h3 className="w-[30px] text-[20px] h-[30px] bg-white/10 backdrop-blur-[2px] grid place-items-center rounded-full">
      <AiOutlineHeart />
    </h3>
  );
};
