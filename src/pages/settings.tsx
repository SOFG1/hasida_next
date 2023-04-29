import React from "react";
import styled from "styled-components";
import { Header } from "../components/common";
import { PageContent } from "../UI/PageContent/PageContent";
import { SubTitle } from "../UI/Title";
import { useTranslation } from "react-i18next";
import { MembershipView } from "../views/SettingsViews";

const HeaderStyled = styled(Header)`
  position: sticky;
  background-color: #fff;
`

const StyledTitle = styled(SubTitle)`
    margin-bottom: 40px;
`

const SettingsPage = React.memo(() => {
  const {t} = useTranslation()
    return <PageContent>
        <HeaderStyled />
        <StyledTitle>{t("settings_title")}</StyledTitle>
        <MembershipView />
    </PageContent>
})

export default SettingsPage