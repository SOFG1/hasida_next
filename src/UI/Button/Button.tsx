import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  font-weight: 500;
  font-size: 18px;
  line-height: 1.32;
  letter-spacing: 0.01em;
  color: #fff;
  font: inherit;
  transition: 200ms;
  cursor: pointer;
  background: #2a9b9f;
  box-shadow: 2px 5px 9px rgba(0, 0, 0, 0.12);
  border-radius: 13px;
  border: 0;
  padding: 16px;
  &:hover {
    background: #2eb8bd;
  }
  &:active {
    background: #3bc4c9;
  }

  &:disabled {
    background: rgba(42, 155, 159, 0.13);
    cursor: not-allowed;
  }
`;

interface IProps {
  children: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const Button = React.memo(
  ({ children, className, disabled, onClick }: IProps) => {
    return (
      <StyledButton className={className} disabled={disabled} onClick={onClick}>
        {children}
      </StyledButton>
    );
  }
);

export default Button;
