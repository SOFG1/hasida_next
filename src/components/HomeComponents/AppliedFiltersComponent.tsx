import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { homeAppliedFiltersSelector, removeFilter } from "../../store/home";
import { CloseIcon } from "../../UI/SVG";
import { useUserGetFieldsQuery } from "../../api/user";

const StyledWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  overflow-x: auto;
  align-items: center;
  gap: 12px;
  padding-bottom: 12px;
  max-width: 100%;
  width: 100%;
`;

const StyledItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const StyledLabel = styled.p`
  font-weight: 300;
  white-space: nowrap;
`;

const StyledValue = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 7px 12px;
  background-color: #f7e293;
  font-weight: 700;
  border-radius: 30px;
  white-space: nowrap;
`;

const DeleteBtn = styled.button`
  border: 0;
  background-color: transparent;
  padding: 0;
  border-radius: 0;
  cursor: pointer;

`;

const AppliedFiltersComponent = React.memo(() => {
  const { t } = useTranslation();
  const dispatch = useDispatch()
  const {data: fields} = useUserGetFieldsQuery()
  const appliedFilters = useSelector(homeAppliedFiltersSelector);

  return (
    <StyledWrapper>
      {Object.keys(appliedFilters).map((key) => {
        let value = appliedFilters[key];
        //Empty values
        if (!value || value?.length === 0) return null;
        //Dates, integers
        if (Array.isArray(value) && !value[0]?.hasOwnProperty("label")) {
          let firstValue: string | number = "";
          if (value[0] instanceof Date) {
            firstValue = value[0].toLocaleDateString();
          }
          if (typeof value[0] === "number") {
            firstValue = value[0];
          }
          let secondValue: string | number = "";
          if (value[1] instanceof Date) {
            secondValue = value[1].toLocaleDateString();
          }
          if (typeof value[1] === "number") {
            secondValue = value[1];
          }
          value = `${firstValue} to ${secondValue}`;
        }
        //Dropdowns
        if (Array.isArray(value) && value[0]?.hasOwnProperty("label")) {
          value = value.map((o) => o.label).join(", ");
        }
        //Booleans
        if (typeof value === "boolean") {
          value = value ? t("field-yes") : t("field-no");
        }


        //Label
        const label = fields?.find(f => f.name === key)?.view_name || key
        return (
          <StyledItem key={key}>
            <StyledLabel>{label}</StyledLabel>
            <StyledValue>
              {value}
              <DeleteBtn onClick={() => dispatch(removeFilter(key))}>
                <CloseIcon />
              </DeleteBtn>
            </StyledValue>
          </StyledItem>
        );
      })}
    </StyledWrapper>
  );
});

export default AppliedFiltersComponent;
