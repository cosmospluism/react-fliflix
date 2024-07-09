const API_KEY = "6eae15e3c9b5407aeaf436a61092e3b9";
const BASE_URL = "https://api.themoviedb.org/3";

// Movie
interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
}

export interface IGetMovies {
  dates: {
    maximum: number;
    minimum: number;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export function getMovies() {
  return fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`).then((res) =>
    res.json()
  );
}

interface IPopularMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  release_date: string;
  genre_ids: number[];
}

export interface IGetPopularMovies {
  page: number;
  results: IPopularMovie[];
  total_pages: number;
  total_results: number;
}

// get Movie
export function getPopularMovies() {
  return fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`).then((res) =>
    res.json()
  );
}
export function getTopRatedMovies() {
  return fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`).then((res) =>
    res.json()
  );
}
export function getUpcomingMovies() {
  return fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}`).then((res) =>
    res.json()
  );
}

// Search api
export function getSearchMovie(keyword: string) {
  return fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${keyword}&include_adult=false&language=en-US&page=1`
  ).then((res) => res.json());
}

export function getSearchTV(keyword: string) {
  return fetch(
    `${BASE_URL}/search/tv?api_key=${API_KEY}&query=${keyword}&include_adult=false&language=en-US&page=1`
  ).then((res) => res.json());
}

// Movie-Genre-id
export interface IGenre {
  genres: [
    {
      id: number;
      name: string;
    }
  ];
}

export function getMovieGenre() {
  return fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`).then((res) =>
    res.json()
  );
}

// tv genre id
export function getTVGenre() {
  return fetch(`${BASE_URL}/genre/tv/list?api_key=${API_KEY}`).then((res) =>
    res.json()
  );
}

// TV series
export interface ITVSeries {
  backdrop_path: string;
  poster_path: string;
  name: string;
  overview: string;
  id: number;
  vote_average: number;
  vote_count: number;
  first_air_date: string;
  genre_ids: number[];
}

export interface IGetTVSeries {
  page: number;
  results: ITVSeries[];
  total_pages: number;
  total_results: number;
}

export function getTVSeries() {
  return fetch(`${BASE_URL}/tv/airing_today?api_key=${API_KEY}`).then((res) =>
    res.json()
  );
}

export function getTVTopRated() {
  return fetch(`${BASE_URL}/tv/top_rated?api_key=${API_KEY}`).then((res) =>
    res.json()
  );
}

export function getTVPopular() {
  return fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}`).then((res) =>
    res.json()
  );
}
