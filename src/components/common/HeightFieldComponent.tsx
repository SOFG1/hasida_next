import React, {useCallback, useEffect, useMemo, useState} from "react";
import styled from "styled-components";
import { SliderInput } from "../../UI/SliderInput";
import { useTranslation } from "react-i18next";

const StyledWrapper = styled.div``;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledSwitcher = styled.div`
  display: flex;
`;

const StyledBtn = styled.button<{ active: boolean }>`
  color: #303d45;
  padding: 0 7px;
  border: 0;
  background-color: transparent;
  border: 0;
  border-radius: 0;
  cursor: pointer;
  &:first-child {
    border-inline-end: 1px solid #000;
  }
  ${({ active }) => !active && "color: rgba(48, 61, 69, 0.27);"}
`;

const StyledSliderInput = styled(SliderInput)`
  margin-bottom: 20px;
`;

interface IProps {
  label: string;
  value: number;
  onChange: (v: number) => void;
}

const HeightInputComponent = React.memo(
  ({ label, value, onChange }: IProps) => {
    const { t } = useTranslation();
    const [measure, setMeasure] = useState<"cm" | "inch">("cm");

    const valueConverted = useMemo(() => {
        if(!value) return ''
        //In feet and inches
        if(measure === 'inch') {
          const inches = (value / 2.54)
          const feet = Math.floor(inches / 12)
          const inchesRemainder = Math.floor(inches % 12)
          return `${feet}"${inchesRemainder}'`
        }
        //In CM
        return value?.toString()

    }, [value, measure])

      const onChangeHandler = useCallback((e: number) => {
          if(e > 240) return onChange(240);
          if(e < 100) return onChange(100);
          onChange(e);
      }, []);

    return (
      <StyledWrapper>
        <StyledHeader>
          <p>{label}</p>
          <StyledSwitcher>
            <StyledBtn
              active={measure === "inch"}
              onClick={() => setMeasure("inch")}
            >
              {t("height-inch")}
            </StyledBtn>
            <StyledBtn
              active={measure === "cm"}
              onClick={() => setMeasure("cm")}
            >
              {t("height-cm")}
            </StyledBtn>
          </StyledSwitcher>
        </StyledHeader>
        <StyledSliderInput
          value={value}
          valueLabel={valueConverted}
          onChange={onChangeHandler}
          min={100}
          max={240}
        />
      </StyledWrapper>
    );
  }
);

export default HeightInputComponent;
