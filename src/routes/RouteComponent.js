import { lazy, Suspense, useEffect } from "react";
import ErrorPage from "@/pages/common/ErrorPage";
import Layout from "@/components/common/layout/Layout";

const RouteComponent = ({ url, filePath, menuId }) => {
  useEffect(() => {
    console.log("등록된 라우트 정보", { url, filePath, menuId });
  }, [url, filePath, menuId]);

  const DynamicComponent = lazy(() =>
    import(`../pages/${filePath}`).catch(() => ({
      default: ErrorPage,
    }))
  );

  return (
    <Layout>
      <Suspense>
        <DynamicComponent />
      </Suspense>
    </Layout>
  );
};

export default RouteComponent;
