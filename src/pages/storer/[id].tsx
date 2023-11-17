import { Main } from "../../templates/Main";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Meta } from "src/layouts/Meta";
import Storer from "src/components/Storer/Storer";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { userActions } from "../../redux/user/userSlice";

import { useAuthContext } from "src/context/AuthProvider";
import LoadingSpinner from "src/components/LoadSpinner/LoadSpinner";

const StorerDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useAppDispatch();

  const { accessToken } = useAuthContext();

  const { isDataLoading, storerDetail } = useAppSelector((s) => ({
    isDataLoading: s.user.isDataLoading,
    storerDetail: s.user.storerDetail,
  }));

  useEffect(() => {
    if (id) {
      dispatch(
        userActions.storerDetail({
          url: `https://crab.recyclium.dataunion.app/api/v1/storer/${id}`,
          token: accessToken,
        })
      );
    }
  }, [id]);

  return (
    <Main meta={<Meta title="Recyclium" description="Recyclium front-end" />}>
      {isDataLoading ? <LoadingSpinner /> : <Storer data={storerDetail} />}
    </Main>
  );
};

export default StorerDetailsPage;
