import { Main } from "../../../templates/Main";
import React from "react";
import { useRouter } from "next/router";
import StorerApproved from "src/components/Storer/StorerApproved";
import { Meta } from "src/layouts/Meta";

const StorerMoreDetailPage = () => {
  const router = useRouter();
  const { details } = router.query;
  return (
    <Main meta={<Meta title="Recyclium" description="Recyclium front-end" />}>
      <StorerApproved pathdetails={details} />
    </Main>
  );
};

export default StorerMoreDetailPage;
