import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Modal } from "../../UI/Modal";
import { Title } from "../../UI/Title";
import UpgradeCardComponent from "./UpgradeCardComponent";
import { useGetTariffsQuery, usePayTariffMutation } from "../../api/settings";
import { useUserInfoQuery } from "../../api/user";
import { Loader } from "../../UI/Loader";
import { useDispatch } from "react-redux";
import { setAlert } from "../../store/app";

const StyledBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 24px;
`;

const StyledLabel = styled.p`
  font-weight: 300;
  font-size: 14px;
`;

const StyledMembership = styled.p`
  padding: 7px 17px;
  background-color: #f9f3dd;
  border-radius: 20px;
  font-weight: 600;
  font-size: 20px;
`;

const StyledTitle = styled(Title)`
  margin-bottom: 20px;
`;

const StyledText = styled.p`
  margin-bottom: 27px;
`;

const StyledCards = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 21px;
  padding-bottom: 15px;
  @media screen and (max-width: 720px) {
    justify-content: flex-start;
    overflow: auto;
  }
`;

interface IProps {
  onClose: () => void;
}

const UpgradeComponent = React.memo(({ onClose }: IProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch()

  const { data: tariffs, isFetching } = useGetTariffsQuery();
  const [payTariff, { data, isLoading }] = usePayTariffMutation();

  const handlePay = useCallback(
    (id: number) => {
      payTariff(id)
        .unwrap()
        .catch((text: any) => {
          onClose()
          dispatch(setAlert({isError: true, text}))
        });
    },
    [payTariff]
  );

  return (
    <Modal onClose={onClose}>
      <StyledBox>
        <StyledLabel>{t("upgrade_membership")}</StyledLabel>
        <StyledMembership>{t("account_membership-silver")}</StyledMembership>
      </StyledBox>
      <StyledTitle>{t("upgrade_title")}</StyledTitle>
      <StyledText>{t("upgrade_text")}</StyledText>
      {!isFetching ? (
        <StyledCards>
          <UpgradeCardComponent
            tariff={{
              id: 1,
              name: "Silver",
              description: "Simple tariff",
              amount: 100,
            }}
            isSmall={true}
          />
          {tariffs?.map((t) => {
            return (
              <UpgradeCardComponent
                tariff={t}
                isSmall={true}
                key={t.id}
                onPay={() => handlePay(t.id)}
              />
            );
          })}
        </StyledCards>
      ) : (
        <Loader />
      )}
    </Modal>
  );
});

export default UpgradeComponent;
