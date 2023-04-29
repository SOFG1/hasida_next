import React from "react";
import { Modal } from "../../UI/Modal";
import styled from "styled-components";
import { ChatIcon } from "../../UI/SVG";
import { useTranslation } from "react-i18next";

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 370px;
`;

const StyledTitle = styled.p`
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 0.01em;
  color: #303d45;
  margin-bottom: 25px;
`;

const StyledText = styled.p`
  margin-bottom: 25px;
`;

const StyledBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 13px;
  font-weight: 600;
  font-size: 20px;
  color: #2a9b9f;
  cursor: pointer;
  padding: 0;
  border: 0;
  background-color: transparent;
  margin-bottom: 11px;
  svg {
    height: 19px;
    width: 19px;
  }
  svg path {
    stroke: #2a9b9f;
  }
`;

const StyledContinue = styled.p`
  font-weight: 600;
  font-size: 18px;
  letter-spacing: 0.01em;
  cursor: pointer;
`;

interface IProps {
  show: boolean;
  onClose: () => void;
}

const LikeMatchComponent = React.memo(({ show, onClose }: IProps) => {
  const { t } = useTranslation();
  if (!show) return null;
  return (
    <Modal onClose={onClose}>
      <StyledContent>
        <StyledTitle>{t("like-match_title")}</StyledTitle>
        <StyledText>{t("like-match_text")}</StyledText>
        <StyledBtn>
          <ChatIcon /> {t("like-match_btn")}
        </StyledBtn>
        <StyledContinue onClick={() => onClose()}>
          {t("like-match_continue")}
        </StyledContinue>
      </StyledContent>
    </Modal>
  );
});

export default LikeMatchComponent;
