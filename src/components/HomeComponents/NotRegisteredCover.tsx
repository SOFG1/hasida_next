import React from "react";
import styled from "styled-components";

const StyledCover = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: 0;
  left: -25px;
  bottom: -25px;
  right: -25px;
  z-index: 2;
  background: rgba(249, 243, 221, 0.86);
  backdrop-filter: blur(3px);
  border-radius: 11px;
  padding:0 34px;
`;

const StyledText = styled.p`
  font-weight: 600;
  font-size: 14px;
  text-align: center;
  margin-bottom: 20px;
`;

const StlyedLink = styled.p`
  font-weight: 600;
  font-size: 20px;
  color: #2A9B9F;
`;

const NotRegisteredCover = React.memo(() => {
  return (
    <StyledCover>
      <StyledText>
        To see that information you need to end your registration
      </StyledText>
      <StlyedLink>Open profile</StlyedLink>
    </StyledCover>
  );
});

export default NotRegisteredCover;
