import React, { useRef, useState } from "react";
import styled from "styled-components";
import { StyledError } from "../StyledError/StyledError";
import { StyledLabel } from "../StyledLabel/StyledLabel";
import { StyledWrapper } from "../StyledWrapper/StyledWrapper";
import { ShowPassIcon } from "../SVG";
import { StyledMessage } from "../StyledMessage/StyledMessage";


const StyledInput = styled.input<{ disabled?: boolean }>`
  position: relative;
  color: inherit;
  border-radius: 59px;
  flex-grow: 1;
  font: inherit;
  max-width: 100%;
  border: 0;
  outline: 0;
  padding: 15px 23px;
  background-color: transparent;
  line-height: 1.32;
  letter-spacing: 0.01em;
  z-index: 1;
  ${({ disabled }) => disabled && "cursor: not-allowed;"}
`;

const ShowPassBtn = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: 0;
  padding: 0;
  margin-inline-end: 25px;
`;

interface IProps {
  type: "email" | "number" | "password" | "text" | "url" | "tel";
  value: string;
  onChange: (value: string) => void;
  label: string;
  disabled?: boolean;
  error?: string;
  hint?: string
  className?: string;
  onBlur?: () => void;
}

const Input = React.memo(
  ({ label, type, value, onChange, error, hint, disabled, className, onBlur }: IProps) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    return (
      <StyledWrapper className={className} hasError={!!error} dir="auto">
        <StyledInput
          disabled={disabled}
          type={showPassword ? "text" : type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={() => onBlur && onBlur()}
          dir="auto"
        />
        {type === "password" && (
          <ShowPassBtn onClick={() => setShowPassword((p) => !p)}>
            <ShowPassIcon />
          </ShowPassBtn>
        )}
        <StyledLabel isActive={!!value} hasError={!!error}>
          {label}
        </StyledLabel>
        {error && <StyledError>{error}</StyledError>}
        {hint && <StyledMessage>{hint}</StyledMessage>}

      </StyledWrapper>
    );
  }
);

export default Input;
