import React, { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import {
  IField,
  useUserEditProfileMutation,
  useUserGetFieldsQuery,
} from "../../api/user";
import {
  FieldInputComponent,
  Header,
  UploadPhotosComponent,
} from "../../components/common";
import {
  SignUpSteps,
  SuggestionModal,
} from "../../components/SignUpComponents";
import posterImg from "../../../public/images/sign-up2-image.png";
import { Button } from "../../UI/Button";
import { Loader } from "../../UI/Loader";
import { Radio } from "../../UI/Radio";
import { SubTitle, Title } from "../../UI/Title";
import { convertFormData, getFormatDate } from "../../utils";
import Image from "next/image";

const Wrapper = styled.div`
  display: flex;
`;

const StyledPoster = styled(Image)`
  width: 43%;
  min-height: 100%;
  object-fit: cover;
  object-position: top center;
  border-start-end-radius: 30px;
  border-end-end-radius: 30px;
  margin-inline-end: 15px;
  @media screen and (max-width: 830px) {
    display: none;
  }
`;

const StyledContent = styled.div`
  max-width: 665px;
  padding: 0 15px;
  flex-grow: 1;
  @media screen and (max-width: 830px) {
    margin: 0 auto;
  }
`;

const StyledTitle = styled(Title)`
  margin-bottom: 20px;
`;

const StyledSubtitle = styled(SubTitle)`
  margin-bottom: 20px;
`;

const StyledText = styled.p`
  text-align: center;
  margin-bottom: 8px;
`;

const StyledBtn = styled(Button)`
  width: 100%;
  margin-bottom: 6px;
`;

const PrivacyBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 300;
  font-size: 12px;
  margin-bottom: 33px;
  span {
    color: #2a9b9f;
  }
`;

const SignUpStep2 = React.memo(() => {
  const { t } = useTranslation();
  const { data: fields, isFetching } = useUserGetFieldsQuery();
  const [editProfile, { isLoading: isEditing }] = useUserEditProfileMutation();
  const [formData, setFormData] = useState<{ [key: string]: any }>({});
  const [showSuggestion, setShowSuggestion] = useState<boolean>(false);

  const [accepted, setAccepted] = useState<boolean>(false);

  const handleSetFormData = useCallback((key: string, value: any) => {
    setFormData((p) => {
      return {
        ...p,
        [key]: value,
      };
    });
  }, []);

  const Step2Fields = useMemo(() => {
    return (
      fields
        ?.filter((f: IField) => f.is_registration)
        .filter((f: IField) => f.step === 2) || []
    );
  }, [fields]);

  const handleSubmit = useCallback(() => {
    const requestData: { [key: string]: any } = convertFormData(formData);
    editProfile(requestData)
      .unwrap()
      .then(() => {
        setShowSuggestion(true);
      });
  }, [formData, editProfile]);

  return (
    <Wrapper>
      <SuggestionModal
        show={showSuggestion}
        onClose={() => setShowSuggestion(false)}
      />
      <StyledPoster src={posterImg} alt="Poster" />
      <StyledContent>
        <Header />
        {(isFetching || isEditing) && <Loader />}
        {!isFetching && !isEditing && (
          <>
            <StyledTitle>{t("sign-up_title")}</StyledTitle>
            <SignUpSteps activeStep="2" />
            <StyledSubtitle>{t("sign-up2_subtitle")}</StyledSubtitle>
            <StyledText>{t("sign-up2_images-label")}</StyledText>
            <UploadPhotosComponent />
            {Step2Fields.map((f) => {
              let hint;
              if(f.name === 'birth_date' || f.name === 'mobile_phone') {
                hint = t('field-privacy');
              }
              return (
                <FieldInputComponent
                  field={f}
                  value={formData[f.name]}
                  onChange={(v) => handleSetFormData(f.name, v)}
                  key={f.id}
                  selectedCountryId={formData.country?.value}
                  selectedStateId={formData.state?.value}
                  hint={hint}
                  
                />
              );
            })}
            <StyledBtn disabled={!accepted || isEditing} onClick={handleSubmit}>
              {t("sign-up_next")}
            </StyledBtn>
            <PrivacyBox>
              <Radio
                active={accepted}
                onChange={(v) => setAccepted(v)}
                label={
                  <p
                    dangerouslySetInnerHTML={{ __html: t("sign-up2_privacy") as string }}
                  ></p>
                }
              />
            </PrivacyBox>
          </>
        )}
      </StyledContent>
    </Wrapper>
  );
});

export default SignUpStep2;
