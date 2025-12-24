import { createContext, useContext, useState, useEffect } from "react";
import ApiUtils from "@/utils/ApiUtils";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({
    checked: false,
    loggedIn: false,
    user: null,
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await ApiUtils.sendPost("/users/me", {});
        setAuth({ checked: true, loggedIn: true, user: res.data });
      } catch {
        setAuth({ checked: true, loggedIn: false, user: null });
      }
    };
    checkAuth();
  }, []);

  if (!auth.checked) {
    return (
      <div style={{ textAlign: "center", marginTop: "30vh" }}>로딩 중...</div>
    );
  }

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
