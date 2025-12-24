import { Route, Routes } from "react-router-dom";
import MenuDataJson from "@/routes/MenuInfo.json";
import RouteComponent from "@/routes/RouteComponent";
import ErrorPage from "@/pages/common/ErrorPage";
import ProtectedRoute from "@/routes/ProtectedRoute";

const RootRoute = () => (
  <Routes>
    {MenuDataJson["container"]?.flatMap((item) =>
      item?.urlList?.map((item1, index1) => {
        const { url: path, filePath, menuId } = item1;
        const isPublic = path?.startsWith("/LGN/");

        const pageElement = (
          <RouteComponent url={path} filePath={filePath} menuId={menuId} />
        );

        return (
          <Route
            key={menuId + index1}
            path={path}
            element={
              isPublic ? pageElement : <ProtectedRoute element={pageElement} />
            }
          />
        );
      })
    )}

    {/* 존재하지 않는 페이지 */}
    <Route path="*" element={<ErrorPage />} />
  </Routes>
);

export default RootRoute;
