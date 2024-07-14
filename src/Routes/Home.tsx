import styled from "styled-components";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import {
  IGenre,
  IGetMovies,
  IGetPopularMovies,
  getMovieGenre,
  getMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from "../api";
import { imagePath } from "../utils";
import { useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faXmark,
  faArrowUpRightFromSquare,
  faPlay,
  faArrowDown,
  faChevronLeft,
  faChevronRight,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

// styled-components
const Container = styled.div``;

const Loader = styled.div`
  position: absolute;
  top: 50vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 80px;
  padding: 13px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: white;
  --_m: conic-gradient(#0000 10%, #000), linear-gradient(#000 0 0) content-box;
  -webkit-mask: var(--_m);
  mask: var(--_m);
  -webkit-mask-composite: source-out;
  mask-composite: subtract;
  animation: l3 1s infinite linear;
  @keyframes l3 {
    to {
      transform: rotate(1turn);
    }
  }
`;

const Banner = styled.div<{ $bgPhoto: string }>`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.$bgPhoto});
  background-size: cover;
  img {
    width: 300px;
    margin-bottom: 20px;
  }
`;

const Title = styled.h3`
  font-size: 60px;
  margin-bottom: 20px;
`;

const Overview = styled.span`
  font-size: 20px;
  width: 600px;
  color: rgba(299, 299, 299, 0.7);
  line-height: 1.3;
`;

const Buttons = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  button {
    display: flex;
    align-items: center;
    height: 45px;
    border: none;
    border-radius: 6px;
    font-size: 20px;
    padding: 10px 13px;
    margin-right: 15px;
    color: black;
    cursor: pointer;
    transition: all 0.3s;
    &:last-child {
      color: white;
      background-color: rgba(299, 299, 299, 0.2);
    }
    &:hover {
      opacity: 0.7;
    }
    span,
    svg {
      font-size: 25px;
      margin-left: 3px;
      margin-right: 7px;
    }
  }
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: 240px;
  position: absolute;
  top: 88vh;
  width: 100%;
`;

const Sliders = styled.div`
  position: relative;
`;

const SliderTitle = styled.h3`
  color: white;
  font-size: 25px;
  margin-left: 30px;
`;

const Slider = styled(motion.div)`
  position: absolute;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
  margin-top: 10px;
  width: 100%;
`;

const SliderBox = styled(motion.div)<{ $bgPhoto: string }>`
  height: 180px;
  background-image: url(${(props) => props.$bgPhoto});
  background-size: cover;
  background-position: center;
  &:first-child {
    transform-origin: left center;
  }
  &:last-child {
    transform-origin: right center;
  }
`;

const BoxInfo = styled(motion.div)`
  background-color: rgba(0, 0, 0, 0.4);
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  padding: 20px;
  opacity: 0;
  h3 {
    position: absolute;
    bottom: 0;
    padding-bottom: 15px;
  }
`;

const MovingIcon = styled.div`
  position: absolute;
  top: 95px;
  margin: 0 20px;
  font-size: 60px;
  cursor: pointer;
  z-index: 90;
  &:last-child {
    right: 0;
  }
`;
const MovingIcon1 = styled(MovingIcon)``;
const MovingIcon2 = styled(MovingIcon)``;

const Overlay = styled(motion.div)`
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 98;
`;

const BigTV = styled(motion.div)`
  background-color: black;
  width: 40vw;
  height: 75vh;
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 20px;
  z-index: 99;
`;

const BigTVCover = styled.div<{ $bgPhoto: string }>`
  width: 100%;
  height: 300px;
  background-image: linear-gradient(to top, black, transparent),
    url(${(props) => props.$bgPhoto});
  background-size: cover;
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  svg {
    color: ${(props) => props.theme.white.lighter};
    font-size: 20px;
    margin: 20px 25px;
    cursor: pointer;
    &:first-child {
      font-size: 25px;
    }
  }
`;

const BigTVInfo = styled.div`
  position: relative;
  margin: 0 25px;
  line-height: 1.5;
  svg {
    color: #f4d003;
    font-size: 15px;
  }
  h1 {
    position: absolute;
    top: -40px;
    font-size: 27px;
  }
  nav {
    margin-top: 10px;
    display: flex;
    align-items: center;
    span {
      margin-right: 5px;
      &:nth-child(3) {
        color: #929292;
      }
      &:last-child {
        border: 1px solid rgba(299, 299, 299, 0.3);
        border-radius: 3px;
        padding: 0.4px 4px;
        font-size: 12px;
        margin-left: 4px;
        color: #adacac;
      }
    }
  }
  div {
    display: flex;
    flex-direction: column;
    margin: 20px 0;
    button {
      border: none;
      border-radius: 5px;
      padding: 7px;
      margin-bottom: 5px;
      font-size: 15px;
      font-weight: 600;
      color: black;
      cursor: pointer;
      transition: all 0.3s;
      svg {
        color: black;
        font-size: 18px;
        margin-right: 5px;
      }
      &:last-child {
        background-color: #575656;
        color: white;
        margin: 0;
        svg {
          color: white;
        }
      }
      &:hover {
        opacity: 0.8;
      }
    }
  }
`;

const BigTVOverview = styled.span`
  font-size: 15px;
  color: ${(props) => props.theme.white.lighter};
`;

// variants
const sliderVariants = {
  hidden: (back: boolean) => ({
    x: back ? -window.innerWidth - 5 : window.innerWidth + 5,
  }),
  visible: { x: 0 },
  exit: (back: boolean) => ({
    x: back ? window.innerWidth + 5 : -window.innerWidth - 5,
  }),
};

const sliderBoxVariants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.2,
    transition: { duration: 0.3, delay: 0.3 },
  },
};

const boxInfoVariants = {
  hover: {
    opacity: 1,
    transition: { duration: 0.3, delay: 0.4 },
  },
};

// constants
const offset = 6;

function Home() {
  const { scrollY } = useScroll();

  // movie api
  const { data, isLoading } = useQuery<IGetMovies>({
    queryKey: ["movies", "nowPlaying"],
    queryFn: getMovies,
  });
  const { data: popularMovie } = useQuery<IGetPopularMovies>({
    queryKey: ["movies", "popular"],
    queryFn: getPopularMovies,
  });
  const { data: topRatedMovie } = useQuery<IGetPopularMovies>({
    queryKey: ["movies", "topRated"],
    queryFn: getTopRatedMovies,
  });
  const { data: upcomingMovie } = useQuery<IGetPopularMovies>({
    queryKey: ["movies", "upcoming"],
    queryFn: getUpcomingMovies,
  });

  // Making unique layoutId based on original movieId
  const popularMovieLayoutId = (movieId: number) => `pm${movieId}`;
  const topMovieLayoutId = (movieId: number) => `tm${movieId}`;
  const upcomingMovieLayoutId = (movieId: number) => `um${movieId}`;

  const popularMovieWithLayoutId = popularMovie?.results.map((movie) => ({
    ...movie,
    newLayoutId: popularMovieLayoutId(movie.id),
  }));
  const topMovieWithLayoutId = topRatedMovie?.results.map((movie) => ({
    ...movie,
    newLayoutId: topMovieLayoutId(movie.id),
  }));
  const upcomingMovieWithLayoutId = upcomingMovie?.results.map((movie) => ({
    ...movie,
    newLayoutId: upcomingMovieLayoutId(movie.id),
  }));

  // movie genre api
  const { data: movieGenre } = useQuery<IGenre>({
    queryKey: ["Movie", "Genre"],
    queryFn: getMovieGenre,
  });

  // genre id > genre name
  const clickedMovieGenre = (clickedId: number) => {
    return movieGenre?.genres.find((movie) => movie.id === clickedId)?.name;
  };

  // slider index -- useState
  const [sliderIndex, setSliderIndex] = useState(0);
  const [sliderIndex1, setSliderIndex1] = useState(0);
  const [sliderIndex2, setSliderIndex2] = useState(0);
  const [isSliderLeaving, setSliderLeaving] = useState(false);
  const [isSliderLeaving1, setSliderLeaving1] = useState(false);
  const [isSliderLeaving2, setSliderLeaving2] = useState(false);

  const handleUpIndex = () => {
    if (popularMovie) {
      if (isSliderLeaving) return;
      toggleLeaving();
      setBack(false);
      const totalTV = popularMovie.results.length;
      const maxIndex = Math.floor(totalTV / offset) - 1;
      setSliderIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const handleUpIndex1 = () => {
    if (topRatedMovie) {
      if (isSliderLeaving1) return;
      toggleLeaving1();
      setBack1(false);
      const totalTV = topRatedMovie.results.length;
      const maxIndex = Math.floor(totalTV / offset) - 1;
      setSliderIndex1((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const handleUpIndex2 = () => {
    if (upcomingMovie) {
      if (isSliderLeaving2) return;
      toggleLeaving2();
      setBack2(false);
      const totalTV = upcomingMovie.results.length;
      const maxIndex = Math.floor(totalTV / offset) - 1;
      setSliderIndex2((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };

  // 뒤로가기 버튼
  const [back, setBack] = useState(false);
  const [back1, setBack1] = useState(false);
  const [back2, setBack2] = useState(false);
  const handleDownIndex = () => {
    if (popularMovie) {
      if (isSliderLeaving) return;
      toggleLeaving();
      setBack(true);
      const totalTV = popularMovie.results.length;
      const maxIndex = Math.floor(totalTV / offset) - 1;
      setSliderIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };
  const handleDownIndex1 = () => {
    if (topRatedMovie) {
      if (isSliderLeaving1) return;
      toggleLeaving1();
      setBack1(true);
      const totalTV = topRatedMovie.results.length;
      const maxIndex = Math.floor(totalTV / offset) - 1;
      setSliderIndex1((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };
  const handleDownIndex2 = () => {
    if (upcomingMovie) {
      if (isSliderLeaving2) return;
      toggleLeaving2();
      setBack2(true);
      const totalTV = upcomingMovie.results.length;
      const maxIndex = Math.floor(totalTV / offset) - 1;
      setSliderIndex2((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };

  // toggleLeaving
  const toggleLeaving = () => setSliderLeaving((prev) => !prev);
  const toggleLeaving1 = () => setSliderLeaving1((prev) => !prev);
  const toggleLeaving2 = () => setSliderLeaving2((prev) => !prev);

  const movieMatch = useMatch("/movies/:movieId");
  const navigate = useNavigate(); // useHistory > useNavigate (v6)

  const handleOverlayClicked = () => navigate(-1);

  const handleClickedMovie = (movieId: string) => {
    navigate(`/movies/${movieId}`);
  };

  const clickedPopularMovies =
    movieMatch?.params.movieId &&
    popularMovieWithLayoutId?.find(
      (movie) => movie.newLayoutId === movieMatch.params.movieId
    );

  const clickedTopRatedMovies =
    movieMatch?.params.movieId &&
    topMovieWithLayoutId?.find(
      (movie) => movie.newLayoutId === movieMatch.params.movieId
    );

  const clickedUpcomingMovies =
    movieMatch?.params.movieId &&
    upcomingMovieWithLayoutId?.find(
      (movie) => movie.newLayoutId === movieMatch.params.movieId
    );

  return (
    <Container>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Banner $bgPhoto={imagePath(data?.results[0].backdrop_path || "")}>
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
            <Buttons>
              <button>
                <span>▶︎</span> Play
              </button>
              <button>
                <FontAwesomeIcon icon={faPlus} /> My List
              </button>
            </Buttons>
          </Banner>
          <Main>
            <Sliders>
              <SliderTitle>Popular on FLiFLIX</SliderTitle>
              <AnimatePresence
                custom={back}
                initial={false}
                onExitComplete={toggleLeaving}
              >
                <MovingIcon>
                  <FontAwesomeIcon
                    icon={faChevronLeft}
                    onClick={handleDownIndex}
                  />
                </MovingIcon>
                <Slider
                  custom={back}
                  variants={sliderVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ type: "tween", duration: 1 }}
                  key={sliderIndex}
                >
                  {popularMovieWithLayoutId
                    ?.slice(1)
                    .slice(offset * sliderIndex, offset * sliderIndex + offset)
                    .map((movie) => (
                      <SliderBox
                        $bgPhoto={imagePath(
                          movie.backdrop_path || movie.poster_path
                        )}
                        key={movie.id}
                        variants={sliderBoxVariants}
                        initial="initial"
                        whileHover="hover"
                        transition={{ type: "tween" }}
                        onClick={() => handleClickedMovie(movie.newLayoutId)}
                        layoutId={movie.newLayoutId}
                      >
                        <BoxInfo variants={boxInfoVariants}>
                          <h3>{movie.title}</h3>
                        </BoxInfo>
                      </SliderBox>
                    ))}
                </Slider>
                <MovingIcon>
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    onClick={handleUpIndex}
                  />
                </MovingIcon>
              </AnimatePresence>
            </Sliders>
            <Sliders>
              <SliderTitle>Top Rated</SliderTitle>
              <AnimatePresence
                custom={back1}
                initial={false}
                onExitComplete={toggleLeaving1}
              >
                <MovingIcon1>
                  <FontAwesomeIcon
                    icon={faChevronLeft}
                    onClick={handleDownIndex1}
                  />
                </MovingIcon1>
                <Slider
                  custom={back1}
                  key={sliderIndex1}
                  variants={sliderVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ type: "tween", duration: 1 }}
                >
                  {topMovieWithLayoutId
                    ?.slice(
                      offset * sliderIndex1,
                      offset * sliderIndex1 + offset
                    )
                    .map((movie) => (
                      <SliderBox
                        $bgPhoto={imagePath(movie.backdrop_path)}
                        key={movie.id}
                        variants={sliderBoxVariants}
                        initial="initial"
                        whileHover="hover"
                        transition={{ type: "tween" }}
                        onClick={() => handleClickedMovie(movie.newLayoutId)}
                        layoutId={movie.newLayoutId}
                      >
                        <BoxInfo variants={boxInfoVariants}>
                          <h3>{movie.title}</h3>
                        </BoxInfo>
                      </SliderBox>
                    ))}
                </Slider>
                <MovingIcon1>
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    onClick={handleUpIndex1}
                  />
                </MovingIcon1>
              </AnimatePresence>
            </Sliders>
            <Sliders>
              <SliderTitle>Upcoming</SliderTitle>
              <AnimatePresence
                custom={back2}
                initial={false}
                onExitComplete={toggleLeaving2}
              >
                <MovingIcon2>
                  <FontAwesomeIcon
                    icon={faChevronLeft}
                    onClick={handleDownIndex2}
                  />
                </MovingIcon2>
                <Slider
                  custom={back2}
                  key={sliderIndex2}
                  variants={sliderVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ type: "tween", duration: 1 }}
                >
                  {upcomingMovieWithLayoutId
                    ?.slice(
                      offset * sliderIndex2,
                      offset * sliderIndex2 + offset
                    )
                    .map((movie) => (
                      <SliderBox
                        $bgPhoto={imagePath(movie.backdrop_path)}
                        key={movie.id}
                        variants={sliderBoxVariants}
                        initial="initial"
                        whileHover="hover"
                        transition={{ type: "tween" }}
                        onClick={() => handleClickedMovie(movie.newLayoutId)}
                        layoutId={movie.newLayoutId}
                      >
                        <BoxInfo variants={boxInfoVariants}>
                          <h3>{movie.title}</h3>
                        </BoxInfo>
                      </SliderBox>
                    ))}
                </Slider>
                <MovingIcon2>
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    onClick={handleUpIndex2}
                  />
                </MovingIcon2>
              </AnimatePresence>
            </Sliders>
          </Main>
          <AnimatePresence>
            {movieMatch && clickedPopularMovies ? (
              <>
                <Overlay
                  onClick={handleOverlayClicked}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
                <BigTV
                  style={{ top: scrollY.get() + 100 }}
                  layoutId={movieMatch.params.movieId}
                >
                  {clickedPopularMovies ? (
                    <>
                      <BigTVCover
                        $bgPhoto={imagePath(
                          clickedPopularMovies.backdrop_path ||
                            clickedPopularMovies.poster_path
                        )}
                      >
                        <FontAwesomeIcon icon={faXmark} />
                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                      </BigTVCover>
                      <BigTVInfo>
                        <h1>{clickedPopularMovies.title}</h1>
                        <nav>
                          <span>
                            <FontAwesomeIcon icon={faStar} />
                          </span>
                          <span>
                            {clickedPopularMovies.vote_average.toFixed(1)}
                          </span>
                          <span>({clickedPopularMovies.vote_count})</span>
                          <span>
                            {clickedPopularMovies.release_date.split("-")[0]}
                          </span>
                          <span>
                            {clickedMovieGenre(
                              clickedPopularMovies.genre_ids[0]
                            )}
                          </span>
                        </nav>
                        <div>
                          <button>
                            <FontAwesomeIcon icon={faPlay} /> Play
                          </button>
                          <button>
                            <FontAwesomeIcon icon={faArrowDown} /> Download
                          </button>
                        </div>
                        <BigTVOverview>
                          {clickedPopularMovies.overview
                            ? clickedPopularMovies.overview.length > 300
                              ? clickedPopularMovies.overview.slice(1, 300) +
                                "..."
                              : clickedPopularMovies.overview
                            : "No overview"}
                        </BigTVOverview>
                      </BigTVInfo>
                    </>
                  ) : null}
                </BigTV>
              </>
            ) : null}
          </AnimatePresence>
          <AnimatePresence>
            {movieMatch && clickedTopRatedMovies ? (
              <>
                <Overlay
                  onClick={handleOverlayClicked}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
                <BigTV
                  style={{ top: scrollY.get() + 100 }}
                  layoutId={movieMatch.params.movieId}
                >
                  {clickedTopRatedMovies ? (
                    <>
                      <BigTVCover
                        $bgPhoto={imagePath(
                          clickedTopRatedMovies.backdrop_path ||
                            clickedTopRatedMovies.poster_path
                        )}
                      >
                        <FontAwesomeIcon icon={faXmark} />
                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                      </BigTVCover>
                      <BigTVInfo>
                        <h1>{clickedTopRatedMovies.title}</h1>
                        <nav>
                          <span>
                            <FontAwesomeIcon icon={faStar} />
                          </span>
                          <span>
                            {clickedTopRatedMovies.vote_average.toFixed(1)}
                          </span>
                          <span>({clickedTopRatedMovies.vote_count})</span>
                          <span>
                            {clickedTopRatedMovies.release_date.split("-")[0]}
                          </span>
                          <span>
                            {clickedMovieGenre(
                              clickedTopRatedMovies.genre_ids[0]
                            )}
                          </span>
                        </nav>
                        <div>
                          <button>
                            <FontAwesomeIcon icon={faPlay} /> Play
                          </button>
                          <button>
                            <FontAwesomeIcon icon={faArrowDown} /> Download
                          </button>
                        </div>
                        <BigTVOverview>
                          {clickedTopRatedMovies.overview
                            ? clickedTopRatedMovies.overview.length > 300
                              ? clickedTopRatedMovies.overview.slice(1, 300) +
                                "..."
                              : clickedTopRatedMovies.overview
                            : "No overview"}
                        </BigTVOverview>
                      </BigTVInfo>
                    </>
                  ) : null}
                </BigTV>
              </>
            ) : null}
          </AnimatePresence>
          <AnimatePresence>
            {movieMatch && clickedUpcomingMovies ? (
              <>
                <Overlay
                  onClick={handleOverlayClicked}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
                <BigTV
                  style={{ top: scrollY.get() + 100 }}
                  layoutId={movieMatch.params.movieId}
                >
                  {clickedUpcomingMovies ? (
                    <>
                      <BigTVCover
                        $bgPhoto={imagePath(
                          clickedUpcomingMovies.backdrop_path ||
                            clickedUpcomingMovies.poster_path
                        )}
                      >
                        <FontAwesomeIcon icon={faXmark} />
                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                      </BigTVCover>
                      <BigTVInfo>
                        <h1>{clickedUpcomingMovies.title}</h1>
                        <nav>
                          <span>
                            <FontAwesomeIcon icon={faStar} />
                          </span>
                          <span>
                            {clickedUpcomingMovies.vote_average.toFixed(1)}
                          </span>
                          <span>({clickedUpcomingMovies.vote_count})</span>
                          <span>
                            {clickedUpcomingMovies.release_date.split("-")[0]}
                          </span>
                          <span>
                            {clickedMovieGenre(
                              clickedUpcomingMovies.genre_ids[0]
                            )}
                          </span>
                        </nav>
                        <div>
                          <button>
                            <FontAwesomeIcon icon={faPlay} /> Play
                          </button>
                          <button>
                            <FontAwesomeIcon icon={faArrowDown} /> Download
                          </button>
                        </div>
                        <BigTVOverview>
                          {clickedUpcomingMovies.overview
                            ? clickedUpcomingMovies.overview.length > 300
                              ? clickedUpcomingMovies.overview.slice(1, 300) +
                                "..."
                              : clickedUpcomingMovies.overview
                            : "No overview"}
                        </BigTVOverview>
                      </BigTVInfo>
                    </>
                  ) : null}
                </BigTV>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Container>
  );
}

export default Home;
