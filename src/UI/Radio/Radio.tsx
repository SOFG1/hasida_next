import React, { useCallback } from "react";
import styled from "styled-components";

const Wrapper = styled.button`
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 0;
  border: 0;
  background-color: transparent;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
`;

const RadioWrapper = styled.div`
  padding: 0;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 18px;
  width: 18px;
  border: 1px solid #303d45;
  border-radius: 50%;
`;

const StyledSpan = styled.span`
  height: 12px;
  width: 12px;
  border-radius: 50%;
  background-color: #2a9b9f;
`;

const StyledLabel = styled.p`
  font-weight: 300;
  font-size: 12px;
`;

interface IProps {
  active: boolean;
  onChange: (v: boolean) => void;
  label?: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

const Radio = React.memo(
  ({ active, onChange, label, disabled, className }: IProps) => {
    const handleClick = useCallback(() => {
      if (!disabled) onChange(!active);
    }, [disabled, active]);

    return (
      <Wrapper onClick={handleClick} disabled={disabled} className={className} dir="auto">
        <RadioWrapper>{active && <StyledSpan></StyledSpan>}</RadioWrapper>
        {label && typeof label === 'string' && <StyledLabel>{label}</StyledLabel>}
        {label && typeof label !== 'string' && <>{label}</>}
      </Wrapper>
    );
  }
);

export default Radio;
