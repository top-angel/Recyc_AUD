import { Main } from "../../templates/Main";
import React from "react";
import { useRouter } from "next/router";
import { Meta } from "src/layouts/Meta";
import Collectors from "src/components/Collector/Collector";

const CollectorsDetailsPage = () => {
  const router = useRouter();
  const { details } = router.query;
  return (
    <Main meta={<Meta title="Recyclium" description="Recyclium front-end" />}>
      <Collectors />
    </Main>
  );
};

export default CollectorsDetailsPage;
