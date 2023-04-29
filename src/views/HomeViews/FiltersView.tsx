import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useUserGetFieldsQuery, useUserInfoQuery } from "../../api/user";
import {
  AppliedFiltersComponent,
  FilterInputComponent,
  NoItemsComponent,
} from "../../components/HomeComponents";
import {
  homeAppliedFiltersSelector,
  setAppliedFilters,
} from "../../store/home";
import { Button } from "../../UI/Button";
import { ChevronDownIcon } from "../../UI/SVG";
import { SubTitle } from "../../UI/Title";
import { Loader } from "../../UI/Loader";

const StyledWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto 39px;
  max-width: 1135px;
  z-index: 2;
`;

const StyledToggler = styled.div<{ opened: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 18px;
  cursor: pointer;
  transition: 200ms;
  &:hover {
    opacity: 0.7;
  }
  svg {
    pointer-events: none;
    height: 9px;
    width: 16px;
    ${({ opened }) => opened && "transform: rotate(180deg);"}
  }
  svg path {
    stroke: #2a9b9f;
  }
  @media screen and (max-width: 700px) {
    margin-bottom: 13px;
  }
  //Not selectable
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
`;

const FiltersForm = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 15px 25px;
  @media screen and (max-width: 1400px) {
    justify-content: center;
  }
`;

const StyledButton = styled(Button)`
  width: 100%;
`;

const StyledLoader = styled(Loader)`
  margin: 20px auto;
`;

const feed  = {
  data: [1,2,3,4]
}

const FiltersView = React.memo(() => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { data: fields, isFetching } = useUserGetFieldsQuery();
  const { data: userInfo, isLoading } = useUserInfoQuery();
  const appliedFilters = useSelector(homeAppliedFiltersSelector);
  const [filtersOpened, setFiltersOpened] = useState<boolean>(false);
  const [filtersData, setFiltersData] = useState<{ [key: string]: any }>({});

  const filtersFields = useMemo(() => {
    return fields?.filter((f) => f.is_filter) || [];
  }, [fields]);

  const handleSetFiltersData = useCallback((key: string, value: any) => {
    setFiltersData((p) => {
      return {
        ...p,
        [key]: value,
      };
    });
  }, []);

  const handleApplyFilters = useCallback(() => {
    setFiltersOpened(false);
    dispatch(setAppliedFilters(filtersData));
  }, [filtersData]);

  const selectedCountryId = useMemo(() => {
    if (filtersData.country?.length === 1) {
      return filtersData.country[0].value;
    }
  }, [filtersData.country]);

  useEffect(() => {
    setFiltersData(appliedFilters);
  }, [appliedFilters]);

  useEffect(() => {
    if (userInfo?.profile?.country) {
      const label = userInfo?.profile?.country.name;
      const value = userInfo?.profile?.country.id;
      dispatch(setAppliedFilters({ country: [{ label, value }] }));
    }
  }, [userInfo]);


  return (
    <StyledWrapper>
      <StyledToggler
        opened={filtersOpened}
        onClick={() => setFiltersOpened(!filtersOpened)}
      >
        <SubTitle>{t("filters_title")}</SubTitle>
        <ChevronDownIcon />
      </StyledToggler>
      <AppliedFiltersComponent />
      {filtersOpened && (
        <>
          {isFetching && <StyledLoader />}
          <FiltersForm>
            {filtersFields.map((f) => (
              <FilterInputComponent
                key={f.id}
                field={f}
                value={filtersData[f.name]}
                onChange={(v) => handleSetFiltersData(f.name, v)}
                selectedCountryId={selectedCountryId}
              />
            ))}
          </FiltersForm>
          <StyledButton onClick={handleApplyFilters}>
            {t("filters_apply")}
          </StyledButton>
        </>
      )}

      {feed?.data.length === 0 && appliedFilters.country && (
        <NoItemsComponent onClick={() => setFiltersOpened(true)} />
      )}
    </StyledWrapper>
  );
});

export default FiltersView;
