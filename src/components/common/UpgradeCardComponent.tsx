import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Button } from "../../UI/Button";
import { ITariff } from "../../api/settings";

const StyledCard = styled.div<{ sm?: boolean }>`
  padding: 42px 17px 41px;
  background: #f9f3dd;
  border-radius: 16px;
  flex-grow: 1;
  max-width: 313px;
  ${({ sm }) =>
    sm &&
    `
    background: rgba(249, 243, 221, 0.48);
  padding: 29px 14px 28px;
  max-width: 258px;
  `}
  @media screen and (max-width: 720px) {
    padding: 17px 13px;
    background: #f9f3dd;
  }
`;

const StyledTitle = styled.p<{ sm?: boolean }>`
  text-align: center;
  font-weight: 600;
  font-size: 30px;
  color: #2a9b9f;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(243, 98, 115, 0.18);
  margin-bottom: 12px;
  ${({ sm }) =>
    sm &&
    `
  font-size: 20px;
  `}
  @media screen and (max-width: 720px) {
    font-size: 20px;
  }
`;

const StyledBox = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 200px;
  padding: 0 15px;
`;

const StyledItem = styled.div`
  display: flex;
  gap: 50px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 11px;

  svg path {
    stroke-width: 2px;
  }
  @media screen and (max-width: 720px) {
    gap: 10px;
  }
`;

const StyledText = styled.p`
  font-weight: 300;
  font-size: 14px;
  margin-bottom: 20px;
`;

const StyledPrice = styled.p`
  margin-bottom: 20px;
  span {
    font-weight: 700;
  }
`;

const StyledMinus = styled.span`
  height: 2px;
  width: 15px;
  border-radius: 2px;
  background-color: rgba(243, 98, 115, 0.42);
`;

const StyledBtn = styled(Button)`
  width: 100%;
  padding: 6px;
  margin-top: auto;
`;

interface IProps {
  tariff: ITariff;
  isLoading?: boolean
  onPay?: () => void
  isSmall?: boolean;
  className?: string;
}

const UpgradeCardComponent = React.memo(
  ({ tariff, isSmall, isLoading, onPay, className }: IProps) => {
    const { t } = useTranslation();

    return (
      <StyledCard className={className} sm={isSmall}>
        <StyledTitle sm={isSmall}>{tariff.name}</StyledTitle>
        <StyledBox>
          <StyledText>{tariff.description}</StyledText>
          <StyledPrice>
            Price: <span>{tariff.amount}</span>
          </StyledPrice>
          <StyledBtn
            disabled={!onPay}
            onClick={onPay}
          >
            {t("upgrade_upgrade-btn")}
          </StyledBtn>
        </StyledBox>
      </StyledCard>
    );
  }
);

export default UpgradeCardComponent;
