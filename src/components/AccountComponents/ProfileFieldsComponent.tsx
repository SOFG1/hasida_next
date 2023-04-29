import React, {useMemo, useState} from "react";
import {
  IField,
  useUserGetFieldsQuery,
  useUserInfoQuery,
} from "../../api/user";
import { InputPlaceholder } from "../../UI/InputPlaceholder";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Button } from "../../UI/Button";
import { Loader } from "../../UI/Loader";
import { IsraelCountryCode, incomeOptions } from "../../constants";
import { secondColumn, thirdColumn } from "../../store/user";

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const StyledColumn = styled.div`
  width: 30%;
  @media screen and (max-width: 1200px) {
    width: 47%;
  }
  @media screen and (max-width: 550px) {
    width: 100%;
  }
`;

const StyledTitle = styled.p`
  min-height: 51px;
  font-size: 24px;
  font-weight: 700;
`;

const StyledBtn = styled(Button)`
  width: 100%;
  margin-bottom: 26px;
`;

const StyledLoader = styled(Loader)`
  margin: 20px auto;
`;

interface IProps {
  switchEditMode: () => void;
}

const ProfileFieldsComponent = React.memo(({ switchEditMode }: IProps) => {
  const { t } = useTranslation();
  const { data: fields, isFetching: isFetchingFields } =
    useUserGetFieldsQuery();
  const { data: userInfo, isFetching: isFetchingInfo } = useUserInfoQuery();
  const [isShowFirstColumn, setIsShowFirstColumn] = useState<boolean>(false);
  const [isShowSecondColumn, setIsShowSecondColumn] = useState<boolean>(false);
  const [isShowThirdColumn, setIsShowThirdColumn] = useState<boolean>(false);

  const fieldsFiltered: IField[] = useMemo(() => {
    return fields?.filter((f) => f.is_profile) || [];
  }, [fields]);

  if (isFetchingFields || isFetchingInfo) {
    return <StyledLoader />;
  }

  return (
    <>
      <StyledContainer>
        <StyledColumn>
          {isShowFirstColumn && <StyledTitle>{t("account_column1")}</StyledTitle>}
          {fieldsFiltered.map((f) => {
            if (!userInfo?.profile[f.name]) return null;
            if (secondColumn.includes(f.name)) return null;
            if (thirdColumn.includes(f.name)) return null;
            if (
              userInfo?.profile[f.name].length !== 0 ||
              typeof userInfo?.profile[f.name] === "number"
            ) {
              !isShowFirstColumn && setIsShowFirstColumn(true);
              return (
                <InputPlaceholder
                  key={f.id}
                  field={f}
                  value={userInfo?.profile[f.name]}
                  onClick={switchEditMode}
                />
              );
            }
          })}
        </StyledColumn>
        <StyledColumn>
          {isShowSecondColumn && <StyledTitle>{t("account_column2")}</StyledTitle>}
          {fieldsFiltered.map((f) => {
            if (!secondColumn.includes(f.name)) return null;
            if (!userInfo?.profile[f.name]) return null;
            if (
              userInfo?.profile[f.name].length !== 0 ||
              typeof userInfo?.profile[f.name] === "number"
            ) {
              !isShowSecondColumn && setIsShowSecondColumn(true);
              return (
                <InputPlaceholder
                  key={f.id}
                  field={f}
                  value={userInfo?.profile[f.name]}
                  onClick={switchEditMode}
                />
              );
            }
          })}
        </StyledColumn>
        <StyledColumn>
          {isShowThirdColumn && <StyledTitle>{t("account_column3")}</StyledTitle>}
          {fieldsFiltered.map((f) => {
            if (!thirdColumn.includes(f.name)) return null;
            if (!userInfo?.profile[f.name]) return null;
            if (
              userInfo?.profile[f.name].length !== 0 ||
              typeof userInfo?.profile[f.name] === "number"
            ) {
              let value = userInfo?.profile[f.name];
              //Exception for income
              if (
                f.name === "income" &&
                userInfo?.profile.country.id === IsraelCountryCode
              ) {
                const opt = incomeOptions[IsraelCountryCode].find(
                  (o) => o.value === value
                );
                value = opt?.label || value;
              }
              !isShowThirdColumn && setIsShowThirdColumn(true);
              return (
                <InputPlaceholder
                  key={f.id}
                  field={f}
                  value={value}
                  onClick={switchEditMode}
                />
              );
            }
          })}
        </StyledColumn>
      </StyledContainer>
      <StyledBtn onClick={switchEditMode}>{t("account_info-edit")}</StyledBtn>
    </>
  );
});

export default ProfileFieldsComponent;
