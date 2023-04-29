import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import UpgradeComponent from "../../components/common/UpgradeComponent";

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  max-width: 1135px;
`;

const StyledText = styled.p`
  font-weight: 300;
  font-size: 14px;
  margin-inline-end: 10px;
`;

const StyledMembership = styled.p`
  padding: 7px 17px;
  background-color: #f9f3dd;
  border-radius: 20px;
  font-weight: 600;
  font-size: 20px;
  margin-inline-end: 20px;
`;

const UpgradeBtn = styled.button`
  font-weight: 600;
  font-size: 14px;
  color: #2a9b9f;
  background-color: transparent;
  border: 0;
  cursor: pointer;
  transition: 150ms;
  &:hover {
    opacity: 0.75;
  }
  @media screen and (max-width: 550px) {
    margin-inline-start: auto;
  }
`;

const MembershipView = React.memo(() => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState<boolean>(false);
  return (
    <>
      {showModal && <UpgradeComponent onClose={() => setShowModal(false)} />}
      <StyledWrapper>
        <StyledText>{t("account_membership")}</StyledText>
        <StyledMembership>{t("account_membership-silver")}</StyledMembership>
        <UpgradeBtn onClick={() => setShowModal(true)}>
          {t("account_membership-upgrade")}
        </UpgradeBtn>
      </StyledWrapper>
    </>
  );
});

export default MembershipView;
