import React from "react";
import styled from "styled-components";

const StyledWrapper = styled.div`
  margin-bottom: 17px;
`;

const StyledTitle = styled.p`
  font-weight: 600;
  font-size: 18px;
  margin-bottom: 10px;
`;

const SettingsItemComponent = React.memo(() => {
  return (
    <StyledWrapper>
      <StyledTitle>Don&apos;t show me to:</StyledTitle>
    </StyledWrapper>
  );
});

export default SettingsItemComponent;
