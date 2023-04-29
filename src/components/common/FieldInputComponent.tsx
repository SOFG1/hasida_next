import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { IField, useUserGetFieldOptionsQuery } from "../../api/user";
import { DateInput } from "../../UI/DateInput";
import { Dropdown } from "../../UI/Dropdown";
import { Input } from "../../UI/Input";
import { Radio } from "../../UI/Radio";
import { Textarea } from "../../UI/Textarea";
import HeightFieldComponent from "./HeightFieldComponent";
import IncomeFieldComponent from "./IncomeFieldComponent";
import GenderFieldComponent from "./GenderFieldComponent";
import { USCountryCode } from "../../constants";
import MobilePhoneInput from "./MobilePhoneInput";
import { ColorInput } from "../../UI/ColorInput";
import ChildrenInputComponent from "./ChildrenInputComponent";

const colorInputsNames = ["hair_color_childhood", "eye_color", "hair_color"];

interface IProps {
  field: IField;
  value: any;
  onChange: (v: any) => void;
  selectedCountryId?: number;
  selectedStateId?: number;
  hint?: string;
}

const StyledBox = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
`;

const StyledTextarea = styled(Textarea)`
  margin-bottom: 30px;
`;

const FieldInputComponent = React.memo(
  ({
    field,
    value,
    onChange,
    selectedCountryId,
    selectedStateId,
    hint,
  }: IProps): any => {
    const { t } = useTranslation();

    const skipOptsFetching = useMemo(() => {
      if (field.type !== "ForeignKey") return true;
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

    //Exception for mobile phone
    if (field.type === "String" && field.name === "mobile_phone") {
      return (
        <MobilePhoneInput
          label={field.view_name}
          value={value}
          onChange={onChange}
          hint={hint}
        />
      );
    }

    //Text inputs if options length > 0 it's a dropdown
    if (field.type === "String" && !field?.options?.length) {
      return (
        <Input
          type="text"
          label={field.view_name}
          value={value || ""}
          onChange={onChange}
          hint={hint}
        />
      );
    }

    //Exception for birth_date
    if (field.type === "Date" && field.name === "birth_date") {
      //Max date 18 years behind  (only 18+)
      const date = new Date();
      const year = date.getFullYear() - 18;
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const maxDate = new Date(
        `${month < 10 ? 0 + month : month}-${day}-${year}`
      );
      return (
        <DateInput
          label={field.view_name}
          value={value}
          onChange={onChange}
          maxDate={maxDate}
          hint={hint}
        />
      );
    }

    //Date inputs
    if (field.type === "Date") {
      return (
        <DateInput label={field.view_name} value={value} onChange={onChange} />
      );
    }

    //Exception for 'income' dropdown
    if (field.name === "income") {
      return (
        <IncomeFieldComponent
          label={field.view_name}
          value={value}
          onChange={onChange}
          selectedCountryId={selectedCountryId}
        />
      );
    }

    if (field.type === "Many2Many") {
      const options = field.options.map((o) => ({ label: o, value: o }));

      return (
        <Dropdown
          label={field.view_name}
          value={value}
          onChange={onChange}
          options={options}
          multiselect={true}
        />
      );
    }

    //Exception for 'gender' dropdown
    if (field.name === "gender") {
      return (
        <GenderFieldComponent
          hint={t("field-gender_hint")}
          label={field.view_name}
          value={value}
          onChange={onChange}
          options={field.options}
        />
      );
    }

    //Exception for 'sexual_orientation' dropdown
    if (field.name === "sexual_orientation") {
      return (
        <GenderFieldComponent
          hint={t("field-orientation_hint")}
          label={field.view_name}
          value={value}
          onChange={onChange}
          options={field.options}
        />
      );
    }

    //Exception for hair color
    if (colorInputsNames.includes(field.name)) {
      const options = field.options.map((o) => ({ label: o, value: o }));

      return (
        <ColorInput
          label={field.view_name}
          value={value}
          onChange={onChange}
          options={options}
        />
      );
    }

    //Dropdowns, if options length > 0 it's a dropdown
    if (field.type === "String" && field?.options?.length) {
      const options = field.options.map((o) => ({ label: o, value: o }));

      return (
        <Dropdown
          label={field.view_name}
          value={value}
          onChange={onChange}
          options={options}
        />
      );
    }

    //Radio inputs
    if (field.type === "Boolean") {
      return (
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
      );
    }

    //Exception for height input  'Children'
    if (field.type === "Integer" && field.name === "children") {
      return (
        <ChildrenInputComponent
          label={field.view_name}
          value={value ? String(value) : ""}
          onChange={onChange}
        />
      );
    }

    //Exception for height input  'Integer'
    if (field.type === "Integer" && field.name === "hight") {
      return (
        <HeightFieldComponent
          label={field.view_name}
          value={value}
          onChange={onChange}
        />
      );
    }

    //Integer inputs
    if (field.type === "Integer") {
      return (
        <Input
          type="number"
          label={field.view_name}
          value={value || ""}
          onChange={onChange}
        />
      );
    }

    //Textarea inputs
    if (field.type === "Text") {
      let error;
      if (value?.length > 1000) {
        error = "Maximum 1000 characters !";
      }
      return (
        <StyledTextarea
          label={field.view_name}
          value={value || ""}
          onChange={onChange}
          error={error}
          hint={`${value?.length || 0}/1000`}
        />
      );
    }

    //Hide State if country no US
    if (field.name === "state" && selectedCountryId !== USCountryCode) {
      return null;
    }

    //Dropdowns with fetchable options
    if (field.type === "ForeignKey") {
      return (
        <Dropdown
          label={field.view_name}
          value={value}
          onChange={onChange}
          options={fetchedOptions}
          loading={isFetching}
        />
      );
    }
  }
);

export default FieldInputComponent;
