import React from "react";
import styled from "styled-components";
import { SubTitle } from "../../UI/Title";
import { UserThumb } from "../../UI/UserThumb";
import { useTranslation } from "react-i18next";
import { useChatGetDialogsQuery } from "../../api/chat";
import { Loader2 } from "../../UI/Loader";
import { useRouter } from "next/router";

const StyledTitle = styled(SubTitle)`
  margin-bottom: 17px;
`;

const StyledList = styled.div`
  max-width: 100%;
  overflow-x: auto;
  min-height: 80px;
  display: flex;
  gap: 20px;
  margin-bottom: 32px;
`;

const DialogsView = React.memo(() => {
  const { t } = useTranslation();
  const router = useRouter();
  const { data, isFetching } = useChatGetDialogsQuery();


  return (
    <>
      <StyledTitle>{t("chat_title")}</StyledTitle>
      <StyledList>
        {isFetching && <Loader2 />}
        {!isFetching &&
          data?.map((d) => {
            return (
              <UserThumb
                key={d.id}
                name={d.opponent.first_name}
                imgUrl={d.opponent.main_photo?.url}
                onClick={() => router.push(`/chat/${d.id}`)}
              />
            );
          })}
      </StyledList>
    </>
  );
});

export default DialogsView;
