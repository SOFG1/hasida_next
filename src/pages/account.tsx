import React from "react";
import styled from "styled-components";
import { Header } from "../components/common";
import { PageContent } from "../UI/PageContent/PageContent";
import { AccountView } from "../views/AccountViews";
import { MembershipView } from "../views/SettingsViews";


const HeaderStyled = styled(Header)`
  position: sticky;
  background-color: #fff;
`


const AccountPage = React.memo(() => {
  return (
    <PageContent>
      <HeaderStyled />
      <AccountView />
      <MembershipView />
    </PageContent>
  );
});

export default AccountPage;
