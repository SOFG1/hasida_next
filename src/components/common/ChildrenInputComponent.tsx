import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { Radio } from "../../UI/Radio";
import { useTranslation } from "react-i18next";
import { Input } from "../../UI/Input";

const StyledWrapper = styled.div`
  margin-bottom: 20px;
`;

const StyledLabel = styled.p`
  margin-bottom: 5px;
`;

const StyledBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const StyledInput = styled(Input)`
  margin-bottom: 0;
  input {
    padding: 0;
    width: 150px;
  }
`;

interface IProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
}

const ChildrenInputComponent = React.memo(
  ({ label, value, onChange }: IProps) => {
    const { t } = useTranslation();
    const [checked, setChecked] = useState<boolean | null>(null);

    //Set 'yes' when quantity not 0
    useEffect(() => {
      if (Number(value) > 0) setChecked(true);
    }, [value]);

    useEffect(() => {
      onChange(checked ? "1" : "0");
    }, [checked]);

    const handleChange = useCallback((v: string) => {
      const num = Number(v);
      if (num < 100) onChange(v);
    }, []);

    const handleBlur = useCallback(() => {
        if(checked && Number(value) < 1) onChange('1');
    }, [value]);

    return (
      <StyledWrapper>
        <StyledLabel>{label}</StyledLabel>
        <StyledBox>
          <Radio
            active={checked === false}
            onChange={(v) => setChecked(false)}
            label={t("field-no")}
          />
          <Radio
            active={checked === true}
            onChange={(v) => setTimeout(() => setChecked(true))}
            label={t("field-yes")}
          />
          {checked === true && (
            <StyledInput
              type="number"
              label=""
              value={value || ""}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          )}
        </StyledBox>
      </StyledWrapper>
    );
  }
);

export default ChildrenInputComponent;
