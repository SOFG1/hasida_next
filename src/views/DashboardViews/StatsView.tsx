import React, { useMemo } from "react";
import styled from "styled-components";
import { Pie } from "react-chartjs-2";
import { ArcElement, Chart, Legend, Tooltip } from "chart.js";
import { useSelector } from "react-redux";
import { dashboardDaysFilterSelector } from "../../store/dashboard";
import { useGetDashboardQuery } from "../../api/dashboard";
import { useTranslation } from "react-i18next";

Chart.register(ArcElement, Legend, Tooltip);

const options = {
  plugins: {},
};

const StyledWrapper = styled.div`
  padding: 12px 19px;
  flex-grow: 1;
  max-width: 50%;
  @media screen and (max-width: 1150px) {
    padding: 0;
    max-width: 100%;
  }
`;

const PieContainer = styled.div`
  max-width: 220px;
  max-height: 360px;
  margin-bottom: 32px;
  margin: 0 auto;
  @media screen and (max-width: 600px) {
    display: none;
  }
`;

const MobilePieData = styled.div`
  display: none;
  @media screen and (max-width: 600px) {
    display: block;
  }
`;

const StyledTitle = styled.p`
  font-weight: 600;
  font-size: 18px;
  margin-bottom: 10px;
`;

const StyledBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const StyledItem = styled.p`
  font-weight: 300;
  padding-right: 6px;
  span {
    margin-inline-start: 6px;
    font-weight: 700;
  }
`;

const StatsView = React.memo(() => {
  const { t } = useTranslation();
  const daysFilter = useSelector(dashboardDaysFilterSelector);
  const { data } = useGetDashboardQuery(daysFilter);

  const pieData = useMemo(() => {
    return {
      labels: [t("dashboard_all"), t("dashboard_open"), t("dashboard_write")],
      datasets: [
        {
          label: "My First Dataset",
          data: [
            data?.show_in_search.all || 0,
            data?.show_in_search.open || 0,
            data?.show_in_search.write || 0,
          ],
          backgroundColor: [" #2A9B9F", "#F9F3DD", " #FFF1B8"],
          borderWidth: 0,
        },
      ],
    };
  }, [data?.show_in_search]);

  return (
    <StyledWrapper>
      <StyledTitle>{t("dashboard_search")}</StyledTitle>
      <PieContainer>
        <Pie data={pieData} options={options} />
      </PieContainer>
      <MobilePieData>
        <StyledItem>
          {t("dashboard_all")} <span>{data?.show_in_search.all}</span>
        </StyledItem>
        <StyledItem>
          {t("dashboard_open")} <span>{data?.show_in_search.open}</span>
        </StyledItem>
        <StyledItem>
          {t("dashboard_write")} <span>{data?.show_in_search.write}</span>
        </StyledItem>
      </MobilePieData>
      <StyledTitle>{t("dashboard_activity")}</StyledTitle>
      <StyledBox>
        <StyledItem>
          {t("dashboard_searches")} <span>{data?.activity.searches}</span>
        </StyledItem>
        <StyledItem>
          {t("dashboard_likes")} <span>{data?.activity.i_liked}</span>
        </StyledItem>
      </StyledBox>
      <StyledBox>
        <StyledItem>
          {t("dashboard_i-saw")} <span>{data?.activity.i_saw}</span>
        </StyledItem>
      </StyledBox>
    </StyledWrapper>
  );
});

export default StatsView;
