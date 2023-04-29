import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  AvatarComponent,
  EditProfileComponent,
  ProfileFieldsComponent,
} from "../../components/AccountComponents";
import { SubTitle } from "../../UI/Title";
import { useTranslation } from "react-i18next";

const StyledWrapper = styled.div`
  margin: 0 auto;
  max-width: 1135px;
`;

const StyledTitle = styled(SubTitle)`
  margin-bottom: 20px;
  @media screen and (max-width: 1050px) {
    margin-bottom: 10px;
  }
`;

const StyledAvatar = styled(AvatarComponent)`
  margin-bottom: 27px;
  @media screen and (max-width: 1050px) {
    margin-bottom: 20px;
  }
`;

const StyledForm = styled.div`
  padding: 15px 0;
`

const AccountView = React.memo(() => {
  const { t } = useTranslation();
  const formRef = useRef<HTMLDivElement>(null);
  const [editMode, setEditMode] = useState<boolean>(false);

  const handleClickOutside = useCallback(
    (e: any) => {
      if (!e?.composedPath()?.includes(formRef.current)) {
        setEditMode(false);
      }
    },
    [formRef.current]
  );

  useEffect(() => {
    if (editMode) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleClickOutside, editMode]);

  return (
    <StyledWrapper>
        <StyledTitle>{t("account_title")}</StyledTitle>
      <StyledAvatar />
      <StyledForm ref={formRef}>
        {!editMode && (
          <ProfileFieldsComponent switchEditMode={() => setEditMode(true)} />
        )}
        {editMode && (
          <EditProfileComponent switchEditMode={() => setEditMode(false)} />
        )}
      </StyledForm>
    </StyledWrapper>
  );
});

export default AccountView;
