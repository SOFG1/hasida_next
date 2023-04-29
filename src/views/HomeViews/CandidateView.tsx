import React, { useMemo } from "react";
import styled from "styled-components";
import { useProfileDetailsQuery } from "../../api/home";
import { useUserGetFieldsQuery } from "../../api/user";
import {
  CardActionsComponent,
  CardSliderComponent,
  NotRegisteredCover,
} from "../../components/HomeComponents";
import { LocationIcon } from "../../UI/SVG";
import { Loader } from "../../UI/Loader";
import { getAge } from "../../utils";
import lastSeenAgo from "last-seen-ago";

const CardWrapper = styled.div`
  position: relative;
  flex-shrink: 0;
  max-width: 1015px;
  margin: 0 auto 36px;
`;

const StyledCard = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 610px;
  border-radius: 20px;
  max-width: 100%;
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
  @media screen and (max-width: 1160px) {
    max-width: 570px;
    margin: 0 auto;
  }
  @media screen and (max-width: 700px) {
    height: 700px;
  }
`;

const StyledInfo = styled.div`
  position: relative;
  flex-grow: 1;
  padding-top: 25px;
  display: flex;
  flex-direction: column;
  max-height: 60%;
  min-height: 150px;
  padding-inline-end: 48px;

  @media screen and (max-width: 1160px) {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    background: rgba(255, 255, 255, 0.5);
    border-top: 2px solid #ffffff;
    backdrop-filter: blur(6px);
    padding-top: 38px;
    padding-bottom: 30px;
  }
  @media screen and (max-width: 700px) {
    max-height: 45%;

    padding: 10px;
    min-height: 0;
  }
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
`;

const StyledLocation = styled.p`
  font-weight: 300;
`;

const StyledLabel = styled.p`
  font-weight: 300;
  font-size: 14px;
`;

const StyledLastView = styled.p`
  font-weight: 600;
`;

const StyledValue = styled.p`
  font-weight: 600;
  font-size: 14px;
  padding: 4px 9px;
  background: #f9f3dd;
  box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.16);
  border-radius: 20px;
  span {
    color: #2a9b9f;
  }
`;

const InfoWrapper = styled.div`
  position: relative;
  flex-grow: 1;
  overflow: auto;
`;

const AdditionalInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0 25px;
  max-width: 350px;
  padding: 0 25px;
`;

const StyledLoader = styled(Loader)`
  margin: 50px auto;
`;

const registered = true;

interface IProps {
  userId: number
}

const CandidateView = React.memo(({userId}: IProps) => {

  const { data: fields } = useUserGetFieldsQuery();
  const { data: details, isFetching } = useProfileDetailsQuery(
    userId as number,
    {
      skip: !userId,
    }
  );

  const lastSeen = useMemo(() => {
    if (details?.online === true) return "online";
    return lastSeenAgo.getLastSeen(new Date(Number(details?.online)));
  }, [details]);

  const candidateAge = useMemo(() => {
    if (details?.birth_date) {
      return getAge(new Date(details.birth_date));
    }
  }, [details]);

  const dataFormatted = useMemo(() => {
    const obj: any = {};

    Object.keys(details || {}).forEach((key) => {
      const value = details[key]?.name ? details[key]?.name : details[key]
      const field = fields?.find((f) => f.name === key);
      if (typeof value !== "string" && typeof value !== "number" || value === '') return;
      if (key === "id") return; // Don't show id
      if (key === "birth_date") return; // Don't show birth_date
      if (key === "mobile_phone") return; // Don't show mobile_phone
      if (key === "first_name") return; // Don't show first_name
      if (key === "family_name") return; // Don't show family_name
      const label = field?.view_name || key;
      obj[label] = value;
    });
    return obj;
  }, [details, fields]);


  if (!userId) return null;

  if (isFetching) return <StyledLoader />;
  return (
    <CardWrapper>
      <StyledCard>
        <CardSliderComponent opened={true} photos={details?.photos} />
        <StyledInfo>
          <StyledTitle>
            {details?.first_name} {details?.last_name},
            <span>{candidateAge}</span>
          </StyledTitle>
          <PaddingBox>
            <StyledLocation>
              {details?.gender !== "payment_required" && details?.gender}
            </StyledLocation>
          </PaddingBox>
          {details?.city && (
            <PaddingBox>
              <LocationIcon />
              <StyledLocation>{details.city.name}</StyledLocation>
            </PaddingBox>
          )}
          <PaddingBox>
            <StyledLabel>Last view:</StyledLabel>
            <StyledLastView>{lastSeen}</StyledLastView>
          </PaddingBox>
          <InfoWrapper>
            <AdditionalInfo>
              {Object.keys(dataFormatted).map((key: string) => {
                const value = dataFormatted[key];
                if(value === 'payment_required') return null
                return (
                  <StyledBox key={key} dir="auto">
                    <StyledLabel>{key}:</StyledLabel>
                    <StyledValue>
                      {value === "payment_required" ? (
                        <>
                          You need to get <span>GOLD</span> subscibe
                        </>
                      ) : (
                        value
                      )}
                    </StyledValue>
                  </StyledBox>
                );
              })}
            </AdditionalInfo>
            {!registered && <NotRegisteredCover />}
          </InfoWrapper>
        </StyledInfo>
      </StyledCard>
      <CardActionsComponent profile={details} userId={userId} />
    </CardWrapper>
  );
});

export default CandidateView;
