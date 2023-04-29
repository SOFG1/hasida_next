import styled, { keyframes } from "styled-components";

const animation = keyframes`
    from {
        transform: rotate(0);
    }
    from {
        transform: rotate(360deg);
    }
`;

const StyledLoader = styled.div`
  height: 60px;
  width: 60px;
  border-radius: 50%;
  border-left: 2px solid #000;
  animation: ${animation} 900ms infinite linear reverse;
  margin: 0 auto;
`;

export default StyledLoader