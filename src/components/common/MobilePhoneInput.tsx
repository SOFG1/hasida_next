import React, { useCallback, useMemo } from "react";
import CountryList from "country-list-with-dial-code-and-flag";
import styled from "styled-components";
import { Dropdown } from "../../UI/Dropdown";
import { Input } from "../../UI/Input";
import { useTranslation } from "react-i18next";

const StyledWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 20px;
  max-width: 100%;
`;

const StyledDropdown = styled(Dropdown)`
  margin-bottom: 0;
  width: 250px;
  @media screen and (max-width: 1050px) {
    width: 180px;
  }
  @media screen and (max-width: 500px) {
    width: 120px;
    flex-grow: 1;
    .dropdown__option {
      white-space: nowrap;
      padding: 0;
      font-size: 14px;
    }
  }
`;

const StyledInput = styled(Input)`
  flex-grow: 1;
  max-width: 100%;
  margin-bottom: 0;
  @media screen and (max-width: 430px) {
    max-width: 200px;
  }
  @media screen and (max-width: 400px) {
    max-width: 170px;
  }
`;

interface IProps {
  label: string;
  value: string | undefined;
  onChange: (v: string) => void;
  hint?: string
}

const MobilePhoneInput = React.memo(({ label, value, onChange, hint }: IProps) => {
  const { t } = useTranslation();
  const options = useMemo(() => {
    return CountryList.getAll().map((c) => ({
      label: `(${c.dial_code}) ${c.name}`,
      value: c.dial_code,
    }));
  }, []);

  //Extract only country dial code
  const codeOption = useMemo(() => {
    const code = value ? String(value).split("-")[0] : [];
    const codeOption = options.find((o) => o.value === code);
    return codeOption || null;
  }, [value, options]);

  //Extract only number
  const numberValue = useMemo(() => {
    const arr = value ? String(value).split("-") : [];
    if (arr?.length > 1) arr.shift();
    return arr?.join("");
  }, [value]);

  const handleChange = useCallback(
    (key: "code" | "number", v: any) => {
      if (key === "code") {
        const stringVal = [v, numberValue || ""].join("-");
        onChange(stringVal);
      }
      if (key === "number") {
        if (!/^\d+$/.test(v) && v !== "") return; // only numbers validation
        const stringVal = [codeOption?.value || "", v].join("-");
        onChange(stringVal);
      }
    },
    [codeOption, numberValue]
  );

  return (
    <StyledWrapper>
      <StyledDropdown
        label={t("field-country_code")}
        value={codeOption}
        onChange={(v) => handleChange("code", v?.value)}
        options={options}
        clearable={false}
      />
      <StyledInput
        label={label}
        type="text"
        value={numberValue}
        onChange={(v) => handleChange("number", v)}
        hint={hint}
      />
    </StyledWrapper>
  );
});

export default MobilePhoneInput;
