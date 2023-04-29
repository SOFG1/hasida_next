import React from "react";
import styled from "styled-components";
import { SignInView } from "../views/SignInViews";
import backgroundImg from '../../public/images/sign-in-background.png'
import { Header } from "../components/common";

const Page = styled.div`
    background-image: url(${backgroundImg.src});
    background-position: top left;
    background-repeat: no-repeat;
    background-size: cover;
`;


const SignInPage = React.memo(() => {
  return (
    <Page>
      <Header />
      <SignInView />
    </Page>
  );
});

export default SignInPage;
