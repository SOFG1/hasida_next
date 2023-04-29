import React from "react";
import styled from "styled-components";
import { Header } from "../components/common";
import { PageContent } from "../UI/PageContent/PageContent";
import { CandidateView, CandidatesView, FiltersView } from "../views/HomeViews";
import { useRouter } from "next/router";

const HeaderStyled = styled(Header)`
  position: relative;
  position: sticky;
  background-color: #fff;
  z-index: 4;
`;

const HomePage = React.memo(() => {
  const router = useRouter()

  console.log(router)

  return (
    <PageContent id="home-page">
      <HeaderStyled />
      {/* <Routes>
        <Route
          path="/"
          element={
            <>
              <FiltersView />
              <CandidatesView />
            </>
          }
        />
        <Route path="/:id" element={(<CandidateView />)} />
      </Routes> */}
    </PageContent>
  );
});

export default HomePage;
