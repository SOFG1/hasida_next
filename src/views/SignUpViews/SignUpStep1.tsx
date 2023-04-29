import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import backgroundImg from '../../../public/images/sign-in-background.png'
import { Header, MobilePhoneInput } from "../../components/common";
import { Title } from "../../UI/Title";
import { SignUpSteps, Step1Warning } from "../../components/SignUpComponents";
import { Input } from "../../UI/Input";
import { Button } from "../../UI/Button";
import { useTranslation } from "react-i18next";
import { useUserSignUpMutation } from "../../api/user";
import { useDispatch, useSelector } from "react-redux";
import { userTokenSelector } from "../../store/user";
import { setAlert } from "../../store/app";
import Link from "next/link";
import { useRouter } from "next/router";

const StyledWrapper = styled.div`
  position: relative;
  background-image: url(${backgroundImg});
  background-position: top left;
  background-repeat: no-repeat;
  background-size: contain;
  min-height: 1000px;
  flex-grow: 1;
  overflow: hidden;
  &::before {
    content: "";
    position: absolute;
    right: -82px;
    bottom: -93px;
    border-radius: 50%;
    height: 487px;
    width: 487px;
    background-color: #f9f3dd;
    z-index: -1;
    @media screen and (max-width: 700px) {
      height: 273px;
      width: 273px;
    }
  }
`;

const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 0 15px 200px;
`;

const StyledTitle = styled(Title)`
  margin-bottom: 20px;
`;

const StyledBtn = styled(Button)`
  margin-bottom: 6px;
`;

const SignInText = styled.p`
  text-align: center;
  max-width: 536px;
  font-size: 14px;
  font-weight: 300;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 3px;
  padding: 5px 2px;
  width: fit-content;
  margin: 0 auto 32px;
`;

const StyledLink = styled(Link)`
  font-weight: 600;
  font-size: 15px;
  line-height: 1.32;
  letter-spacing: 0.01em;
  color: #2a9b9f;
  text-decoration: none;
  margin-inline-start: 11px;
`;

const StyledError = styled.p`
  color: #e34040;
  font-size: 14px;
  text-align: center;
`;

const SignUpStep1 = React.memo(() => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const token = useSelector(userTokenSelector);
  const router = useRouter();
  const [signup, { data, error, isLoading }]: any = useUserSignUpMutation();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordRpt, setPassordRpt] = useState<string>("");
  const [mobilePhone, setMobilePhone] = useState("");
  const [agreed, setAgreed] = useState<boolean | null>(false);

  const handleSignUp = useCallback(() => {
    if (agreed === false) {
      setAgreed(true);
      return;
    }
    signup({
      email,
      password,
      password_confirmation: passwordRpt,
      mobile_phone: mobilePhone,
    })
      .unwrap()
      .then(() => {
        dispatch(
          setAlert({ isError: false, text: t("sign-up_email-confirm") })
        );
      });
  }, [email, password, passwordRpt, mobilePhone, agreed, t]);

  useEffect(() => {
    if (agreed === null) handleSignUp();
  }, [agreed]);

  useEffect(() => {
    if (token) router.push("2");
  }, [token]);

  //Show alert initial
  useEffect(() => {
    dispatch(setAlert({ isError: false, text: t("sign-up_step1-alert") }));
  }, []);

  return (
    <StyledWrapper>
      <Header />
      <StyledForm>
        <StyledTitle>{t("sign-up_title")}</StyledTitle>
        <SignUpSteps activeStep="1" />
        <Input
          type="email"
          label={t("sign-up_email-label")}
          value={email}
          onChange={setEmail}
        />
        <Input
          type="password"
          label={t("sign-up_pass-label")}
          value={password}
          onChange={setPassword}
        />
        <Input
          type="password"
          label={t("sign-up_pass-rpt-label")}
          value={passwordRpt}
          onChange={setPassordRpt}
        />
        <MobilePhoneInput
          label={t("sign-up_phone-label")}
          value={mobilePhone}
          onChange={setMobilePhone}
        />
        <StyledBtn onClick={handleSignUp} disabled={isLoading}>
          {t("sign-up_next")}
        </StyledBtn>
        {error && <StyledError>{error}</StyledError>}
        <SignInText dir="auto">
          {t("sign-up_have-acc")}
          <StyledLink href="/sign-in">{t("sign-up_sign-in")}</StyledLink>
        </SignInText>
        <SignInText>
          <StyledLink as="a" href="https://www.hachasida.com/" target="_blank">
            Privacy policy
          </StyledLink>
        </SignInText>
      </StyledForm>
      <Step1Warning
        show={agreed === true}
        onClose={() => setAgreed(false)}
        onAgree={() => setAgreed(null)}
      />
    </StyledWrapper>
  );
});

export default SignUpStep1;
