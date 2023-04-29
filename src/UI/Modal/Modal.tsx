import React, { useCallback } from "react";
import styled, { keyframes } from "styled-components";
import { CloseIcon } from "../SVG";

const showAnim = keyframes`
  from {
    transform: translateY(50px);
    opacity: 0.3;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const StyledWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.73);
  backdrop-filter: blur(24px);
  z-index: 20;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 80px 90px;
  @media screen and (max-width: 720px) {
    padding: 45px 15px;
  }
`;

const StyledContent = styled.div`
  position: relative;
  padding: 29px 52px 34px;
  background: #fcfbf7;
  border: 1px solid rgba(48, 61, 69, 0.12);
  border-radius: 8px;
  animation: ${showAnim} ease-out 200ms forwards;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 14px;
  inset-inline-end: 20px;
  cursor: pointer;
  padding: 0;
  background-color: transparent;
  border: 0;
  transition: 150ms;
  svg {
    height: 12px;
    width: 12px;
  }
  &:hover {
    opacity: 0.65;
  }
  @media screen and (max-width: 720px) {
    top: 15px;
    inset-inline-end: 15px;
  }
`;

interface IProps {
  children: React.ReactNode;
  onClose: () => void;
  className?: string
}

const Modal = React.memo(({ children, onClose, className }: IProps) => {

  const handleClose = useCallback((e: any) => {
    e.stopPropagation()
    onClose()
  }, [])

  return (
    <StyledWrapper onClick={(e) => e.stopPropagation()}>
      <StyledContent className={className}>
        <CloseBtn onClick={handleClose}>
          <CloseIcon />
        </CloseBtn>
        {children}
      </StyledContent>
    </StyledWrapper>
  );
});

export default Modal;
