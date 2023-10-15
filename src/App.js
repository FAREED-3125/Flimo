import React, { useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from "./components/Home";
import Search from "./components/Search";
import Movies from "./components/Movies";
import Account from "./components/Account";
import Homelayout from "./components/Homelayout";
import { SuggestComponent } from "./components/suggestion";
import Loading from "./utils/Loading";
import Tvseries from "./components/Tvserise";
import Favorites from "./components/Favorites";
import MovieDetails from "./components/MovieDetails";
import Lenis from '@studio-freight/lenis'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Homelayout />,
    children: [
      {
        path: "/",
        index: true,
        element: <Home />,
      },
      {
        path: "/movies",
        element: <Movies />,
        children: [
          {
            index: true,
            element: <SuggestComponent type={"movies"} genre={"movies"} />,
          },
          {
            path: "toprated",
            element: <SuggestComponent type="toprated" genre={"movies"} />,
          },
          {
            path: "popular",
            element: <SuggestComponent type="popular" genre={"movies"} />,
          },
          {
            path: "nowplaying",
            element: <SuggestComponent type={"nowplaying"} genre={"movies"} />,
          },
          {
            path: "upcoming",
            element: <SuggestComponent type={"upcoming"} genre={"movies"} />,
          },
        ],
      },
      {
        path: "/account",
        element: <Account />,
      },
      {
        path: "/tvseries",
        element: <Tvseries />,
        children: [
          {
            index: true,
            element: (
              <SuggestComponent type={"tvseries-p"} genre={"tvseries"} />
            ),
          },
          {
            path: "highrating",
            element: <SuggestComponent type="highrating" genre={"tvseries"} />,
          },
          {
            path: "onair",
            element: <SuggestComponent type="onair" genre={"tvseries"} />,
          },
        ],
      },

      {
        path: "/Favorites",
        element: <Favorites />,
      },
    ],
  },
  {
    path: "/loading",
    element: <Loading />,
  },
  ,
  {
    path: "/search",
    element: <Search />,
  },
  {
    path: "/moviesdetails/:type/:movieid",
    element: <MovieDetails />,
  },
]);

const App = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
