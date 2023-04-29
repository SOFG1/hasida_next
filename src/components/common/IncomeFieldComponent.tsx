import React, { useEffect, useMemo } from "react";
import styled from "styled-components";
import { Dropdown, DropdownValueType } from "../../UI/Dropdown";
import { USCountryCode, currencySymbols } from "../../constants";
import { incomeOptions } from "../../constants";
import { IsraelCountryCode } from "../../constants";

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
`;

const StyledDropdown = styled(Dropdown)`
  flex-grow: 1;
  margin-bottom: 0;
`;

const StyledCurrency = styled.p`
  font-size: 22px;
  font-weight: 700;
`;

interface IProps {
  label: string;
  value: any;
  onChange: (v: DropdownValueType) => void;
  selectedCountryId?: number;
}

const IncomeFieldComponent = React.memo(
  ({ label, value, onChange, selectedCountryId }: IProps) => {
    const countryKey = useMemo(() => {
      return selectedCountryId === IsraelCountryCode
        ? selectedCountryId
        : USCountryCode;
    }, [selectedCountryId]);

    useEffect(() => {
      const opt = incomeOptions[countryKey].find(
        (o) => o.value === value?.value
      );
      if (opt) onChange(opt);
    }, [countryKey]);

    return (
      <StyledWrapper>
        <StyledDropdown
          label={label}
          value={value}
          onChange={onChange}
          options={incomeOptions[countryKey]}
        />
        <StyledCurrency>{currencySymbols[countryKey]}</StyledCurrency>
      </StyledWrapper>
    );
  }
);

export default IncomeFieldComponent;
