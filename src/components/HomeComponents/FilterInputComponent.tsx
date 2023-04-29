import React, { useEffect, useMemo } from "react";
import styled from "styled-components";
import { IField, useUserGetFieldOptionsQuery } from "../../api/user";
import { RangeInput } from "../../UI/RangeInput";
import { DateRangeInput } from "../../UI/DateInput";
import { useTranslation } from "react-i18next";
import { Dropdown } from "../../UI/Dropdown";
import { Radio } from "../../UI/Radio";
import { Textarea } from "../../UI/Textarea";
import { Input } from "../../UI/Input";
import HeightFilterComponent from "./HeightFilterComponent";
import { USCountryCode } from "../../constants";

const StyledWrapper = styled.div`
  width: 325px;
  @media screen and (max-width: 1040px) {
    width: 100%;
  }
`;

const StyledRangeInput = styled(RangeInput)`
  margin-bottom: 20px;
`;

const StyledBox = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
`;

interface IProps {
  field: IField;
  value: any;
  onChange: (v: any) => void;
  selectedCountryId?: number;
  selectedStateId?: number;
}

const FilterInputComponent = React.memo(
  ({
    field,
    value,
    onChange,
    selectedCountryId,
    selectedStateId,
  }: IProps): any => {
    const { t } = useTranslation();

    const skipOptsFetching = useMemo(() => {
      if (field.type !== "ForeignKey") return true;
      if (field.name === "country" && selectedCountryId) return true;
      if (field.name === "state" && selectedCountryId !== USCountryCode)
        return true;
      if (field.name === "city" && !selectedCountryId) {
        return true;
      }
      return false;
    }, [field.type, selectedCountryId, selectedStateId]);

    const { data, isFetching } = useUserGetFieldOptionsQuery(
      {
        field: field.name,
        country_id: selectedCountryId,
        state_id: selectedStateId,
      },
      { skip: skipOptsFetching }
    );

    const fetchedOptions = useMemo(() => {
      return data?.map((o) => ({ label: o.name, value: o.id })) || [];
    }, [data]);

    //Remove values
    useEffect(() => {
      if (field.name === "state" && selectedCountryId !== USCountryCode) {
        onChange(null);
      }
      if (field.name === "city" && !selectedCountryId) {
        onChange(null);
      }
    }, [field.name, selectedCountryId]);

    //1.Numbers

    //height exception
    if (field.type === "Integer" && field.name === "hight") {
      return (
        <StyledWrapper>
          <HeightFilterComponent
            label={field.view_name}
            value={value}
            onChange={onChange}
          />
        </StyledWrapper>
      );
    }

    //height other integers
    if (field.type === "Integer") {
      const minMax = [0, 10];
      //diferent for 'age'
      if (field.name === "age") {
        minMax[0] = 18;
        minMax[1] = 65;
      }
      //diferent for 'family_distance'
      if (field.name === "family_distance") {
        minMax[0] = 0;
        minMax[1] = 20000;
      }
      return (
        <StyledWrapper>
          <p>{field.view_name}</p>
          <StyledRangeInput
            value={value || [0, 0]}
            onChange={onChange}
            min={minMax[0]}
            max={minMax[1]}
          />
        </StyledWrapper>
      );
    }

    //2.Dates
    if (field.type === "Date") {
      const startDate = value && value[0];
      const endDate = value && value[1];
      return (
        <StyledWrapper>
          <DateRangeInput
            label={field.view_name}
            startDate={startDate}
            endDate={endDate}
            onChangeStart={(v) => onChange([v, endDate])}
            onChangeEnd={(v) => onChange([startDate, v])}
            maxDate={new Date()}
          />
        </StyledWrapper>
      );
    }

    //3.Fetchable dropdowns
    if (field.name === "state" && selectedCountryId !== USCountryCode) {
      //Don't show state when country is not US
      return null;
    }
    if (field.name === "city" && !selectedCountryId) {
      //Don't show city when no country
      return null;
    }
    if (field.type === "ForeignKey") {
      return (
        <StyledWrapper>
          <Dropdown
            label={field.view_name}
            value={value}
            multiselect={true}
            onChange={onChange}
            options={fetchedOptions}
            loading={isFetching}
          />
        </StyledWrapper>
      );
    }

    //4.Booleans
    if (field.type === "Boolean") {
      return (
        <StyledWrapper>
          <StyledBox>
            <p>{field.view_name}</p>
            <Radio
              active={value === true}
              onChange={(v) => onChange(true)}
              label={t("field-yes")}
            />
            <Radio
              active={value === false}
              onChange={(v) => onChange(false)}
              label={t("field-no")}
            />
          </StyledBox>
        </StyledWrapper>
      );
    }

    //5.Dropdowns
    if (field.type === "String" && field.options.length) {
      return (
        <StyledWrapper>
          <Dropdown
            label={field.view_name}
            value={value}
            multiselect={true}
            onChange={onChange}
            options={field.options.map((o) => ({ label: o, value: o }))}
            loading={isFetching}
          />
        </StyledWrapper>
      );
    }

    //6.Text inputs
    if (field.type === "String" && !field.options.length) {
      return (
        <StyledWrapper>
          <Input
            type="text"
            label={field.view_name}
            value={value || ""}
            onChange={onChange}
          />
        </StyledWrapper>
      );
    }

    //7.Textareas
    if (field.type === "Text") {
      return (
        <StyledWrapper>
          <Textarea
            label={field.view_name}
            value={value || ""}
            onChange={onChange}
          />
        </StyledWrapper>
      );
    }
  }
);

export default FilterInputComponent;
