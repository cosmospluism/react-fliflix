import styled from "styled-components";
import {
  motion,
  useAnimation,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { Link, useMatch, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faXmark } from "@fortawesome/free-solid-svg-icons";
import profileImg from "../img/profile.webp";

const Nav = styled(motion.nav)`
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px 40px;
  box-sizing: border-box;
`;

const Box = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled(motion.svg)`
  width: 100px;
  height: 30px;
  margin-right: 30px;
  fill: ${(props) => props.theme.red};
  /* path {
    stroke: white;
    stroke-width: 6px;
  } */
`;

const Items = styled.ul`
  display: flex;
  align-items: center;
`;

const Item = styled.li`
  position: relative;
  color: ${(props) => props.theme.white.darker};
  margin-right: 25px;
  transition: all 0.3s;
  &:hover {
    color: ${(props) => props.theme.white.lighter};
  }
`;

const Circle = styled(motion.span)`
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  bottom: -10px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.red};
`;

const Search = styled.form`
  position: relative;
  display: flex;
  align-items: center;
  color: white;
  gap: 25px;
  cursor: pointer;
  svg {
    fill: white;
    height: 23px;
  }
`;

const SearchBox = styled(motion.div)`
  display: flex;
  align-items: center;
`;

const SearchIcon = styled(motion.svg)`
  position: absolute;
  z-index: 99;
  left: -12px;
`;

const Input = styled(motion.input)`
  position: absolute;
  width: 160px;
  right: 110px;
  transform-origin: right center;
  color: white;
  padding: 10px;
  outline: none;
  font-size: 18px;
  background-color: rgba(0, 0, 0, 0.4);
  border: 0.6px solid white;
  width: 200px;
  text-indent: 40px;
  z-index: 90;
`;

const CloseBtn = styled(motion.div)`
  position: absolute;
  z-index: 90;
  left: -14px;
  opacity: 0;
`;

const BellIcon = styled.div`
  margin-left: 6px;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  img {
    width: 27px;
  }
`;

// motion
const logoVariants = {
  initial: { fillOpacity: 1 },
  active: { fillOpacity: [0, 1, 0], transition: { repeat: Infinity } },
};

const scrollVariants = {
  top: { backgroundColor: "rgba(0, 0, 0, 0)" },
  scroll: { backgroundColor: "rgba(0, 0, 0, 1)" },
};

// interface
interface IForm {
  keyword: string;
}

function Header() {
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const [searchOpen, setSearchOpen] = useState(false);
  const homeMatch = useMatch("/");
  const tvMatch = useMatch("/tv");
  const inputAnimation = useAnimation();
  const scrollAnimation = useAnimation();
  const closeBtnAnimation = useAnimation();

  const handleSearchOpen = () => {
    inputAnimation.start({ scaleX: 1 });
    closeBtnAnimation.start({ opacity: 1 });
    setSearchOpen(true);
  };

  const handleSearchClose = () => {
    inputAnimation.start({ scaleX: 0 });
    closeBtnAnimation.start({ opacity: 0 });
    setSearchOpen(false);
  };

  // const toggleSearch = () => {
  //   if (searchOpen) {
  //     inputAnimation.start({ scaleX: 0 });
  //   } else {
  //     inputAnimation.start({ scaleX: 1 });
  //   }
  //   setSearchOpen((prev) => !prev);
  // };

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", () => {
    if (scrollY.get() > 100) {
      scrollAnimation.start("scroll");
    } else {
      scrollAnimation.start("top");
    }
  });

  const handleSubmitKeyword = (data: IForm) => {
    setValue("keyword", "");
    navigate(`/search?keyword=${data.keyword}`);
  };

  return (
    <Nav
      // onClick={searchOpen ? handleSearchClose : undefined}
      variants={scrollVariants}
      initial="top"
      animate={scrollAnimation}
    >
      <Box>
        <Logo
          variants={logoVariants}
          initial="initial"
          whileHover="active"
          xmlns="https://www.w3.org/2000/svg"
          width="1024"
          height="276.742"
          viewBox="0 0 1024 276.742"
        >
          <motion.path
            xmlns="http://www.w3.org/2000/svg"
            d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z"
          />
        </Logo>
        <Items>
          <Item>
            <Link to="/">Home {homeMatch && <Circle layoutId="circle" />}</Link>
          </Item>
          <Item>
            <Link to="/tv">
              TV Shows {tvMatch && <Circle layoutId="circle" />}
            </Link>
          </Item>
          <Item>Movies</Item>
          <Item>New & Popular</Item>
          <Item>My List</Item>
        </Items>
      </Box>
      <Box>
        <Search onSubmit={handleSubmit(handleSubmitKeyword)}>
          <SearchBox>
            <SearchIcon
              onClick={handleSearchOpen}
              animate={{ x: searchOpen ? -185 : 0 }}
              transition={{ type: "linear" }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
            </SearchIcon>
            <Input
              {...register("keyword", { required: true, minLength: 2 })}
              initial={{ scaleX: 0 }}
              animate={inputAnimation}
              transition={{ type: "linear" }}
            />
            <CloseBtn
              onClick={handleSearchClose}
              animate={closeBtnAnimation}
              transition={{ type: "linear" }}
            >
              <FontAwesomeIcon icon={faXmark} />
            </CloseBtn>
          </SearchBox>
          <BellIcon>
            <FontAwesomeIcon icon={faBell} />
          </BellIcon>
          <Profile>
            <img src={profileImg} />
            <h5>▾</h5>
          </Profile>
        </Search>
      </Box>
    </Nav>
  );
}

export default Header;
