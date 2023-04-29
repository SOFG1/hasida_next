import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { Modal } from "../../UI/Modal";
import { useTranslation } from "react-i18next";
import { Radio } from "../../UI/Radio";
import { Button } from "../../UI/Button";

const StyledText = styled.p`
  max-width: 500px;
  text-align: center;
  margin-bottom: 15px;
`;

const StyledBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
`;

const StyledButton = styled(Button)`
  width: 100%;
`;

interface IProps {
  show: boolean;
  onClose: () => void;
  onAgree: () => void;
}

const Step1Warning = React.memo(({ show, onClose, onAgree }: IProps) => {
  const { t } = useTranslation();
  const [checked, setChecked] = useState<boolean>(false);

  const handleClick = useCallback(() => {
    if (checked) onAgree();
    if (!checked) onClose();
  }, [checked]);

  if (!show) return null;

  return (
    <Modal onClose={onClose}>
      <StyledText>{t("sign-up_warning")}</StyledText>
      <StyledBox>
        <Radio
          active={checked === true}
          onChange={(v) => setChecked(true)}
          label={t("field-yes")}
        />
        <Radio
          active={checked === false}
          onChange={(v) => setChecked(false)}
          label={t("field-no")}
        />
      </StyledBox>
      <StyledButton onClick={handleClick}>
        {t("sign-up_warning-submit")}
      </StyledButton>
    </Modal>
  );
});

export default Step1Warning;
