import { Main } from "../../templates/Main";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Meta } from "src/layouts/Meta";
import Creators from "src/components/Creator/Creator";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { userActions } from "../../redux/user/userSlice";

import { useAuthContext } from "src/context/AuthProvider";
import LoadingSpinner from "src/components/LoadSpinner/LoadSpinner";

const CreatorsDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const dispatch = useAppDispatch();

  const { accessToken } = useAuthContext();

  const { isDataLoading, creatorDetail } = useAppSelector((s) => ({
    isDataLoading: s.user.isDataLoading,
    creatorDetail: s.user.creatorDetail,
  }));

  useEffect(() => {
    if (id) {
      dispatch(
        userActions.creatorDetail({
          url: `https://crab.recyclium.dataunion.app/api/v1/creator/${id}`,
          token: accessToken,
        }),
      );
    }
  }, [id]);

  return (
    <Main meta={<Meta title="Recyclium" description="Recyclium front-end" />}>
      {/* <Creators verifiedStatus={true} /> */}
      {isDataLoading ? (
        <LoadingSpinner />
      ) : (
        <Creators verifiedStatus={false} data={creatorDetail} />
      )}
    </Main>
  );
};

export default CreatorsDetailsPage;
