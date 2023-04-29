import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { RangeInput } from "../../UI/RangeInput";
import { IField } from "../../api/user";
import { useTranslation } from "react-i18next";

const StyledWrapper = styled.div`
  margin-bottom: 20px;
`;

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

interface IProps {
  label: string;
  value: any;
  onChange: (v: [number, number]) => void;
}

const HeightFilterComponent = React.memo(
  ({ label, value, onChange }: IProps) => {
    const { t } = useTranslation();
    const [measure, setMeasure] = useState<"cm" | "inch">("cm");

    const startLabel = useMemo(() => {
      if (value && value[0] && measure === "inch") {
        return (value[0] / 2.54).toFixed();
      }
    }, [value, measure]);

    const endLabel = useMemo(() => {
      if (value && value[1] && measure === "inch") {
        return (value[1] / 2.54).toFixed();
      }
    }, [value, measure]);

    const labels = useMemo(() => {
        if(startLabel && endLabel) {
            return [startLabel, endLabel] as [string, string]
        }
    }, [startLabel, endLabel])

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
        <RangeInput
          value={value || [0, 0]}
          valueLabels={labels}
          onChange={onChange}
          min={100}
          max={240}
        />
      </StyledWrapper>
    );
  }
);

export default HeightFilterComponent;
