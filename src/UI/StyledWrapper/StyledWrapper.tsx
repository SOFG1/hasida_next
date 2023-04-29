import styled from "styled-components";

//Wrapper element for Input, Dropdown, and Textarea
export const StyledWrapper = styled.div<{ hasError?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  border-bottom: 1px solid
    ${({ hasError }) => (hasError ? "#E34040" : "#303d45")};
  margin-bottom: 20px;
`;
