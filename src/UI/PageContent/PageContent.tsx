import styled from "styled-components";

export const PageContent = styled.div`
  width: 100%;
  padding: 0 15px;
  overflow-y: auto;
  min-height: 100vh;
  padding-bottom: 25px;
  @media screen and (max-width: 700px) {
    padding-bottom: 150px;
  }
`;
