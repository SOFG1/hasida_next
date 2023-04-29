import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import styled, { keyframes } from "styled-components";
import { hostUrl } from "../../api";
import {
  useUserGetFieldsQuery,
  useUserInfoQuery,
  useUserSetMainPhotoMutation,
} from "../../api/user";
import { AccountActiveIcon, CloseIcon, PlusIcon } from "../../UI/SVG";
import { Title } from "../../UI/Title";
import { UploadPhotosComponent } from "../common";
import Image from "next/image";

const StyledList = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  @media screen and (max-width: 1050px) {
    gap: 10px;
  }
`;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AvatarWrapper = styled.div`
  position: relative;
  height: 205px;
  width: 205px;
  padding: 10px;
  > svg {
    height: 100%;
    width: 100%;
  }
  > svg path {
    fill: #2a9b9f;
  }
  @media screen and (max-width: 1050px) {
    height: 120px;
    width: 120px;
  }
`;

const StyledCanvas = styled.canvas`
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 100%;
`;

const StyledAvatar = styled(Image)`
  position: relative;
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

const StyledBadge = styled.p`
  position: relative;
  color: #fff;
  font-size: 10px;
  font-weight: 300;
  padding: 7px 10px;
  background-color: #2a9b9f;
  border-radius: 20px;
  margin-top: -22px;
`;

const AddImgButton = styled.button`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  inset-inline-end: 47px;
  height: 25px;
  width: 25px;
  top: 0;
  border: 1px solid #303d45;
  border-radius: 50%;
  padding: 0;
  background-color: #fff;
  cursor: pointer;
  transition: 100ms linear;
  &:hover {
    box-shadow: 1px 1px 5px #303d45c1;
  }
  @media screen and (max-width: 1050px) {
    inset-inline-end: 0;
  }
`;

const StyledPhoto = styled(Image)`
  height: 92px;
  width: 92px;
  object-fit: cover;
  border-radius: 50%;
  cursor: pointer;
  @media screen and (max-width: 1050px) {
    height: 60px;
    width: 60px;
  }
`;

const showAnim = keyframes`
  from {
    transform: translateY(50px);
    opacity: 0.3;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const StyledModal = styled.div`
  position: fixed;
  z-index: 19;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.73);
  backdrop-filter: blur(24px);
  animation: ${showAnim} ease-out 200ms forwards;
  > div {
    width: 100%;
    max-width: 678px;
  }
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 40px;
  inset-inline-end: 60px;
  cursor: pointer;
  padding: 0;
  border: 0;
  background-color: transparent;
  > svg {
    height: 28px;
    width: 28px;
  }
`;

const StyledTitle = styled(Title)`
  margin-bottom: 17px;
`;

const StyledText = styled.p`
  text-align: center;
  margin-bottom: 17px;
`;

const AvatarComponent = React.memo(() => {
  const { t } = useTranslation();
  const { data: fields } = useUserGetFieldsQuery();
  const { data: userInfo, isFetching: isFetchingInfo } = useUserInfoQuery();
  const [setMainPhoto] = useUserSetMainPhotoMutation();
  const [showModal, setShowModal] = useState<boolean>(false);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const compleetness = useMemo(() => {
    const oneFieldPercent = 100 / (fields?.length || 1);
    let addedFields = 0;
    Object.values(userInfo?.profile || {}).forEach((f) => {
      if (f === null || f?.length === 0) return;
      addedFields++;
    });
    return Number((addedFields * oneFieldPercent).toFixed(0));
  }, [userInfo, fields]);

  const userPhotos = useMemo(() => {
    return userInfo?.profile.photos || [];
  }, [userInfo]);

  useEffect(() => {
    //Draw filled circle around avatar with canvas
    const size = (compleetness / 100) * Math.PI * 2 + Math.PI / 2;
    let ctx: undefined | any;
    if (canvasRef.current) {
      canvasRef.current.width = 200;
      canvasRef.current.height = 200;
      ctx = canvasRef.current?.getContext("2d");
      ctx?.beginPath();
      ctx?.arc(100, 100, 99, Math.PI * 0.5, size, false);
      if (ctx) ctx.strokeStyle = "#2A9B9F";
      if (ctx) ctx.lineWidth = 2;
      ctx?.stroke();
    }
    return () => {
      if (ctx && canvasRef.current) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
    };
  }, [canvasRef, compleetness]);

  if (isFetchingInfo) return null;

  return (
    <>
      {showModal && (
        <StyledModal>
          <CloseBtn onClick={() => setShowModal(false)}>
            <CloseIcon />
          </CloseBtn>
          <StyledTitle>{t("account_add-photo")}</StyledTitle>
          <StyledText>{t("account_add-photo-more")}</StyledText>
          <UploadPhotosComponent />
        </StyledModal>
      )}
      <StyledList>
        {userPhotos[0] && (
          <StyledPhoto
            src={`${hostUrl}${userPhotos[0].url}`}
            onClick={() => setMainPhoto(userPhotos[0])}
            height={92}
            width={92}
            alt="User photo"
          />
        )}
        {userPhotos[1] && userPhotos[2] && (
          <StyledPhoto
            src={`${hostUrl}${userPhotos[1].url}`}
            onClick={() => setMainPhoto(userPhotos[1])}
            height={92}
            width={92}
            alt="User photo"
          />
        )}
        <StyledWrapper>
          <AvatarWrapper>
            <StyledCanvas ref={canvasRef}></StyledCanvas>
            {userInfo?.profile.main_photo ? (
              <StyledAvatar
                src={`${hostUrl}${userInfo?.profile.main_photo?.url}`}
                height={200}
                width={200}
                alt="Avatar"
              />
            ) : (
              <AccountActiveIcon />
            )}
            <AddImgButton onClick={() => setShowModal(true)}>
              <PlusIcon />
            </AddImgButton>
          </AvatarWrapper>
          <StyledBadge>
            {compleetness}
            {t("account_info-percent")}
          </StyledBadge>
        </StyledWrapper>
        {userPhotos[1] && !userPhotos[2] && (
          <StyledPhoto
            src={`${hostUrl}${userPhotos[1].url}`}
            height={92}
            width={92}
            onClick={() => setMainPhoto(userPhotos[1])}
            alt="User photo"
          />
        )}
        {userPhotos[2] && (
          <StyledPhoto
            src={`${hostUrl}${userPhotos[2].url}`}
            height={92}
            width={92}
            onClick={() => setMainPhoto(userPhotos[2])}
            alt="User photo"
          />
        )}
        {userPhotos[3] && (
          <StyledPhoto
            src={`${hostUrl}${userPhotos[3].url}`}
            height={92}
            width={92}
            onClick={() => setMainPhoto(userPhotos[3])}
            alt="User photo"
          />
        )}
      </StyledList>
    </>
  );
});

export default AvatarComponent;
