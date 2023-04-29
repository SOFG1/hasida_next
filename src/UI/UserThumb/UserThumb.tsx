import React, { useCallback, useMemo } from "react";
import styled from "styled-components";
import avatar from "../../../public/images/avatar.png";
import { hostUrl } from "../../api";
import { MessageIcon } from "../SVG";
import Image from "next/image";

const StyledWrapper = styled.div`
  position: relative;
  text-align: center;
  flex-shrink: 0;
  text-decoration: none;
  width: 60px;
  cursor: pointer;
`;

const StyledPhoto = styled(Image)`
  height: 51px;
  width: 51px;
  object-fit: cover;
  border-radius: 5px;
`;

const StyledName = styled.p`
  position: relative;
  background: #2a9b9f;
  border-radius: 5px;
  font-weight: 300;
  font-size: 10px;
  line-height: 17px;
  text-align: center;
  letter-spacing: 0.01em;
  color: #ffffff;
  margin-top: -14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StyledBtn = styled.button`
  background-color: #fff;
  padding: 0;
  border: 0;
  position: absolute;
  top: 1px;
  inset-inline-end: 0;
  cursor: pointer;
  padding: 2px;
  border-radius: 3px;
`;

interface IProps {
  name: string;
  imgUrl?: string;
  onClick: () => void;
  onMessage?: () => void;
}

const UserThumb = React.memo(
  ({ name, imgUrl, onClick, onMessage }: IProps) => {
    const avatarSrc = useMemo(() => {
      if (!imgUrl) return avatar;
      return `${hostUrl}${imgUrl}`;
    }, [imgUrl]);

    const handleMessage = useCallback(
      (e: any) => {
        e.stopPropagation();
        if (onMessage) onMessage();
      },
      [onMessage]
    );

    return (
      <StyledWrapper onClick={onClick}>
        <StyledPhoto src={avatarSrc} height={51} width={51} alt="user photo" />
        <StyledName>{name}</StyledName>
        {onMessage && (
          <StyledBtn onClick={handleMessage}>
            <MessageIcon />
          </StyledBtn>
        )}
      </StyledWrapper>
    );
  }
);

export default UserThumb;
