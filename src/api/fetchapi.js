import { useEffect, useState } from "react";

const baseURL = "https://api.themoviedb.org/3";

export const endpoint = (type, pages = 1, keyword) => {
  switch (type) {
    case "movies":
      return `/discover/movie?include_adult=false&include_video=false&language=en-US&page=${pages}&sort_by=popularity.desc`;

    case "tvseries":
      return `/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${pages}&sort_by=popularity.desc`;

    case "toprated":
      return `/movie/top_rated?language=en-US&page=${pages}`;

    case "popular":
      return `/movie/popular?language=en-US&page=${pages}`;

    case "now playing":
      return `/movie/now_playing?language=en-US&page=${pages}`;

    case "upcoming":
      return `/movie/upcoming?language=en-US&page=${pages}`;

    case "trending":
      return `/trending/all/day?language=en-US`;

    case "tvseries-p":
      return `/tv/popular?language=en-US&page=${pages}`;

    case "highrating":
      return `/tv/top_rated?language=en-US&page=${pages}`;

    case "onair":
      return `/tv/on_the_air?language=en-US&page=${pages}`;

    case "keyword":
      return `/search/multi?query=${keyword}&include_adult=false&language=en-US&page=${pages}`;

    case "moviedetails":
      return `/movie/${keyword}?language=en-US`;

    case "tvseriesdetails":
      return `/tv/${keyword}?language=en-US`;

    case "moviesImages":
      return `/tv/${keyword}?language=en-US`;

    case "movieCredits":
      return `/movie/${keyword}/credits?language=en-US`;

    case "moviereview":
      return `/movie/${keyword}/reviews?language=en-US&page=${pages}`;
  }
};

export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZmQ4NmUzMDQ1Mjg1YjAxNWM4NWRmZWQ5MjMxNzcxMyIsInN1YiI6IjY1MWE5NTI2NzQ1MDdkMDBmZjk2MzhlMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7gA3AcKSGIgBqEF97g2a0KnJC6eAkWTzhWDVM8Wf-68",
  },
};

export const FetchApi = (type, pages, keyword) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState();

  useEffect(() => {
    const fetchCaller = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${baseURL}${endpoint(type, pages, keyword)}`,
          options
        );
        const data = await response.json();
        if (!response.ok)
          throw new Error("failed to fetch.something went wrong.");
        setData(data);
      } catch (err) {
        setErr(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCaller();
  }, [type, endpoint]);

  return { data, loading, err };
};
