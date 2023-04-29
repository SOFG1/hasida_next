import React from "react";
import styled from "styled-components";

const StyledHeader = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin: 0;
  gap: 4px;
  justify-content: space-between;
`;

const MonthBtn = styled.button`
  position: relative;
  height: 1.67vw;
  width: 1.67vw;
  cursor: pointer;
  border: 0;
  background-color: transparent;
  span {
    position: absolute;
    left: 50%;
    top: 50%;
    height: 0.42vw;
    width: 0.42vw;
    border: 3px solid #ccc;
  }
  &:hover span {
    border-color: #9b9b9b;
  }
`;

const PrevBtn = styled(MonthBtn)`
  span {
    transform: translate(-30%, -50%) rotate(-45deg);
    border-right: 0;
    border-bottom: 0;
  }
`;

const NextBtn = styled(MonthBtn)`
  span {
    transform: translate(-70%, -50%) rotate(-45deg);
    border-top: 0;
    border-left: 0;
  }
`;

const years: number[] = [];
for (let y = 2023; y > 1920; y--) {
  years.push(y);
}

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const CustomHeader = ({
  date,
  changeYear,
  changeMonth,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
}: any) => (
  <StyledHeader>
    <PrevBtn onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
      <span></span>
    </PrevBtn>
    <select
      value={date.getFullYear()}
      onChange={({ target: { value } }) => changeYear(parseInt(value, 10))}
    >
      {years.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
    <select
      value={months[date.getMonth()]}
      onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
    >
      {months.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>

    <NextBtn onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
      <span></span>
    </NextBtn>
  </StyledHeader>
);

export default CustomHeader;
