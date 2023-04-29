import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 3px;
  padding: 5px 2px;
`;

const StyledStep = styled.p<{ isActive: boolean }>`
  font-weight: 600;
  color: rgba(48, 61, 69, 0.28);
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  ${({ isActive }) => isActive && "color: #303D45;"}
`;

const StyledSeparator = styled.span`
  width: 26px;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.25);
`;

interface IProps {
  activeStep: "1" | "2" | "3";
}

const SignUpSteps = React.memo(({ activeStep }: IProps) => {
  const { t } = useTranslation();
  return (
    <Wrapper>
      <StyledStep isActive={activeStep === "1"}>
        {t("sign-up_step1")}
      </StyledStep>
      <StyledSeparator></StyledSeparator>
      <StyledStep isActive={activeStep === "2"}>
        {t("sign-up_step2")}
      </StyledStep>
      <StyledSeparator></StyledSeparator>
      <StyledStep isActive={activeStep === "3"}>
        {t("sign-up_step3")}
      </StyledStep>
    </Wrapper>
  );
});

export default SignUpSteps;
