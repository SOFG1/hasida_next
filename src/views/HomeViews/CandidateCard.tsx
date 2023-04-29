import React, { useMemo } from "react";
import styled from "styled-components";
import { IProfile } from "../../api/home";
import { CardSliderComponent } from "../../components/HomeComponents";
import { InfoIcon, LocationIcon } from "../../UI/SVG";
import lastSeenAgo from "last-seen-ago";
import { useRouter } from "next/router";


const CardWrapper = styled.div`
  position: relative;
  width: 317px;
  flex-shrink: 0;
  @media screen and (max-width: 1160px) {
    max-width: 570px;
  }
  @media screen and (max-width: 700px) {
    width: 150px;
  }
`;

const StyledCard = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 439px;
  border-radius: 20px;
  overflow: hidden;
  &::before {
    content: "";
    position: absolute;
    top: -139px;
    inset-inline-end: -202px;
    border-radius: 50%;
    background-color: #2a9b9f;
    height: 487px;
    width: 487px;
  }
  &::after {
    content: "";
    position: absolute;
    bottom: -172px;
    inset-inline-end: -168px;
    border-radius: 50%;
    background-color: #f7e293;
    height: 289px;
    width: 289px;
  }
  @media screen and (max-width: 700px) {
    height: 220px;
  }
`;

const StyledInfo = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  background: rgba(255, 255, 255, 0.5);
  border-top: 2px solid #ffffff;
  backdrop-filter: blur(6px);
  padding-top: 15px;
  flex-grow: 1;
  padding-top: 25px;
  display: flex;
  flex-direction: column;
  max-height: 60%;
  min-height: 150px;
  padding-inline-end: 48px;

  @media screen and (max-width: 1160px) {
    padding-top: 38px;
    padding-bottom: 30px;
  }
  @media screen and (max-width: 700px) {
    max-height: 45%;

    padding: 10px;
    min-height: 0;
  }
`;

const OpenBtn = styled.button`
  position: absolute;
  height: 39px;
  width: 39px;
  background: #303d45;
  border-radius: 50%;
  border: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  inset-inline-end: 9px;
  bottom: 13px;
  cursor: pointer;
`;

const StyledTitle = styled.h3`
  font-weight: 600;
  font-size: 20px;
  padding: 0 25px;
  span {
    font-weight: 300;
  }
  @media screen and (max-width: 700px) {
    padding: 0;
    font-size: 18px;
  }
`;

const StyledBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`;

const PaddingBox = styled(StyledBox)`
  padding: 0 25px;
  @media screen and (max-width: 700px) {
    display: none;
  }
`;

const StyledLocation = styled.p`
  font-weight: 300;
`;

const StyledLabel = styled.p`
  font-weight: 300;
  white-space: nowrap;
  font-size: 14px;
`;

const StyledLastView = styled.p`
  font-weight: 600;
`;

interface IProps {
  profile: IProfile;
  index: number;
}

const CandidateCard = React.memo(({ profile, index }: IProps) => {
  const router = useRouter();

  const lastSeen = useMemo(() => {
    if (profile?.online === true) return "online";
    return lastSeenAgo.getLastSeen(new Date(Number(profile?.online)));
  }, [profile.online]);

  return (
    <CardWrapper>
      <StyledCard>
        <CardSliderComponent opened={false} photos={profile.photos} />
        <StyledInfo>
          <StyledTitle>
            {profile?.first_name} {profile?.last_name},
            <span>{profile?.age}</span>
          </StyledTitle>
          <PaddingBox>
            <StyledLocation>{profile.gender}</StyledLocation>
          </PaddingBox>
          {profile.city && (
            <PaddingBox>
              <LocationIcon />
              <StyledLocation>{profile.city.name}</StyledLocation>
            </PaddingBox>
          )}
          <PaddingBox>
            <StyledLabel>Last view:</StyledLabel>
            <StyledLastView>{lastSeen}</StyledLastView>
          </PaddingBox>
          <OpenBtn onClick={() => router.push(String(profile.id))}>
            <InfoIcon />
          </OpenBtn>
        </StyledInfo>
      </StyledCard>
    </CardWrapper>
  );
});

export default CandidateCard;
