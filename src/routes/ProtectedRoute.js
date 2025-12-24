import { useAuth } from "@/stores/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ element }) {
  const { auth } = useAuth();
  const location = useLocation();

  if (!auth.checked) return <div>로딩 중...</div>;

  // 로그인 안 된 상태면 로그인 페이지로 이동
  if (!auth.loggedIn) {
    return (
      <Navigate to="/LGN/LGN_001_P01" replace state={{ from: location }} />
    );
  }

  return element;
}
