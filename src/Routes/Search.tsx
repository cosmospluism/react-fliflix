import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { IGetPopularMovies, getSearchMovie, getSearchTV } from "../api";
import { useQuery } from "@tanstack/react-query";
import { imagePath } from "../utils";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import NoSearchResult from "./NoSearchResult";

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

const Title = styled.h1`
  font-size: 50px;
  margin-top: 130px;
  margin-left: 60px;
  margin-bottom: 100px;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  gap: 400px;
`;

const Sliders = styled.div`
  position: relative;
`;

const SliderTitle = styled.h3`
  font-size: 25px;
  padding: 20px 50px;
  background-color: rgba(299, 299, 299, 0.15);
  color: #adacac;
  margin-bottom: 20px;
`;

const Slider = styled(motion.div)`
  position: absolute;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  width: 100%;
`;

const Box = styled(motion.div)<{ $bgPhoto: string }>`
  height: 350px;
  background-image: url(${(props) => props.$bgPhoto});
  background-size: cover;
  background-position: center;
  border-radius: 5px;
`;

const MovingIcon = styled.div`
  position: absolute;
  top: 250px;
  margin: 0 20px;
  font-size: 60px;
  cursor: pointer;
  z-index: 99;
  &:last-child {
    right: 0;
  }
`;
const MovingIcon1 = styled(MovingIcon)``;

const offset = 6;

// Variants
const sliderVariants = {
  initial: (back: boolean) => ({
    x: back ? -window.innerWidth - 10 : window.innerWidth + 10,
  }),
  animate: { x: 0 },
  exit: (back: boolean) => ({
    x: back ? window.innerWidth + 10 : -window.innerWidth - 10,
  }),
};

function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");

  const { data, isLoading } = useQuery<IGetPopularMovies>({
    queryKey: ["search", "Movie", keyword],
    queryFn: () => getSearchMovie(keyword || ""),
  });

  const { data: searchTV, isLoading: searchTVLoading } =
    useQuery<IGetPopularMovies>({
      queryKey: ["search", "TV", keyword],
      queryFn: () => getSearchTV(keyword || ""),
    });

  const [sliderIndex, setSliderIndex] = useState(0);
  const [sliderIndex1, setSliderIndex1] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [leaving1, setLeaving1] = useState(false);

  const handleUpIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovie = Math.floor(data.results.length / offset);
      const indexMax = totalMovie - 1;
      setSliderIndex((prev) => (prev === indexMax ? 0 : prev + 1));
    }
  };
  const handleUpIndex1 = () => {
    if (searchTV) {
      if (leaving1) return;
      toggleLeaving1();
      const totalMovie = Math.floor(searchTV.results.length / offset);
      const indexMax = totalMovie - 1;
      setSliderIndex1((prev) => (prev === indexMax ? 0 : prev + 1));
    }
  };

  // 뒤로가기 버튼
  const [back, setBack] = useState(false);
  const [back1, setBack1] = useState(false);
  const handleDownIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      setBack(true);
      const totalTV = data.results.length - 1;
      const maxIndex = Math.floor(totalTV / offset) - 1;
      setSliderIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };
  const handleDownIndex1 = () => {
    if (searchTV) {
      if (leaving1) return;
      toggleLeaving1();
      setBack1(true);
      const totalTV = searchTV.results.length - 1;
      const maxIndex = Math.floor(totalTV / offset) - 1;
      setSliderIndex1((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };

  const toggleLeaving = () => setLeaving((prev) => !prev);
  const toggleLeaving1 = () => setLeaving1((prev) => !prev);

  return (
    <Container>
      {isLoading ? (
        <Loader />
      ) : data?.results.length === 0 && searchTV?.results.length === 0 ? (
        <NoSearchResult />
      ) : (
        <>
          <Title>Search Results : {keyword}</Title>
          <Main>
            <Sliders>
              <SliderTitle>Movie</SliderTitle>
              {isLoading ? null : (
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
                    key={sliderIndex}
                    variants={sliderVariants}
                    initial="initial"
                    animate="animate"
                    transition={{ duration: 0.7, type: "tween" }}
                    exit="exit"
                  >
                    {data?.results
                      .slice(
                        sliderIndex * offset,
                        sliderIndex * offset + offset
                      )
                      .map((movie) => (
                        <Box
                          key={movie.id}
                          $bgPhoto={imagePath(movie.poster_path || "")}
                        />
                      ))}
                  </Slider>
                  <MovingIcon>
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      onClick={handleUpIndex}
                    />
                  </MovingIcon>
                </AnimatePresence>
              )}
            </Sliders>
            <Sliders>
              <SliderTitle>TV</SliderTitle>
              {searchTVLoading ? null : (
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
                    initial="initial"
                    animate="animate"
                    transition={{ duration: 0.7, type: "tween" }}
                    exit="exit"
                  >
                    {searchTV?.results
                      .slice(
                        sliderIndex1 * offset,
                        sliderIndex1 * offset + offset
                      )
                      .map((movie) => (
                        <Box
                          key={movie.id}
                          $bgPhoto={imagePath(movie.poster_path || "")}
                        />
                      ))}
                  </Slider>
                  <MovingIcon1>
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      onClick={handleUpIndex1}
                    />
                  </MovingIcon1>
                </AnimatePresence>
              )}
            </Sliders>
          </Main>
        </>
      )}
    </Container>
  );
}

export default Search;
