import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  useUserEditProfileMutation,
  useUserGetFieldsQuery,
  useUserInfoQuery,
} from "../../api/user";
import { FieldInputComponent } from "../common";
import styled from "styled-components";
import { Button } from "../../UI/Button";
import { convertFormData } from "../../utils";
import { useDispatch } from "react-redux";
import { setAlert } from "../../store/app";
import { convertApiData } from "../../utils/convertFormData";
import { USCountryCode } from "../../constants";
import { secondColumn, thirdColumn } from "../../store/user";
import { useRouter } from "next/router";

const StyledTitle = styled.p`
  min-height: 51px;
  font-size: 24px;
  font-weight: 700;
`;

const StyledBtn = styled(Button)`
  width: 100%;
  margin-bottom: 26px;
`;

interface IProps {
  switchEditMode: () => void;
}

const EditProfileComponent = React.memo(({ switchEditMode }: IProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: fields, isFetching: isFetchingFields } =
    useUserGetFieldsQuery();
  const { data: userInfo, isFetching: isFetchingInfo } = useUserInfoQuery();
  const [editProfile, { isLoading: isEditing }] = useUserEditProfileMutation();
  const [formData, setFormData] = useState<{ [key: string]: any }>({});

  const handleChange = useCallback((field: string, value: any) => {
      if(field === 'siblings' && value > 99) return;
    setFormData((p) => ({ ...p, [field]: value }));
  }, []);

  const handleSubmit = useCallback(() => {
    const requestData: { [key: string]: any } = convertFormData(formData);
    editProfile(requestData)
      .unwrap()
      .then(() => {
        dispatch(setAlert({ isError: false, text: "Successfully saved" }));
        router.push("/home");
        switchEditMode();
      });
  }, [formData, editProfile, router]);

  useEffect(() => {
    if (userInfo?.profile) {
      const existingData = convertApiData(fields || [], userInfo.profile);
      existingData.email = userInfo.email;
      setFormData(existingData);
    }
  }, [fields, userInfo?.profile]);

  if (isFetchingFields || isFetchingInfo) return null;

  return (
    <>
      <StyledTitle>{t("account_column1")}</StyledTitle>
      {fields?.map((f) => {
        if (f.name === "state" && formData.country?.value !== USCountryCode) {
          return null;
        }
        if (secondColumn.includes(f.name)) return null;
        if (thirdColumn.includes(f.name)) return null;
          let hint;
          if(f.name === 'email' || f.name === 'birth_date' || f.name === 'mobile_phone') {
              hint = t('field-privacy');
          }
        return (
          <FieldInputComponent
            key={f.id}
            field={f}
            value={formData[f.name]}
            onChange={(v) => handleChange(f.name, v)}
            selectedCountryId={formData.country?.value}
            selectedStateId={formData.state?.value}
            hint={hint}
          />
        );
      })}

      <StyledTitle>{t("account_column2")}</StyledTitle>
      {fields?.map((f) => {
        if (!secondColumn.includes(f.name)) return null;
        return (
          <FieldInputComponent
            key={f.id}
            field={f}
            value={formData[f.name]}
            onChange={(v) => handleChange(f.name, v)}
            selectedCountryId={formData.country?.value}
            selectedStateId={formData.state?.value}
          />
        );
      })}

      <StyledTitle>{t("account_column3")}</StyledTitle>
      {fields?.map((f) => {
        if (!thirdColumn.includes(f.name)) return null;
        return (
          <FieldInputComponent
            key={f.id}
            field={f}
            value={formData[f.name]}
            onChange={(v) => handleChange(f.name, v)}
            selectedCountryId={formData.country?.value}
            selectedStateId={formData.state?.value}
          />
        );
      })}
      <StyledBtn onClick={handleSubmit} disabled={isEditing}>
        {t("account_info-save")}
      </StyledBtn>
    </>
  );
});

export default EditProfileComponent;
