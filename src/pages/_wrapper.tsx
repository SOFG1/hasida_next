import { Modal } from "@/UI/Modal";
import { getSocketInstance } from "@/api";
import { dashboardApi } from "@/api/dashboard";
import { useUserSetGeoLocationMutation, userApi } from "@/api/user";
import { Menu } from "@/components/common";
import { appAlertSelector, setAlert } from "@/store/app";
import { removeFeedData } from "@/store/home";
import { userTokenSelector } from "@/store/user";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  > div:last-child {
    flex-grow: 1;
  }
  @media screen and (max-width: 700px) {
    flex-direction: column;
  }
`;

const Content = styled.div<{ showMenu: boolean }>`
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  ${({ showMenu }) => showMenu && "padding-inline-start: 75px;"}
  @media screen and (max-width: 700px) {
    padding-inline-start: 0;
    ${({ showMenu }) => showMenu && "padding-bottom: 125px;"}
  }
`;


interface IProps {
  children: React.ReactNode;
}

const search = "success=tru";

const AppWrapper = ({ children }: IProps) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { i18n, t } = useTranslation();
  const appAlert = useSelector(appAlertSelector);
  const token = useSelector(userTokenSelector);
  const [setGeoLocation] = useUserSetGeoLocationMutation();

  const showMenu = useMemo(() => {
    return (
      !router.pathname.match("/sign-in") && !router.pathname.match("/sign-up")
    );
  }, [router.pathname]);

  //Update queries to get data in selected language
  useEffect(() => {
    dispatch(dashboardApi.util.invalidateTags(["Dashboard"]));
    dispatch(removeFeedData());
    dispatch(userApi.util.invalidateTags(["User", "Fields", "FieldOptions"]));
  }, [i18n.language]);

  //Create channel
  useEffect(() => {
    const socket = getSocketInstance(token);
  }, [token]);

  //navigate to main
  useEffect(() => {
    if (router.pathname === "/") {
      router.push("/home");
    }
  }, [router.pathname]);

  //Ask geolocation
  useEffect(() => {
    if (!token) return;

    navigator?.geolocation?.getCurrentPosition((g) => {
      if (g) {
        const lat = g.coords.latitude;
        const long = g.coords.longitude;
        setGeoLocation({ lat, long });
      }
    });
  }, [token, setGeoLocation]);

  //Show email confirmation
  useEffect(() => {
    if (router.pathname === "/popup") {
      const success = search.match("success=true");
      if (success) {
        dispatch(
          setAlert({ isError: false, text: t("sign-up_email-success") })
        );
      }
      const error = search.match("success=false");
      if (error) {
        dispatch(setAlert({ isError: true, text: t("sign-up_email-error") }));
      }
      router.push("/account");
    }
  }, [router.pathname, search, t]);

  return (
    <Wrapper>
      {appAlert && (
        <Modal onClose={() => dispatch(setAlert(null))}>{appAlert.text}</Modal>
      )}
      {showMenu && <Menu />}
      <Content showMenu={showMenu}>{children}</Content>
    </Wrapper>
  );
};

export default AppWrapper;
