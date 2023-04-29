import i18next from "i18next";
import React, { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { ChevronDownIcon, GlobeIcon } from "../../UI/SVG";
import { useDispatch } from "react-redux";

const StyledWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  &:hover svg {
    transform: rotateX(180deg);
  }
  &:hover > div:last-child {
    display: block;
  }
`;

const StyledSelectedLang = styled.p`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 4px;
  font-size: 14px;
  font-weight: 300;
`;

const StyledList = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 100%;
  display: none;
`;

const StyledLangItem = styled(StyledSelectedLang)`
  cursor: pointer;
  font-weight: 500;
`;

const availableLanguages: LangOptionType[] = [
  { name: "ENG", value: "en-US" },
  { name: "HE", value: "he" },
];

type LangOptionType = {
  name: string;
  value: string;
};

const LangDropdown = React.memo(() => {
  const { i18n, t } = useTranslation();
  document.body.dir = i18next.dir();

  const selectedLang: LangOptionType = useMemo(() => {
    if (i18n.language === "en-US" || i18n.language === "he") {
      return availableLanguages.find((l) => l?.value === i18n.language) as LangOptionType;
    }
    return { name: "ENG", value: "en-US" };
  }, [i18n.language]);

  const langOptions = useMemo(() => {
    return availableLanguages.filter((l) => l?.value !== selectedLang?.value);
  }, [selectedLang]);



  return (
    <StyledWrapper>
      <GlobeIcon />
      <StyledSelectedLang>
        {selectedLang?.name} <ChevronDownIcon />{" "}
      </StyledSelectedLang>
      <StyledList>
        {langOptions.map((l) => {
          return (
            <StyledLangItem onClick={() => i18next.changeLanguage(l.value)} key={l.value}>
              {l.name}
            </StyledLangItem>
          );
        })}
      </StyledList>
    </StyledWrapper>
  );
});

export default LangDropdown;
