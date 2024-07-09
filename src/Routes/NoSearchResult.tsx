import styled from "styled-components";
import noResultImg from "../img/no_found.png";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
`;

const NoResult = styled.div`
  position: relative;
  top: 250px;
  left: 0;
  right: 0;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    font-size: 40px;
    color: #919090;
    margin-top: 30px;
  }
  img {
    width: 250px;
    opacity: 0.7;
  }
`;

function NoSearchResult() {
  return (
    <Container>
      <NoResult>
        <img src={noResultImg} alt="No_results" />
        <h1>No Result Found</h1>
      </NoResult>
    </Container>
  );
}

export default NoSearchResult;
