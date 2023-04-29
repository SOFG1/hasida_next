import React from "react";
import styled from "styled-components";
import { Button } from "../../UI/Button";
import { useTranslation } from "react-i18next";

const StyledWrapper = styled.div`
  margin-top: 68px;
  text-align: center;
`;

const StyledTitle = styled.p`
  font-weight: 700;
  font-size: 20px;
  margin-bottom: 26px;
`;

const StyledText = styled.p`
  margin-bottom: 26px;
`;

const StyledBtn = styled(Button)`
  width: 306px;
`;

interface IProps {
    onClick: () => void
}

const NoItemsComponent = React.memo(({onClick}: IProps) => {
    const {t} = useTranslation()

  return (
    <StyledWrapper>
      <StyledTitle>{t("home_no-items-title")}</StyledTitle>
      <StyledText>{t("home_no-items-text")}</StyledText>
      <StyledBtn onClick={onClick}>{t("home_no-items-btn")}</StyledBtn>
    </StyledWrapper>
  );
});

export default NoItemsComponent;
