import React, { forwardRef } from "react";
import ReactDatePicker from "react-datepicker";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import { CustomInput } from "./CustomInput";
import CustomHeader from "./CustomHeader";
import { StyledMessage } from "../StyledMessage/StyledMessage";

const StyledContainer = styled.div`
position: relative;
  margin-bottom: 20px;
  .react-datepicker__day--keyboard-selected {
    background-color: #2A9B9F;
  }
  .react-datepicker__triangle {
    left: auto !important;
  }
`;

interface IProps {
  label: string;
  value: Date | null | undefined;
  onChange: (val: Date | null) => void;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  showTimeInput?: boolean;
  error?: string;
  hint?: string
  className?: string;
}

const DateInput = React.memo(
  ({
    label,
    value,
    onChange,
    disabled,
    minDate,
    maxDate,
    showTimeInput,
    error,
    hint,
    className,
  }: IProps) => {
    return (
      <StyledContainer className={className}>
        <ReactDatePicker
          selected={value || null}
          customInput={
            <CustomInput error={error} disabled={disabled} label={label} />
          }
          renderCustomHeader={CustomHeader}
          popperPlacement="bottom-end"
          onChange={onChange}
          popperClassName="date-input__popper"
          disabled={disabled}
          minDate={minDate}
          maxDate={maxDate}
          showTimeInput={showTimeInput}
        />
        {hint && <StyledMessage>{hint}</StyledMessage>}
      </StyledContainer>
    );
  }
);

export default DateInput;
