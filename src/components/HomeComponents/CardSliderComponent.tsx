import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import styled from "styled-components";
import avatar from "../../../public/images/avatar.png";
import { UserPhotoType } from "../../api/user";
import { hostUrl } from "../../api";
import Image from "next/image";

const StyledWrapper = styled.div<{ opened: boolean }>`
  height: 100%;
  max-width: 445px;
  width: 50%;
  ${({ opened }) => !opened && "max-width: 100%; width: 100%;"}
  .swiper {
    height: 100%;
  }
  .swiper-pagination {
    display: flex;
    padding: 0 21px;
    gap: 22px;
    top: 7px;
    bottom: auto;
  }
  .swiper-pagination-bullet {
    flex-grow: 1;
    height: 3px;
    background-color: #fff;
    border-radius: 2px;
  }
  @media screen and (max-width: 1160px) {
    max-width: 1015px;
    width: 100%;
  }
  @media screen and (max-width: 700px) {
    .swiper-pagination {
      gap: 5px;
    }
  }
`;

const StyledImg = styled(Image)`
  object-fit: cover;
  height: 100%;
  width: 100%;
  object-position: top center;
  background-color: #fff;
`;

interface IProps {
  opened: boolean;
  photos: UserPhotoType[] | undefined;
}

const CardSliderComponent = React.memo(({ opened, photos }: IProps) => {
  return (
    <StyledWrapper opened={opened}>
      <Swiper
        loop={true}
        spaceBetween={0}
        slidesPerView={1}
        modules={[Pagination]}
        pagination={{ clickable: true }}
      >
        {photos?.map((p) => {
          return (
            <SwiperSlide key={p.id}>
              <StyledImg src={`${hostUrl}${p.url}`} alt="iuser photo" />
            </SwiperSlide>
          );
        })}
        {photos?.length === 0 && (
          <SwiperSlide>
            <StyledImg src={avatar} alt="No Photo" />
          </SwiperSlide>
        )}
      </Swiper>
    </StyledWrapper>
  );
});

export default CardSliderComponent;
