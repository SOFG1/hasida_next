import React, { useCallback, useMemo } from "react";
import styled from "styled-components";
import HeaderLogo from "../../images/header-logo.png";
import {
  ChevronLeftIcon,
  InfoCircleIcon,
  InfoIcon,
  LogoutIcon,
} from "../../UI/SVG";
import LangDropdown from "./LangDropdown";
import { useDispatch, useSelector } from "react-redux";
import { resetUserSlice, userTokenSelector } from "../../store/user";
import { resetAppSlice } from "../../store/app";
import { resetDashboardSlice } from "../../store/dashboard";
import { resetHomeSlice } from "../../store/home";
import Image from "next/image";
import { useRouter } from "next/router";

const StyledWrapper = styled.div`
  display: flex;
  top: 0;
  z-index: 3;
  justify-content: center;
  margin-bottom: 20px;
`;

const Inner = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  max-width: 1150px;
  padding: 30px 15px 10px;
  margin: 0 auto;
`;

const StyledBox = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 15px;
`;

const StyledLink = styled.a`
  cursor: pointer;
`;

const StyledLogo = styled(Image)`
  height: 52px;
  width: 170px;
  object-fit: contain;
  @media screen and (max-width: 500px) {
    height: 32px;
    width: 110px;
  }
`;

const BackBtn = styled.button`
  border: 0;
  padding: 3px 5px;
  background-color: #fff;
  cursor: pointer;
  box-shadow: 1px 1px 3px #fff;
`;

const LogoutBtn = styled.button`
  padding: 0;
  border: 0;
  height: 41px;
  background-color: transparent;
  cursor: pointer;
  svg {
    height: 26px;
    width: 26px;
  }
`;

interface IProps {
  className?: string;
}
const Header = React.memo(({ className }: IProps) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isAuthorized = useSelector(userTokenSelector);

  const showBackwardBtn = useMemo(() => {
    return false;
  }, []);

  const handleLogout = useCallback(() => {
    dispatch(resetAppSlice());
    dispatch(resetDashboardSlice());
    dispatch(resetHomeSlice());
    dispatch(resetUserSlice());
  }, []);

  return (
    <StyledWrapper className={className}>
      <Inner>
        {showBackwardBtn ? (
          <BackBtn onClick={() => router.back()}>
            <ChevronLeftIcon />
          </BackBtn>
        ) : (
          <span></span>
        )}
        <StyledLogo
          src={HeaderLogo}
          height={52}
          width={170}
          alt="Header Logo"
        />
        <StyledBox>
          {isAuthorized && (
            <LogoutBtn onClick={handleLogout} title="Logout">
              <LogoutIcon />
            </LogoutBtn>
          )}
          <StyledLink href="https://www.hachasida.com/" target="_blank">
            <InfoCircleIcon />
          </StyledLink>
          <LangDropdown />
        </StyledBox>
      </Inner>
    </StyledWrapper>
  );
});

export default Header;
