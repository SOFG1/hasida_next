import React, { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import { ChevronDownIcon, CloseIcon } from "../../UI/SVG";
import {
  IProfile,
  useProfileHideMutation,
  useProfileLikeMutation,
} from "../../api/home";
import { Loader2 } from "../../UI/Loader";
import like from "../../../public/images/like.png";
import mutualLike from "../../../public/images/mutual-like.png";
import LikeMatchComponent from "./LikeMatchComponent";
import { useSelector } from "react-redux";
import {
  homeFeedDataSelector,
} from "../../store/home";
import Image from "next/image";
import { useRouter } from "next/router";

const StyledWrapper = styled.div`
  position: absolute;
  bottom: -36px;
  z-index: 1;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 11px;
  align-items: center;
`;

const StyledBtn = styled.button`
  display: flex;
  justify-content: center;
  border: 0;
  padding: 0;
  align-items: center;
  height: 49px;
  width: 49px;
  border-radius: 50%;
  background-color: #303d45;
  transition: 150ms;
  cursor: pointer;
  &:hover {
    box-shadow: 3px 5px 10px rgba(0, 0, 0, 0.12);
  }
  svg {
    height: 16px;
    width: 16px;
  }
  svg path {
    stroke: #fff;
    stroke-width: 1px;
  }
`;

const CloseBtn = styled(StyledBtn)`
  svg path {
    stroke-width: 2px;
  }
`;

const MainBtn = styled(StyledBtn)`
  height: 72px;
  width: 72px;
  background-color: #2a9b9f;
  ${({ disabled }) => disabled && "background: #657577; cursor: not-allowed;"}
  :not(:disabled):active img {
    transform: scale(1.25);
  }
  img {
    transition: 200ms;
    height: 70%;
    width: 70%;
    object-fit: contain;
  }
`;

interface IProps {
  profile: IProfile;
  userId: number;
}

const CardActionsComponent = React.memo(({ profile, userId }: IProps) => {
  const router = useRouter()
  const feed = useSelector(homeFeedDataSelector);
  const [likeCard, { isLoading: isLiking }] = useProfileLikeMutation();
  const [hideCard, { isLoading: isHiding }] = useProfileHideMutation();
  const [showModal, setShowModal] = useState<boolean>(false);

  const navigateToNextProfile = useCallback(() => {
    const currentIndex = feed.data.findIndex((u) => u.id === userId);
    const nextProfile = feed.data[currentIndex + 1];


    if(nextProfile) {
      router.push(`/home/${nextProfile.id}`)
      return
    }
    router.push('/home/')
  }, [userId, feed, router]);


  const handleLike = useCallback(
    (id: number) => {
      //Delay for button animation
      setTimeout(() => {
        likeCard(id)
          .unwrap()
          .then((r) => {
            if (r?.res?.cross === true) {
              setShowModal(true);
              return
            }
            navigateToNextProfile()
          });
      }, 300);
    },
    [likeCard, navigateToNextProfile]
  );

  const handleHide = useCallback(
    (id: number) => {
      hideCard(id)
        .unwrap()
        .then(() => {
          navigateToNextProfile()
        });
    },
    [hideCard, navigateToNextProfile]
  );

  return (
    <>
      <StyledWrapper>
        {isHiding ? (
          <Loader2 />
        ) : (
          <CloseBtn onClick={() => handleHide(userId)}>
            <CloseIcon />
          </CloseBtn>
        )}
        {isLiking ? (
          <Loader2 />
        ) : (
          <MainBtn onClick={() => handleLike(userId)} disabled={profile?.liked}>
            <Image
              src={profile?.mutual_like ? mutualLike : like}
              alt="Like icon"
            />
          </MainBtn>
        )}

        <StyledBtn onClick={() => router.back()}>
          <ChevronDownIcon />
        </StyledBtn>
      </StyledWrapper>
      <LikeMatchComponent
        show={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
});

export default CardActionsComponent;
