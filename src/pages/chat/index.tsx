import React from "react";
import styled from "styled-components";
import { PageContent } from "@/UI/PageContent/PageContent";
import { ChatView, DialogsView } from "@/views/ChatViews";
import { Header } from "@/components/common";

const HeaderStyled = styled(Header)`
  position: sticky;
  background-color: #fff;
`;

const ChatPage = React.memo(() => {
  return (
    <PageContent>
      <HeaderStyled />
      <DialogsView />
    </PageContent>
  );
});

export default ChatPage;
