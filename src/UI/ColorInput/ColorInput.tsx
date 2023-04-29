import React from "react";
import { DropdownValueType, OptionType } from "../Dropdown";
import styled from "styled-components";

const colors = {
  Black: "radial-gradient(50% 50% at 50% 50%, #000000 0%, #464646 100%)",
  Brown: "radial-gradient(50% 50% at 50% 50%, #674D1B 0%, #1C1407 100%)",
  "Dirty blond":
    "radial-gradient(50% 50% at 50% 50%, #A4961D 0%, #CCB124 100%)",
  Blond: "radial-gradient(50% 50% at 50% 50%, #FEFFC7 0%, #D4D692 100%)",
  Red: "radial-gradient(50% 50% at 50% 50%, #CC871F 0%, #A44B19 100%)",
  Other: "transparent",
  Blue: "radial-gradient(50% 50% at 50% 50%, #1A8FE3 0%, #095185 100%)",
  Green: "radial-gradient(50% 50% at 50% 50%, #1FCC31 0%, #13711D 100%)",
  "Blue-Green": "radial-gradient(50% 50% at 50% 50%, #1A8FE3 0%, #1FCC31 100%)",
  "Honey-Brown": "radial-gradient(50% 50% at 50% 50%, #EBA937 0%, #674D1B 100%)",
  "Green-Brown": "radial-gradient(50% 50% at 50% 50%, #1FCC31 0%, #674D1B 100%)",
};

type colorsKey = keyof typeof colors;

const StyledWrapper = styled.div`
  margin-bottom: 20px;
`;

const StyledLabel = styled.p`
  font-size: 14px;
  margin-bottom: 5px;
`;

const StyledBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
`;

const StyledOption = styled.button<{ background: string, selected: boolean }>`
  position: relative;
  height: ${({selected}) => selected ? '47px' : '31px'};
  width: ${({selected}) => selected ? '47px' : '31px'};
  flex-shrink: 0;
  border-radius: 50%;
  background: ${({ background }) => background};
  cursor: pointer;
  padding: 0;
  border: 1px solid #0000002e;
  p {
    position: absolute;
    font-size: 10px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

interface IProps {
  label: string;
  value: any;
  onChange: (v: any) => void;
  options: OptionType[];
}

const ColorInput = React.memo(({ label, value, onChange, options }: IProps) => {


  return (
    <StyledWrapper>
      <StyledLabel>{label}</StyledLabel>
      <StyledBox>
        {options.map((o) => {
          const color = colors[o.value as colorsKey] || "#fff";
          return (
            <StyledOption
              title={o.label}
              key={o.value}
              onClick={() => onChange(o)}
              background={color}
              selected={value?.value === o.value}
            >
              {o.value === "Other" && <p>{o.label}</p>}
            </StyledOption>
          );
        })}
      </StyledBox>
    </StyledWrapper>
  );
});

export default ColorInput;
