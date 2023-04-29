import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useGetDashboardQuery } from "../api/dashboard";
import { Header } from "../components/common";
import { SelectedPeriod } from "../components/DashboardComponents";
import { dashboardDaysFilterSelector } from "../store/dashboard";
import { Loader } from "../UI/Loader";
import { PageContent } from "../UI/PageContent/PageContent";
import { SubTitle } from "../UI/Title";
import { LikesView, StatsView } from "../views/DashboardViews";

const StyledCircle1 = styled.div`
  position: fixed;
  top: -240px;
  inset-inline-end: -240px;
  height: 487px;
  width: 487px;
  border-radius: 50%;
  background-color: rgba(42, 155, 159, 0.05);
  z-index: -1;
`;

const StyledCircle2 = styled.div`
  position: fixed;
  inset-inline-end: -190px;
  bottom: -190px;
  height: 379px;
  width: 379px;
  border-radius: 50%;
  z-index: -1;
  background-color: rgba(249, 243, 221, 0.29);
`;

const StyledWrapper = styled.div`
  margin: 0 auto;
`;

const HeaderStyled = styled(Header)`
  position: sticky;
  @media screen and (max-width: 1150px) {
    background-color: #fff;
  }
`;

const StyledTitle = styled(SubTitle)`
  margin-bottom: 40px;
`;

const StyledBox = styled.div`
  display: flex;
  padding: 0 19px;
  max-width: 100%;
  gap: 70px;
  @media screen and (max-width: 1150px) {
    flex-direction: column;
    align-items: center;
    gap: 150px;
  }
`;

const DashboardPage = React.memo(() => {
  const { t } = useTranslation();
  const daysFilter = useSelector(dashboardDaysFilterSelector);
  const { isFetching } = useGetDashboardQuery(daysFilter);

  return (
    <PageContent>
      <StyledWrapper>
        <HeaderStyled />
        <StyledTitle>{t("dashboard_title")}</StyledTitle>
        <SelectedPeriod />
        {!isFetching && (
          <StyledBox>
            <StatsView />
            <LikesView />
          </StyledBox>
        )}
        {isFetching && <Loader />}
        <StyledCircle1 />
        <StyledCircle2 />
      </StyledWrapper>
    </PageContent>
  );
});

export default DashboardPage;
