import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import avatar from "../../../public/images/avatar.png";
import {
  FamilyIcon,
  ReadMessageIcon,
  SendIcon,
  UnreadMessageIcon,
} from "../../UI/SVG";
import { useTranslation } from "react-i18next";
import { ChatReportComponent } from "../../components/ChatComponents";
import {
  useChatGetDialogsQuery,
  useChatGetMessagesQuery,
  useChatSetMessagesReadMutation,
} from "../../api/chat";
import { getSocketInstance, hostUrl } from "../../api";
import { useDispatch, useSelector } from "react-redux";
import { userTokenSelector } from "../../store/user";
import { Loader2 } from "../../UI/Loader";
import { useUserInfoQuery } from "../../api/user";
import Image from "next/image";

const StyledWrapper = styled.div`
  position: relative;
  flex-grow: 1;
  padding: 0 15px 24px;
  box-shadow: 3px 5px 16px rgba(0, 0, 0, 0.07);
  border-radius: 27px;
  width: 100%;
  margin-bottom: 57px;
`;

const StyledHeader = styled.div`
  background-color: #fff;
  display: flex;
  align-items: center;
  gap: 13px;
  margin-bottom: 10px;
`;

const StyledAvatar = styled(Image)`
  height: 60px;
  width: 60px;
  border-radius: 50%;
  object-fit: cover;
`;

const StyledName = styled.p`
  font-weight: 700;
  font-size: 18px;
  margin-inline-end: auto;
`;

const StyledText = styled.p`
  text-align: center;
  font-size: 10px;
  font-weight: 300;
  margin-bottom: 20px;
`;

const StyledList = styled.div`
  max-height: calc(100vh - 500px);
  overflow-y: auto;
  margin-bottom: 35px;
  @media screen and (max-width: 700px) {
    max-height: 65vh;
  }
`;

const StyledMessage = styled.div<{ fromMe: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${({ fromMe }) => (fromMe ? "flex-start" : "flex-end")};
  margin-bottom: 10px;
`;

const StyledMessageBox = styled.div<{ fromMe: boolean }>`
  display: flex;
  background: ${({ fromMe }) => (fromMe ? "#FFF7D7" : "#2A9B9F")};
  text-align: ${({ fromMe }) => (fromMe ? "start" : "end")};
  align-items: center;
  padding: 10px 12px;
  min-width: 80px;
  border-radius: 7px;
  margin-bottom: 3px;
  gap: 15px;
`;

const StyledMessageText = styled.p`
  font-size: 14px;
  font-weight: 300;
`;

const StlyedMsgDate = styled.p`
  font-size: 10px;
  color: #000;
`;

const StyledForm = styled.div`
  display: flex;
  align-items: center;
  padding: 0 16px;
  border: 1px solid rgba(48, 61, 69, 0.42);
  border-radius: 51px;
  margin-bottom: 5px;
`;

const StyledInput = styled.input`
  flex-grow: 1;
  resize: none;
  border: 0;
  border-radius: 15px;
  outline: none;
  height: 36px;
`;

const StyledBtn = styled.button`
  border: 0;
  padding: 0;
  background-color: transparent;
  cursor: pointer;
`;

const MessageLoader = styled(Loader2)`
  margin-inline-end: 20px;
  height: 30px;
  width: 30px;
  margin-bottom: 20px;
`;

interface IProps {
  chatId?: number;
}

const ChatView = React.memo(({ chatId }: IProps) => {
  const { t } = useTranslation();
  const token = useSelector(userTokenSelector);
  const { data: userInfo } = useUserInfoQuery();
  const [setRead] = useChatSetMessagesReadMutation();
  const listRef = useRef<HTMLDivElement>(null);
  const [text, setText] = useState<string>("");
  const [isSendingMessage, setIsSendingMessage] = useState<boolean>(false);

  const { data: dialogs } = useChatGetDialogsQuery();

  const { data: messages, error } = useChatGetMessagesQuery(chatId as number, {
    skip: !chatId,
  });

  console.log(error)

  const opponent = useMemo(() => {
    const dialog = dialogs?.find((d) => d.id === chatId);
    if (dialog) return dialog.opponent;
  }, [dialogs, chatId]);

  const avatarUrl = useMemo(() => {
    return opponent?.main_photo
      ? `${hostUrl}${opponent.main_photo.url}`
      : avatar;
  }, [opponent]);

  const handleSendMessage = useCallback(() => {
    if (!text) return;

    //Unique id for this message
    const uid = `${opponent?.id}-${new Date().getTime()}`;

    const data = {
      event_type: "message",
      data: {
        dialog_id: chatId,
        text,
      },
      uid,
    };
    setText("");
    setIsSendingMessage(true);
    getSocketInstance(token)?.send(JSON.stringify(data));
  }, [token, opponent, chatId, text, chatId]);

  const handleEnterClick = useCallback(
    (e: any) => {
      if (e.key === "Enter") handleSendMessage();
    },
    [handleSendMessage]
  );

  //Hide loader when messages updated
  useEffect(() => {
    setIsSendingMessage(false);
  }, [messages]);

  //Set all messages as 'read' on open
  useEffect(() => {
    const unreadList = messages
      ?.filter((m) => m.read === false)
      .filter((m) => m.sender_id !== userInfo?.id)
      .map((m) => m.id);
    if (unreadList && chatId) {
      setRead({ dialog_id: chatId, messages: unreadList });
    }
  }, [messages, userInfo, chatId]);

  //Scroll to bottom of the list
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTo({
        top: listRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [listRef.current, messages, isSendingMessage]);

  if (!chatId) return null;

  return (
    <StyledWrapper>
      <StyledHeader>
        <StyledAvatar
          src={avatarUrl}
          height={60}
          width={60}
          alt="User avatar"
        />
        <StyledName>
          {opponent?.first_name}
          {opponent?.age && `, ${opponent.age}`}
        </StyledName>
        <FamilyIcon />
      </StyledHeader>
      <StyledText>{t("chat_matched", { days: 5 })}</StyledText>
      <StyledList ref={listRef}>
        {messages
          ?.map((m) => {
            const showReadStatus = m.sender_id === userInfo?.id;
            return (
              <StyledMessage key={m.id} fromMe={m.sender_id !== userInfo?.id}>
                <StyledMessageBox fromMe={m.sender_id !== userInfo?.id}>
                  {showReadStatus && m.read === true && <ReadMessageIcon />}
                  {showReadStatus && m.read === false && <UnreadMessageIcon />}
                  <StyledMessageText>{m.text}</StyledMessageText>
                </StyledMessageBox>
                <StlyedMsgDate>
                  {new Date(Number(m.date) * 1000).toLocaleTimeString()}
                </StlyedMsgDate>
              </StyledMessage>
            );
          })
          .reverse()}
        {messages?.length === 0 && <StyledText>No messages yet</StyledText>}
        {isSendingMessage && <MessageLoader />}
      </StyledList>
      <StyledForm>
        <StyledInput
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleEnterClick}
        />
        <StyledBtn onClick={handleSendMessage} disabled={!text}>
          <SendIcon />
        </StyledBtn>
      </StyledForm>
      <ChatReportComponent />
    </StyledWrapper>
  );
});

export default ChatView;
