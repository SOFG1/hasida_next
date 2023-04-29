import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Button } from "../../UI/Button";
import { Modal } from "../../UI/Modal";
import { Radio } from "../../UI/Radio";
import { useRouter } from "next/router";

const StyledContent = styled.div`
  text-align: center;
  max-width: 342px;
`;

const StyledTitle = styled.p`
  font-weight: 700;
  font-size: 20px;
  margin-bottom: 20px;
`;

const StyledBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
`;

const StyledText = styled.p`
  font-size: 16px;
  margin-bottom: 20px;
`;


const StyledBtn = styled(Button)`
  width: 306px;
`;

interface IProps {
  show: boolean
  onClose: () => void
}

const SuggestionModal = React.memo(({show, onClose}: IProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [checked, setChecked] = useState<boolean>(true);

  const handleClick = useCallback(() => {
    router.push( checked ? "/sign-up/3" :"/home");
    onClose();
  }, [checked]);

  if (!show) return <></>;

  return (
    <Modal onClose={onClose}>
      <StyledContent>
        <StyledTitle>{t("sign-up2_suggestion")}</StyledTitle>
        <StyledText>{t("sign-up2_suggestion-text")}</StyledText>
        <StyledBox>
          <Radio
            active={checked}
            onChange={(v) => setChecked(true)}
            label={t("sign-up2_suggestion-yes") as string}
          />
          <Radio
            active={!checked}
            onChange={(v) => setChecked(false)}
            label={t("sign-up2_suggestion-no") as string}
          />
        </StyledBox>
        <StyledBtn onClick={handleClick}>
          {t("sign-up2_suggestion-next")}
        </StyledBtn>
      </StyledContent>
    </Modal>
  );
});

export default SuggestionModal;
