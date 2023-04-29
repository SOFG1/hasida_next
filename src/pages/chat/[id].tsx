import React, { useEffect, useMemo } from "react";
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
  const { query, push } = useRouter();

  const chatId: number | undefined = useMemo(() => {
    if (query.id && /\d+/.test(String(query.id))) {
      return Number(query.id);
    }
  }, [query.id]);

  useEffect(() => {
    if (!chatId) push("/chat");
  }, [chatId, push]);

  return (
    <PageContent>
      <HeaderStyled />
      <DialogsView />
      <ChatView chatId={chatId}/> 
    </PageContent>
  );
});

export default ChatPage;
