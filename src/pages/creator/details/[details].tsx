import { Main } from "../../../templates/Main";
import React from "react";
import { useRouter } from "next/router";
import CreatorDetails from "src/components/Creator/CreatorDetails";
import { Meta } from "src/layouts/Meta";

const CreatorsMoreDetailPage = () => {
  const router = useRouter();
  const { details } = router.query;
  return (
    <Main meta={<Meta title="Recyclium" description="Recyclium front-end" />}>
      <CreatorDetails pathdetails={details} />
    </Main>
  );
};

export default CreatorsMoreDetailPage;
