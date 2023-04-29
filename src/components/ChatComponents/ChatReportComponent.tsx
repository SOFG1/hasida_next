import React, { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Modal } from "../../UI/Modal";
import {
  useChatComplainMutation,
  useChatGetComplainDetailsQuery,
} from "../../api/chat";
import { Dropdown, OptionType } from "../../UI/Dropdown";
import { Textarea } from "../../UI/Textarea";
import { Button } from "../../UI/Button";
import { Loader2 } from "../../UI/Loader";

const StyledReport = styled.button`
  background-color: transparent;
  padding: 0;
  border: 0;
  font-size: 10px;
  font-weight: 300;
  color: #ff3d00;
  cursor: pointer;
`;

const StyledContent = styled.div`
  width: 500px;
  @media screen and (max-width: 700px) {
    width: 400px;
  }
  @media screen and (max-width: 550px) {
    width: 280px;
  }
`;

const StyledDropdown = styled(Dropdown)`
  margin-bottom: 20px;
`;

const StyledTextarea = styled(Textarea)``;

const StyledButton = styled(Button)`
  width: 100%;
`;

const id = 1


const ChatReportComponent = React.memo(() => {
  const { t } = useTranslation();
  const [opened, setOpened] = useState<boolean>(false);
  const { data, isFetching } = useChatGetComplainDetailsQuery(undefined, {
    skip: !opened,
  });
  const [complain, {data: response, isLoading}] = useChatComplainMutation()
  const [reason, setReason] = useState<null | OptionType>(null);
  const [description, setDescription] = useState<string>("");

  const reasonOptions = useMemo(() => {
    return data?.map((o: string) => ({ label: o, value: o })) || [];
  }, [data]);

  const handleComplain = useCallback(() => {
    complain({id, reason: reason?.value, description})
    .unwrap()
    .then(() => setOpened(false))
    .catch(() => setOpened(false))
  }, [complain, id, reason, description])

  return (
    <>
      {opened && (
        <Modal onClose={() => setOpened(false)}>
          <StyledContent>
            {isFetching ? (
              <Loader2 />
            ) : (
              <>
                <StyledDropdown
                  label={t("chat_report-reason")}
                  value={reason}
                  onChange={setReason}
                  options={reasonOptions}
                />
                <StyledTextarea
                  label={t("chat_report-description")}
                  value={description}
                  onChange={setDescription}
                />
                <StyledButton onClick={handleComplain} disabled={isLoading || !reason}>{t("chat_report-btn")}</StyledButton>
              </>
            )}
          </StyledContent>
        </Modal>
      )}
      <StyledReport onClick={() => setOpened(true)}>
        {t("chat_report")}
      </StyledReport>
    </>
  );
});

export default ChatReportComponent;
