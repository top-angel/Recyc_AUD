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

  const { isDataLoading, newStorers } = useAppSelector((s) => ({
    isDataLoading: s.user.isDataLoading,
    newStorers: s.user.newStorers,
  }));

  function findObjectById(array, id) {
    return array.find(item => item._id === id);
  }

  let targetId = id; 
  let resultObject = findObjectById(newStorers, targetId);
  
  // useEffect(() => {
  //   if (id) {
  //     dispatch(
  //       userActions.storerDetail({
  //         url: `https://crab.recyclium.dataunion.app/api/v1/storer/${id}`,
  //         token: accessToken,
  //       })
  //     );
  //   }
  // }, [id]);

  return (
    <Main meta={<Meta title="Recyclium" description="Recyclium front-end" />}>
      {/* {isDataLoading ? <LoadingSpinner /> : <Storer data={storerDetail} />} */}
      {resultObject && <Storer data={resultObject}/>}
    </Main>
  );
};

export default StorerDetailsPage;
