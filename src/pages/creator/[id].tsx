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

  const { isDataLoading, newCreators } = useAppSelector((s) => ({
    isDataLoading: s.user.isDataLoading,
    newCreators: s.user.newCreators,
  }));

  function findObjectById(array, id) {
    return array.find(item => item._id === id);
  }

  let targetId = id; 
  let resultObject = findObjectById(newCreators, targetId);


  // useEffect(() => {
  //   if (id) {
  //     dispatch(
  //       userActions.creatorDetail({
  //         url: `https://crab.recyclium.dataunion.app/api/v1/creator/${id}`,
  //         token: accessToken,
  //       })
  //     );
  //   }
  // }, [id]);

  return (
    <Main meta={<Meta title="Recyclium" description="Recyclium front-end" />}>
      {/* <Creators verifiedStatus={true} /> */}
      {/* {isDataLoading ? (
        <LoadingSpinner />
      ) : creatorDetail ? (
        <Creators verifiedStatus={false} data={creatorDetail} />
      ) : (
        <></>
      )} */}
      {resultObject && <Creators verifiedStatus={false} data={resultObject} />}
    </Main>
  );
};

export default CreatorsDetailsPage;
