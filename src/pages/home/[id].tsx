import React, { useEffect, useMemo } from "react";
import styled from "styled-components";
import { Header } from "../../components/common";
import { PageContent } from "../../UI/PageContent/PageContent";
import { CandidateView, CandidatesView, FiltersView } from "../../views/HomeViews";
import { useRouter } from "next/router";

const HeaderStyled = styled(Header)`
  position: relative;
  position: sticky;
  background-color: #fff;
  z-index: 4;
`;

const HomePage = React.memo(() => {
  const {query, push} = useRouter();

  const userId: number | undefined = useMemo(() => {
    if(query.id && /\d+/.test(String(query.id))) {
        return Number(query.id)
    }
  }, [query.id])

  useEffect(() => {
    if(!userId) push('/home')
  }, [userId, push])

  return (
    <PageContent id="home-page">
      <HeaderStyled />
      <CandidateView userId={userId} />
    </PageContent>
  );
});

export default HomePage;
