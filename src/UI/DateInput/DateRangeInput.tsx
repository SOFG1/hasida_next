import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import DateInput from "./DateInput";

const StyledContainer = styled.div`
  position: relative;
  display: flex;
  gap: 15px;
  align-items: center;
  margin-bottom: 20px;
  .react-datepicker__day--keyboard-selected {
    background-color: #2a9b9f;
  }
  .react-datepicker__triangle {
    display: none;
  }
`;

const StyledLabel = styled.p`
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  flex-shrink: 0;
`;

const StyledInput = styled(DateInput)`
  flex-grow: 1;
  margin-bottom: 0;
`;

interface IProps {
  label: string;
  startDate: Date | null | undefined;
  endDate: Date | null | undefined;
  onChangeStart: (val: Date | null | undefined) => void;
  onChangeEnd: (val: Date | null | undefined) => void;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  showTimeInput?: boolean;
  error?: string;
  className?: string;
}

const DateRangeInput = React.memo(
  ({
    label,
    startDate,
    endDate,
    onChangeStart,
    onChangeEnd,
    disabled,
    minDate,
    maxDate,
    showTimeInput,
    error,
    className,
  }: IProps) => {
    const { t } = useTranslation();
    return (
      <StyledContainer className={className}>
        <StyledLabel>{label}</StyledLabel>
        <StyledInput
          label={t("date-from")}
          value={startDate}
          onChange={onChangeStart}
          disabled={disabled}
          error={error}
        />
        <StyledInput
          label={t("date-to")}
          value={endDate}
          onChange={onChangeEnd}
          disabled={disabled}
          error={error}
        />
      </StyledContainer>
    );
  }
);

export default DateRangeInput;
