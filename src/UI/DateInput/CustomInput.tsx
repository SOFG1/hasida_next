import React, { forwardRef } from "react";
import styled from "styled-components";
import { StyledError } from "../StyledError/StyledError";
import { StyledLabel } from "../StyledLabel/StyledLabel";
import { StyledWrapper } from "../StyledWrapper/StyledWrapper";
import { CalendarIcon } from "../SVG";

const Wrapper = styled(StyledWrapper)<{ disabled?: boolean }>`
  cursor: pointer;
  padding: 15px 23px;
  margin-bottom: 0;
  ${({ disabled }) => disabled && "cursor: not-allowed;"}
  svg {
    margin-inline-start: auto;
  }
`;

const InputText = styled.p`
  margin-inline-end: auto;
`;

interface IProps {
  label: string
  value?: string
  onClick?: () => void
  error?: string
  disabled?: boolean
}

export const CustomInput = forwardRef(
  ({ label, value, onClick, error, disabled }: IProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    
    return (
      <Wrapper
        disabled={disabled}
        onClick={onClick}
        ref={ref}
        hasError={!!error}
      >
        {value && <InputText>{value}</InputText>}
        <CalendarIcon stroke="red" />
        <StyledLabel hasError={!!error} isActive={!!value}>{label}</StyledLabel>
        {error && <StyledError>{error}</StyledError>}
      </Wrapper>
    );
  }
);
