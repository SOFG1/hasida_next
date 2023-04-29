import React from "react";
import styled from "styled-components";
import { StyledError } from "../StyledError/StyledError";
import { StyledLabel } from "../StyledLabel/StyledLabel";
import { StyledWrapper } from "../StyledWrapper/StyledWrapper";
import { StyledMessage } from "../StyledMessage/StyledMessage";

const StyedTextarea = styled.textarea<{
  resize?: "vertical" | "none";
  disabled?: boolean;
}>`
  width: 100%;
  color: inherit;
  position: relative;
  font: inherit;
  border-radius: 29px;
  border: 0;
  min-height: 80px;
  outline: 0;
  padding: 15px 23px;
  background-color: transparent;
  line-height: 1.32;
  letter-spacing: 0.01em;
  ${({ resize }) => resize && `resize: ${resize};`}
  ${({ disabled }) => disabled && "cursor: not-allowed;"}
`;


interface IProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  error?: string;
  hint?: string;
  resize?: "vertical" | "none";
  disabled?: boolean;
  className?: string;
}

const Textarea = React.memo(
  ({
    label,
    value,
    onChange,
    error,
    hint,
    resize = "none",
    className,
    disabled,
  }: IProps) => {
    return (
      <StyledWrapper className={className} hasError={!!error}>
        <StyledLabel isActive={!!value} hasError={!!error} dir="auto">
          {label}
        </StyledLabel>
        <StyedTextarea
          dir="auto"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          resize={resize}
          disabled={disabled}
        />
        {error && <StyledError>{error}</StyledError>}
        {hint && <StyledMessage>{hint}</StyledMessage>}
      </StyledWrapper>
    );
  }
);

export default Textarea;
