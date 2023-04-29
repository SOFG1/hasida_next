import React, { useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import {
  UserPhotoType,
  useUserDeletePhotoMutation,
  useUserInfoQuery,
  useUserUploadPhotoMutation,
} from "../../api/user";
import { maxUserPhotosCount } from "../../store/user";
import { setAlert } from "../../store/app";
import styled from "styled-components";
import { CameraIcon, CrossIcon } from "../../UI/SVG";
import { hostUrl } from "../../api";
import { Loader2 } from "../../UI/Loader";
import { useTranslation } from "react-i18next";
import { useDropzone } from "react-dropzone";

const StyledWrapper = styled.div`
  margin-bottom: 20px;
`;

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 170px);
  grid-auto-rows: 150px;
  justify-content: center;
  gap: 10px;
  @media screen and (max-width: 600px) {
    grid-template-columns: repeat(2, 170px);
  }
  @media screen and (max-width: 400px) {
    grid-template-columns: repeat(2, 150px);
  }
`;

const StyledBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #000;
  border-radius: 8px;
  &:first-child {
    grid-column: span 2;
    grid-row: span 2;
    @media screen and (max-width: 600px) {
      grid-column: span 1;
      grid-row: span 1;
    }
  }
`;

const StyledPlaceholder = styled(StyledBox)`
  cursor: pointer;
`;

const StyledRemoveBtn = styled.button`
  position: absolute;
  top: 2px;
  inset-inline-end: 2px;
  background-color: #fff;
  border: 1px solid #000;
  border-radius: 50%;
  height: 15px;
  width: 15px;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 100ms linear;
  &:hover {
    opacity: 0.7;
  }
`;

const StyledImage = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const StyledDropzone = styled.div`
  height: 350px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px dashed rgba(48, 61, 69, 0.71);
  border-radius: 47px;
`;

const StyledText = styled.p`
  font-size: 22px;
`;

const UploadPhotosComponent = React.memo(() => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { data: userInfo } = useUserInfoQuery();
  const [uploadImage, { isLoading: isUploading }] =
    useUserUploadPhotoMutation();
  const [deleteImage] = useUserDeletePhotoMutation();

  const userPhotos = useMemo(() => {
    const arr = [];
    if (userInfo?.profile.main_photo) arr.push(userInfo.profile.main_photo);
    if (userInfo?.profile.photos) arr.push(...userInfo.profile.photos);
    return arr;
  }, [userInfo]);

  const placeholders = useMemo(() => {
    const arr = [];
    if (!userPhotos[0]) arr.push(undefined);
    if (!userPhotos[1]) arr.push(undefined);
    if (!userPhotos[2]) arr.push(undefined);
    if (!userPhotos[3]) arr.push(undefined);
    if (!userPhotos[4]) arr.push(undefined);
    if (isUploading) arr.pop();
    return arr;
  }, [userPhotos, isUploading]);

  const handleUpload = useCallback(
    (images: File[]) => {
      if (
        userPhotos &&
        userPhotos?.length + images.length > maxUserPhotosCount
      ) {
        dispatch(
          setAlert({
            isError: true,
            text: "You can't upload more than 4 images",
          })
        );
        return;
      }
      images.forEach((photo, index) => {
        let isMain = true
        if(index !== 0) isMain = false
        if(userPhotos?.length !== 0) isMain = false
        uploadImage({ photo, is_main: isMain })
      });
    },
    [userPhotos, maxUserPhotosCount]
  );

  const handleDelete = useCallback((e: any, id: number) => {
    e.stopPropagation();
    deleteImage(id);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (files: File[]) => handleUpload(files),
    accept: { "image/*": [] },
    maxFiles: maxUserPhotosCount,
    disabled: isUploading,
  });

  return (
    <StyledWrapper {...getRootProps()}>
      <input {...getInputProps()} />

      {isDragActive ? (
        <StyledDropzone>
          <StyledText>{t("image_input-drop")}</StyledText>
        </StyledDropzone>
      ) : (
        <StyledGrid>
          {userPhotos.map((image: UserPhotoType) => {
            return (
              <StyledBox key={image.id}>
                <StyledRemoveBtn
                  onClick={(e: any) => handleDelete(e, image.id)}
                >
                  <CrossIcon />
                </StyledRemoveBtn>
                <StyledImage src={`${hostUrl}${image.url}`} />
              </StyledBox>
            );
          })}
          {isUploading && (
            <StyledBox>
              <Loader2 />
            </StyledBox>
          )}
          {placeholders.map((p, i) => (
            <StyledPlaceholder key={i}>
              <CameraIcon />
            </StyledPlaceholder>
          ))}
        </StyledGrid>
      )}
    </StyledWrapper>
  );
});

export default UploadPhotosComponent;
