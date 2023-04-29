import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useGetDashboardQuery } from "../../api/dashboard";
import { dashboardDaysFilterSelector } from "../../store/dashboard";
import { UserThumb } from "../../UI/UserThumb";
import { useChatCreateDialogMutation } from "../../api/chat";
import { useRouter } from "next/router";


const StyledWrapper = styled.div`
  flex-grow: 1;
  max-width: 50%;
  @media screen and (max-width: 1150px) {
    max-width: 100%;
  }
`;

const StyledLabel = styled.p`
  display: flex;
  font-weight: 600;
  font-size: 18px;
  margin-bottom: 10px;
  span {
    margin-inline-start: auto;
    font-weight: 300;
    font-size: 14px;
  }
`;

const StyledList = styled.div`
  width: 100%;
  max-width: 600px;
  min-height: 90px;
  display: flex;
  gap: 20px;
  overflow-x: auto;
`;

const LikesView = React.memo(() => {
  const { t } = useTranslation();
  const router = useRouter();
  const daysFilter = useSelector(dashboardDaysFilterSelector);
  const { data } = useGetDashboardQuery(daysFilter);
  const [createDialog] = useChatCreateDialogMutation();

  const handleCreateDialog = useCallback(
    (id: number) => {
      createDialog(id)
        .unwrap()
        .then((res) => router.push(`/chat/${res.id}`));
    },
    [createDialog, router]
  );


  return (
    <StyledWrapper>
      <StyledLabel>
        {t("dashboard_liked_me")}
        {/*<span>{data?.liked_me?.length}</span>*/}
      </StyledLabel>
      <StyledList>
        {data?.liked_me.map((p) => (
          <UserThumb
            key={p.id}
            name={p.first_name}
            imgUrl={p.main_photo?.url}
            onClick={() => router.push(`/home/${p.id}`)}
          />
        ))}
      </StyledList>

      <StyledLabel>
        {t("dashboard_viewers")}
        {/*<span>{data?.viewers?.length}</span>*/}
      </StyledLabel>
      <StyledList>
        {data?.viewers.map((p) => (
          <UserThumb
            key={p.id}
            name={p.first_name}
            imgUrl={p.main_photo?.url}
            onClick={() => router.push(`/home/${p.id}`)}
          />
        ))}
      </StyledList>

      <StyledLabel>
        {t("dashboard_i_liked")}
        {/*<span>{data?.i_liked?.length}</span>*/}
      </StyledLabel>
      <StyledList>
        {data?.i_liked.map((p) => (
          <UserThumb
            key={p.id}
            name={p.first_name}
            imgUrl={p.main_photo?.url}
            onClick={() => router.push(`/home/${p.id}`)}
          />
        ))}
      </StyledList>

      <StyledLabel>
        {t("dashboard_likes_matches")}
        {/*<span>{data?.likes_matches?.length}</span>*/}
      </StyledLabel>
      <StyledList>
        {data?.likes_matches.map((p) => (
          <UserThumb
            key={p.id}
            name={p.first_name}
            imgUrl={p.main_photo?.url}
            onMessage={() => handleCreateDialog(p.id)}
            onClick={() => router.push(`/home/${p.id}`)}
          />
        ))}
      </StyledList>

      <StyledLabel>
        {t("dashboard_i_viewer")}
        {/*<span>{data?.i_viewer?.length}</span>*/}
      </StyledLabel>
      <StyledList>
        {data?.i_viewer.map((p) => (
          <UserThumb
            key={p.id}
            name={p.first_name}
            imgUrl={p.main_photo?.url}
            onClick={() => router.push(`/home/${p.id}`)}
          />
        ))}
      </StyledList>
    </StyledWrapper>
  );
});

export default LikesView;
