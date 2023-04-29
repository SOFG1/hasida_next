import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { Button } from "../../UI/Button";
import { Input } from "../../UI/Input";
import { FacebookIcon, GoogleIcon } from "../../UI/SVG";
import { Title } from "../../UI/Title";
import { useTranslation } from "react-i18next";
import PassRestoreView from "./PassRestoreView";
import {
  facebookLoginUrl,
  googleLoginUrl,
  useUserLoginMutation,
} from "../../api/user";
import Link from "next/link";

const StyledWrapper = styled.div`
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
  margin-bottom: 26px;
`;

const StyledText = styled.p`
  font-size: 18px;
  margin-bottom: 26px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 3px;
  padding: 5px 2px;
  max-width: 536px;
  text-align: center;
  @media screen and (max-width: 700px) {
    font-size: 16px;
  }
`;

const StyledInput = styled(Input)`
  align-self: center;
  width: 100%;
  margin-bottom: 20px;
`;

const StyledPassInput = styled(StyledInput)`
  margin-bottom: 35px;
`;

const StyledBtn = styled(Button)`
  margin-bottom: 6px;
`;

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 3px;
  padding: 5px 2px;
  @media screen and (max-width: 460px) {
    flex-direction: column;
    gap: 6px;
  }
`;

const SignUpText = styled.p`
  max-width: 536px;
  font-size: 14px;
  font-weight: 300;
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

const StyledForgotPassword = styled.p`
  color: #2a9b9f;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
`;

const StyledQuickSignIn = styled.div`
  display: flex;
  max-width: 536px;
  align-items: center;
  justify-content: center;
  gap: 24px;
  margin-bottom: 31px;
  p {
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 3px;
    padding: 4px 2px;
  }
  span {
    display: block;
    flex-grow: 1;
    border-bottom: 1px solid #fdb0789e;
  }
`;

const StyledBox = styled.div`
  display: flex;
  gap: 25px;
  justify-content: center;
  align-items: center;
  svg {
    cursor: pointer;
  }
`;

const StyledError = styled.p`
  color: #e34040;
  font-size: 14px;
  text-align: center;
`;

const SignInView = React.memo(() => {
  const { t } = useTranslation();
  const [login, { data, error, isLoading }]: any = useUserLoginMutation();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleLogin = useCallback(() => {
    login({ email, password });
  }, [email, password, login]);

  const handleGoogleLogin = useCallback(() => {
    let interval: any;
    const childWindow = window.open(googleLoginUrl, "_blank", "popup");
    const handleMessage = (e: any) => {
      console.log(e);
    };

    interval = setInterval(() => {
      console.log(childWindow)
    }, 1000);

    setTimeout(() => {
      if (interval) {
        clearInterval(interval);
      }
    }, 30000);
  }, []);

  const handleFacebookLogin = useCallback(() => {
    const childWindow = window.open(facebookLoginUrl, "_blank", "popup");
  }, []);

  return (
    <>
      {showModal && <PassRestoreView onClose={() => setShowModal(false)} />}
      <StyledWrapper>
        <StyledTitle>{t("sign-in_title")}</StyledTitle>
        <StyledText>{t("sign-in_desc")}</StyledText>
        <StyledInput
          error={error?.email && error?.email[0]}
          type="email"
          value={email}
          onChange={setEmail}
          label={t("sign-in_email-label")}
        />
        <StyledPassInput
          error={error?.password && error?.password[0]}
          type="password"
          value={password}
          onChange={setPassword}
          label={t("sign-in_pass-label")}
        />
        <StyledBtn onClick={handleLogin} disabled={isLoading}>
          {t("sign-in_sign-in")}
        </StyledBtn>
        {error?.non_field_errors && (
          <StyledError>{error.non_field_errors[0]}</StyledError>
        )}
        {typeof error?.error === "string" && (
          <StyledError>{error.error}</StyledError>
        )}
        <StyledContainer>
          <SignUpText>
            {t("sign-in_no-account")}{" "}
            <StyledLink href="/sign-up">{t("sign-in_sign-up")}</StyledLink>
          </SignUpText>
          <StyledForgotPassword onClick={() => setShowModal(true)}>
            {t("sign-in_forgot-pass")}
          </StyledForgotPassword>
        </StyledContainer>
        <StyledQuickSignIn>
          <span></span>
          <p> {t("sign-in_quick")}</p>
          <span></span>
        </StyledQuickSignIn>
        <StyledBox>
          <div onClick={handleGoogleLogin}>
            <GoogleIcon />
          </div>
          <div onClick={handleFacebookLogin}>
            <FacebookIcon />
          </div>
        </StyledBox>
      </StyledWrapper>
    </>
  );
});

export default SignInView;
