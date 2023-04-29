import styled from "styled-components";

//Label element for Input, Dropdown, and Textarea
export const StyledLabel = styled.label<{
  isActive: boolean;
  hasError?: boolean;
}>`
  position: absolute;
  pointer-events: none;
  inset-inline-start: 25px;
  top: 14px;
  font-size: 16px;
  line-height: 1.32;
  letter-spacing: 0.01em;
  color: #303d454f;
  transition: 300ms;
z-index: 1;
  //Active position
  ${({ isActive }) =>
    isActive &&
    `
padding: 2px 5px;
font-size: 12px;
background-color: #ffffff;
border-radius: 5px;
color: #000;
top: 0;
transform: translateY(-50%);
`}

  //Active and error color
${({ hasError, isActive }) =>
    hasError &&
    isActive &&
    `
  color: #E34040;
`}


//Not active and error color
  ${({ hasError, isActive }) =>
    hasError &&
    !isActive &&
    `
  color: #e340404f;
`}
`;
