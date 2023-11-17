import { Meta } from "../layouts/Meta";
import { Main } from "../templates/Main";

import Dashboard from "../components/categories/dashboard/Dashboard";

const Index = () => {
  return (
    <Main meta={<Meta title="Recyclium" description="Recyclium front-end" />}>
      <Dashboard />
    </Main>
  );
};

export default Index;
