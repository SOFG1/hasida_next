import React, { useMemo } from "react";
import styled from "styled-components";
import { StyledWrapper } from "../StyledWrapper/StyledWrapper";
import { StyledLabel } from "../StyledLabel/StyledLabel";
import { PencilIcon } from "../SVG";
import { IField } from "../../api/user";
import { useTranslation } from "react-i18next";

const Wrapper = styled(StyledWrapper)`
  min-height: 51px;
  width: 100%;
  cursor: pointer;
  svg {
    margin-inline-start: auto;
    margin-inline-end: 25px;
  }
`;

const StyledValue = styled.p`
  padding: 15px 23px;
  line-height: 1.32;
  letter-spacing: 0.01em;
`;

interface IProps {
  value?: any;
  field: IField;
  onClick: () => void;
}

const InputPlaceholder = React.memo(({ value, field, onClick }: IProps) => {
  const { t } = useTranslation();
  const valueString = useMemo(() => {
    if (typeof value === "string") return value;
    if (typeof value === "number") return value;
    if (value.label) return value.label;
    if (value.name) return value.name;
    if (typeof value === "boolean") {
      return value ? t("field-yes") : t("field-no");
    }
  }, [value]);

  return (
    <Wrapper onClick={onClick}>
      <StyledValue>{valueString}</StyledValue>
      <StyledLabel isActive={!!valueString || typeof value === 'number'}>{field.view_name}</StyledLabel>
      <PencilIcon />
    </Wrapper>
  );
});

export default InputPlaceholder;
