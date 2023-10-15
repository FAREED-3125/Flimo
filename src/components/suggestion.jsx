import React from "react";
import { FetchApi } from "../api/fetchapi";
import { imageUrl } from "../api/links";
import { NavLink } from "react-router-dom";
import Loading from "../utils/Loading";

export const SuggestComponent = ({ type, genre }) => {
  const {
    data: movieArr2,
    err: movieErr2,
    loading: movieLoad2,
  } = FetchApi(type, 1);
  const {
    data: movieArr1,
    err: movieErr1,
    loading: movieLoad1,
  } = FetchApi(type, 2);

  if (movieLoad1 || movieLoad2) return <Loading />;

  return (
    <>
      {movieArr2?.results?.map((movie, index) => (
        <NavLink key={index} to={`/moviesdetails/${genre}/${movie?.id}`}>
          <div className="rounded-lg overflow-hidden">
            <img
              className="w-full h-full"
              src={imageUrl(movie?.poster_path)}
              alt=""
              loading="lazy"
              decoding="async"
            />
          </div>
        </NavLink>
      ))}
      {movieArr1?.results?.map((movie, index) => (
        <NavLink key={index} to={`/moviesdetails/${genre}/${movie?.id}`}>
          <div className="rounded-lg overflow-hidden">
            <img
              className="w-full h-full"
              src={imageUrl(movie?.poster_path)}
              alt=""
              loading="lazy"
              decoding="async"
            />
          </div>
        </NavLink>
      ))}
    </>
  );
};
