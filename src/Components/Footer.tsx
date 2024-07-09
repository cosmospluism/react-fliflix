import styled from "styled-components";

const Wrapper = styled.div`
  color: rgba(299, 299, 299, 0.5);
  text-align: center;
  width: 100%;
  padding: 30px 20px;
  position: absolute;
  bottom: 0;
`;

function Footer() {
  return (
    <Wrapper>
      <span>© 2024. FLiFLIX. All rights reserved.</span>
    </Wrapper>
  );
}

export default Footer;
