import React from "react";
import styled, { keyframes } from "styled-components";
import loaderImg from "../../../public/images/loader.png";
import Image from "next/image";

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const animation = keyframes`
    from {
        transform: rotate(0);
    }
    from {
        transform: rotate(360deg);
    }
`;

const StyledImg = styled(Image)`
  height: 295px;
  width: 295px;
  object-fit: contain;
  object-position: bottom center;
  animation: ${animation} 900ms infinite linear;
`;

interface IProps {
  className?: string;
}

const Loader = React.memo(({ className }: IProps) => {
  return (
    <StyledWrapper className={className}>
      <StyledImg alt="Loader" height={295} width={295} src={loaderImg} />
    </StyledWrapper>
  );
});

export default Loader;
