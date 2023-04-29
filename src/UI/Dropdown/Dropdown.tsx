import React, { useMemo, useRef, useState } from "react";
import Select, { StylesConfig } from "react-select";
import { DropdownValueType, IProps } from "./types";
import { StyledWrapper } from "../StyledWrapper/StyledWrapper";
import { StyledLabel } from "../StyledLabel/StyledLabel";
import { StyledError } from "../StyledError/StyledError";

const stylesOptions: StylesConfig = {
  container(base) {
    return {
      ...base,
      flexGrow: "1",
    };
  },
  control: (base: any, { data, isDisabled, isFocused, isSelected }: any) => {
    return {
      ...base,
      backgroundColor: 'transparent',
      borderWidth: "0px",
      borderRadius: "59px",
      boxShadow: "none",
      padding: "6px 14px",
    };
  },
  indicatorSeparator: (base: any) => {
    return {
      ...base,
      display: "none",
    };
  },
  menu: (base: any) => {
    return {
      ...base,
      zIndex: 3,
    };
  },
};

const Dropdown = React.memo(
  ({
    label,
    options,
    value,
    onChange,
    disabled,
    loading,
    multiselect,
    clearable = true,
    error,
    onClick,
    menuPlacement,
    className,
  }: IProps) => {
    const [inputValue, setInputValue] = useState<string>("");

    const moveLabel = useMemo(() => {
      if (inputValue) return true;
      if (Array.isArray(value) && value.length) return true;
      if (!Array.isArray(value) && value) return true;
      return false;
    }, [value, inputValue]);

    return (
      <StyledWrapper hasError={!!error} className={className} onClick={onClick}>
        <Select
          key={String(value)} //This key rerenders component in order to reset value
          styles={stylesOptions}
          defaultInputValue={inputValue}
          onInputChange={setInputValue}
          placeholder=""
          options={options}
          onChange={(v: any) => onChange(v as DropdownValueType)}
          menuPlacement={menuPlacement}
          isMulti={multiselect}
          isClearable={clearable}
          value={value}
          isDisabled={disabled}
          isLoading={loading}
          classNamePrefix="dropdown"
        />
        <StyledLabel isActive={moveLabel} hasError={!!error} dir="auto">
          {label}
        </StyledLabel>
        {error && <StyledError>{error}</StyledError>}
      </StyledWrapper>
    );
  }
);

export default Dropdown;
