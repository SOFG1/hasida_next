import React from "react";
import styled from "styled-components";
import { Header } from "../../components/common";
import { PageContent } from "../../UI/PageContent/PageContent";
import { CandidatesView, FiltersView } from "../../views/HomeViews";

const HeaderStyled = styled(Header)`
  position: relative;
  position: sticky;
  background-color: #fff;
  z-index: 4;
`;

const HomePage = React.memo(() => {

  return (
    <PageContent id="home-page">
      <HeaderStyled />
      <FiltersView />
      <CandidatesView />
    </PageContent>
  );
});

export default HomePage;
