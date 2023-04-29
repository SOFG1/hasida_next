import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import {
  useUserEditProfileMutation,
  useUserGetFieldsQuery,
  useUserInfoQuery,
} from "../../api/user";
import { FieldInputComponent, Header } from "../../components/common";
import {
  ProgressBar,
  SignUpSteps,
} from "../../components/SignUpComponents";
import posterImg from "../../../public/images/sign-up3-image.png";
import { Button } from "../../UI/Button";
import { Loader } from "../../UI/Loader";
import { Title } from "../../UI/Title";
import { convertFormData } from "../../utils";
import { useRouter } from "next/router";
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

const StyledProgressTitle = styled.p`
  font-weight: 700;
  text-align: center;
  font-size: 20px;
  margin-bottom: 20px;
`;

const StyledBtn = styled(Button)`
  width: 100%;
  margin-bottom: 6px;
`;

const SignUpStep3 = React.memo(() => {
  const { t } = useTranslation();
  const router = useRouter();
  const { data: fields, isFetching, isUninitialized } = useUserGetFieldsQuery();
  const { data: userInfo } = useUserInfoQuery();
  const [editProfile, { isLoading: isEditing }] = useUserEditProfileMutation();
  const [order, setOrder] = useState<number>(Number(location.pathname.split('/')[3]));
  const [formData, setFormData] = useState<{ [key: string]: any }>({});

  const handleSetFormData = useCallback((key: string, value: any) => {
    setFormData((p) => {
      return {
        ...p,
        [key]: value,
      };
    });
  }, []);

  const Step3Fields = useMemo(() => {
    return fields?.filter((f) => f.is_registration)
      .filter((f) => f.step === 3)
      .slice(order, order + 3)
  }, [fields, order]);


  useEffect(() => {
    setOrder(Number(location.pathname.split('/')[3]));
  }, [location.pathname.split('/')[3]]);

    // useEffect(() => {
    //     if (userInfo?.profile) {
    //         const existingData = convertApiData(fields || [], userInfo.profile);
    //         setFormData(existingData);
    //     }
    // }, [fields, userInfo?.profile]);


  useEffect(() => {
    if(Step3Fields?.length === 0 && fields) {
        router.push("/home");
    }
  }, [Step3Fields, fields, router])



  const handleSubmit = useCallback(() => {
    const requestData: { [key: string]: any } = convertFormData(formData)
    editProfile(requestData)
        .unwrap()
        .then(() => {
          router.push(`/sign-up/3`)
          setOrder(p => p + 3)
        });
  }, [formData, editProfile, order, router]);

  const compleetness = useMemo(() => {
    const infoArray = Object.values(userInfo?.profile || {a: 1})
    const oneFieldPercent = 100 / infoArray.length
    let addedFields = 0;
    infoArray.forEach((f) => {
      if (f === null || f?.length === 0) return;
      addedFields++;
    });
    return Number((addedFields * oneFieldPercent).toFixed(0));
  }, [userInfo?.profile]);

  return (
    <Wrapper>
      <StyledPoster src={posterImg} alt="Poster" />
      <StyledContent>
        <Header />
        {isFetching && <Loader />}
        {!isFetching && (
          <>
            <StyledTitle>{t("sign-up_title")}</StyledTitle>
            <SignUpSteps activeStep="3" />
            <StyledProgressTitle>{t("sign-up_progress")}</StyledProgressTitle>
            <ProgressBar compleetness={compleetness} />
            {Step3Fields?.map((f, index) => (
              <FieldInputComponent
                field={f}
                value={formData[f.name]}
                onChange={(v) => handleSetFormData(f.name, v)}
                key={f.id}
                selectedCountryId={formData.country?.value}
                selectedStateId={formData.state?.value}
              />
            ))}
            <StyledBtn disabled={isEditing} onClick={handleSubmit}>
              {t("sign-up_next")}
            </StyledBtn>
          </>
        )}
      </StyledContent>
    </Wrapper>
  );
});

export default SignUpStep3;
