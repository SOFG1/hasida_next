import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  dashboardDaysFilterSelector,
  dashboardFilterOptions,
  setDaysFilter,
} from "../../store/dashboard";

const StyledWrapper = styled.div`
  position: relative;
  width: fit-content;
  font-weight: 300;
  margin-bottom: 42px;
  span {
    font-weight: 600;
    margin-inline-start: 6px;
  }
  &:hover > div {
    display: flex;
  }
`;

const StyledList = styled.div`
  display: none; //flex
  position: absolute;
  inset-inline-end: 0;
  top: 100%;
  padding-top: 3px;
  flex-direction: column;
  background-color: #fff;
  border-radius: 5px;
  z-index: 2;
`;

const StyledItem = styled.p`
  font-weight: 600;
  margin-bottom: 7px;
  cursor: pointer;
  padding: 3px 5px;
  border-radius: 12px;
  box-shadow: 1px 1px 4px #00000051;
`;

const SelectedPeriod = React.memo(() => {
  const {t} = useTranslation()
  const dispatch = useDispatch();
  const daysFilter = useSelector(dashboardDaysFilterSelector);

  const handleChange = useCallback((days: number) => {
    dispatch(setDaysFilter(days));
  }, []);


  return (
    <StyledWrapper>
      {t('dashboard_period')} <span>{t('dashboard_selected-period', {[t('dashboard_days')]: daysFilter})}</span>
      <StyledList>
        {dashboardFilterOptions.map((o) => (
          <StyledItem key={o} onClick={() => handleChange(o)}>
            {t('dashboard_selected-period', {[t('dashboard_days')]: o})}
          </StyledItem>
        ))}
      </StyledList>
    </StyledWrapper>
  );
});

export default SelectedPeriod;
