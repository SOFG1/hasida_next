import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { PageContent } from "@/UI/PageContent/PageContent";
import { ChatView, DialogsView } from "@/views/ChatViews";
import { Header } from "@/components/common";

const HeaderStyled = styled(Header)`
  position: sticky;
  background-color: #fff;
`;

const ChatPage = React.memo(() => {
  const {query} = useRouter();

  console.log(query)

  return (
    <PageContent>
      <HeaderStyled />
      <DialogsView />
      {/* <ChatView /> */}
    </PageContent>
  );
});

export default ChatPage;
