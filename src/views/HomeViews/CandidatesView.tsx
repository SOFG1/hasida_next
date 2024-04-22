import React, { useCallback, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { homeAppliedFiltersSelector } from "../../store/home";
import { Loader } from "../../UI/Loader";
import CandidateCard from "./CandidateCard";
import { useTranslation } from "react-i18next";
import { useLazyProfilesListQuery } from "../../api/home";
import { convertFiltersData } from "../../utils";  
               
const StyledLoader = styled(Loader)`  
  width: 100%;  
`; 
  
const CandidatesView = React.memo(() => {
  const appliedFilters = useSelector(homeAppliedFiltersSelector);
  const { i18n } = useTranslation();
  const [fetchProfiles, { data, isFetching }] =
    useLazyProfilesListQuery();

  const handleFetch = useCallback(
    (offset: number) => {
      const filters = convertFiltersData(appliedFilters);
      fetchProfiles({ ...filters, offset, _lang: i18n.language });
    },
    [appliedFilters, i18n.language]
  );

  useEffect(() => {
    handleFetch(0);
  }, [handleFetch]);


  return (
    <>
      <InfiniteScroll
        className="infinite-list"
        loader={<></>}
        dataLength={data?.data.length || 0}
        next={() => handleFetch(data?.data.length || 0)}
        hasMore={data?.data.length < data?.count}
        scrollableTarget={"home-page"}
        scrollThreshold={0.97}
      >
        {data?.data.map((p: any, i: number) => {
          return <CandidateCard profile={p} key={p.id} index={i} />;
        })}
      </InfiniteScroll>
      {isFetching && <StyledLoader />}
    </>
  );
});

export default CandidatesView;
