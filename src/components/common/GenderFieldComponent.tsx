import React, { useCallback, useMemo, useState } from "react";
import { Dropdown, DropdownValueType } from "../../UI/Dropdown";
import { useTranslation } from "react-i18next";
import { Modal } from "../../UI/Modal";
import { Button } from "../../UI/Button";
import styled from "styled-components";

const StyledText = styled.p`
  max-width: 500px;
  margin-bottom: 20px;
`;

const StyledBtn = styled(Button)`
  width: 100%;
`;

interface IProps {
  value: any;
  onChange: (v: DropdownValueType) => void;
  label: string;
  options: string[];
  hint: string;
}

const GenderFieldComponent = React.memo(
  ({ label, value, onChange, options, hint }: IProps) => {
    const { t } = useTranslation();
    const [genderHintShowed, setGenderHintShowed] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);

    const optionsList = useMemo(() => {
      return options.map((o) => ({ label: o, value: o }));
    }, [options]);

    const handleDropdownClick = useCallback(() => {
      //Show hint only on first open
      if (!genderHintShowed) {
        setGenderHintShowed(true);
        setShowModal(true);
      }
    }, [genderHintShowed]);

    return (
      <>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <StyledText>{hint}</StyledText>
            <StyledBtn onClick={() => setShowModal(false)}>
              {t("field-gender_hint-ok")}
            </StyledBtn>
          </Modal>
        )}
        <Dropdown
          label={label}
          value={value}
          onChange={onChange}
          options={optionsList}
          onClick={handleDropdownClick}
        />
      </>
    );
  }
);

export default GenderFieldComponent;
