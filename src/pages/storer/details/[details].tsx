import { Main } from "../../../templates/Main";
import React from "react";
import { useRouter } from "next/router";
import StorerDetails from "src/components/Storer/StorerDetails";
import { Meta } from "src/layouts/Meta";

const StorerMoreDetailPage = () => {
  const router = useRouter();
  const { details } = router.query;
  return (
    <Main meta={<Meta title="Recyclium" description="Recyclium front-end" />}>
      <StorerDetails pathdetails={details} />
    </Main>
  );
};

export default StorerMoreDetailPage;
