import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Modal } from "../../UI/Modal";
import { Input } from "../../UI/Input";
import { Button } from "../../UI/Button";
import { useUserRecoverPassMutation } from "../../api/user";
import { useDispatch } from "react-redux";
import { setAlert } from "../../store/app";

const StyledModal = styled(Modal)`
  text-align: center;
`;

const StyledTitle = styled.h2`
  font-weight: 700;
  text-align: center;
  font-size: 20px;
  margin-bottom: 25px;
`;

const StyledText = styled.p`
  font-weight: 400;
  font-size: 16px;
  text-align: center;
  margin-bottom: 25px;
`;

interface IProps {
  onClose: () => void;
}

const PassRestoreView = React.memo(({ onClose }: IProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [handleRecover, { data, isLoading }] = useUserRecoverPassMutation();
  const [email, setEmail] = useState<string>("");

  const handleRecovery = useCallback(() => {
    handleRecover(email)
      .unwrap()
      .then(() => {
        dispatch(setAlert({ isError: false, text: t("forgot-pass_success") }));
      })
      .catch(() => {
        dispatch(setAlert({ isError: true, text: t("forgot-pass_error") }));
      })
      .finally(() => onClose());
  }, [email]);

  return (
    <StyledModal onClose={onClose}>
      <StyledTitle>{t("forgot-pass_title")}</StyledTitle>
      <StyledText>{t("forgot-pass_text")}</StyledText>
      <Input
        label={t("field-email")}
        type="email"
        value={email}
        onChange={setEmail}
      />
      <Button disabled={isLoading} onClick={handleRecovery}>
        {t("forgot-pass_btn")}
      </Button>
    </StyledModal>
  );
});

export default PassRestoreView;
