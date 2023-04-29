import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import {
  AccountActiveIcon,
  AccountIcon,
  ChatActiveIcon,
  ChatIcon,
  DashboardActiveIcon,
  DashboardIcon,
  HomeActiveIcon,
  HomeIcon,
  SettingsActiveIcon,
  SettingsIcon,
} from "../../UI/SVG";
import Link from "next/link";
import { useRouter } from "next/router";

interface IMenuItem {
  name: string;
  path: string;
  order: string; //CSS 'order' property helps order menu item in the center
  activeOrder: string; //CSS 'order' property when menu item is selected(active)
  icon: FC;
  activeIcon: FC;
}

const useMenu = () => {
  const { t } = useTranslation();
  const menu: IMenuItem[] = [
    {
      name: t("menu_dashboard"),
      path: "/dashboard",
      order: "0",
      activeOrder: "5",
      icon: DashboardIcon,
      activeIcon: DashboardActiveIcon,
    },
    {
      name: t("menu_settings"),
      path: "/settings",
      order: "2",
      activeOrder: "5",
      icon: SettingsIcon,
      activeIcon: SettingsActiveIcon,
    },
    {
      name: t("menu_home"),
      path: "/home",
      order: "4",
      activeOrder: "4",
      icon: HomeIcon,
      activeIcon: HomeActiveIcon,
    },
    {
      name: t("menu_account"),
      path: "/account",
      order: "8",
      activeOrder: "3",
      icon: AccountIcon,
      activeIcon: AccountActiveIcon,
    },
    {
      name: t("menu_chat"),
      path: "/chat",
      order: "8",
      activeOrder: "3",
      icon: ChatIcon,
      activeIcon: ChatActiveIcon,
    },
  ];
  return menu;
};

const StyledMenu = styled.div<{ opened: boolean }>`
  display: flex;
  position: relative;
  ${({ opened }) => (opened ? "flex-basis: 240px;" : "padding: 0 10px;")}
  flex-shrink: 0;
  flex-direction: column;
  justify-content: center;
  gap: 30px;
  background-color: #f9f3dd;
  z-index: 5;
  > a {
    justify-content: ${({ opened }) => (opened ? "flex-end" : "center")};
  }
  @media screen and (max-width: 700px) {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    order: 1;
    flex-direction: row;
    justify-content: space-evenly;
    width: 100%;
    padding: 17px 0;
  }
`;

//We escaped boolean attribute in order to avoid console error: non-boolean attribute...
const MenuItem = styled(Link)<{
  order: string;
  active: number;
}>`
  //active:0 - false, active:1 - true
  display: flex;
  font: inherit;
  color: inherit;
  text-decoration: none;
  align-items: center;
  order: ${({ order }) => order};
  gap: 32px;
  font-weight: 300;
  padding: 0 ${({ active }) => (active ? "0" : "16px")};
  &:hover {
    font-weight: 700;
  }
  &:hover svg {
    opacity: 0.75;
  }
  @media screen and (max-width: 700px) {
    padding: 0;
    svg {
      height: 36px;
      width: 36px;
    }
  }
`;

const StyledActiveIcon = styled.div<{ closed: boolean }>`
  border-radius: 50%;
  flex-shrink: 0;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ closed }) => !closed && "border: 23px solid #fff;"}
  margin-inline-end: -75px;
  svg {
    background: #2a9b9f;
    height: 102px;
    width: 102px;
    padding: 17px;
    border-radius: 50%;
  }
  @media screen and (max-width: 700px) {
    margin-inline-end: 0;
    margin-top: -70px;
    border: 0;
    svg {
      height: 69px;
      width: 69px;
      padding: 12px;
    }
  }
  ${({ closed }) => closed && "margin-inline-end: 0;"}
`;

const MenuItemName = styled.p`
  @media screen and (max-width: 700px) {
    display: none;
  }
`;

const Menu = React.memo(() => {
  const { pathname } = useRouter();
  const menu = useMenu();
  const [opened, setOpened] = useState<boolean>(true);

  return (
    <StyledMenu onClick={() => setOpened(!opened)} opened={opened}>
      {menu.map((item) => {
        const isActive = !!pathname.match(item.path)
        const Icon = item.icon;
        const ActiveIcon = item.activeIcon;
        return (
          <MenuItem
            active={isActive ? 1 : 0}
            key={item.path}
            href={item.path}
            order={isActive ? item.activeOrder : item.order}
            onClick={(e: any) => e.stopPropagation()}
          >
            {opened && <MenuItemName>{item.name}</MenuItemName>}
            {isActive ? (
              <StyledActiveIcon closed={!opened}>
                <ActiveIcon />
              </StyledActiveIcon>
            ) : (
              <Icon />
            )}
          </MenuItem>
        );
      })}
    </StyledMenu>
  );
});

export default Menu;
