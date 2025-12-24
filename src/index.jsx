import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App";
import CheckClientUtils from "@/utils/CheckClientUtils";
import defualtProperty from "@/config/defaultProperty";
import useCoreStore from "@/stores/useCoreStore";
import { worker } from "@/mocks/browsers";
import springProperty from "@/config/springProperty";
import { BrowserRouter } from "react-router-dom";

import "@/index.css";
import { AuthProvider } from "@/stores/AuthContext";

// msw 실행시키기
// worker.start();

const nowOS = CheckClientUtils.checkOS();
const { setProperty } = useCoreStore.getState();
let initData;
let apiProperty;
if (process.env?.REACT_APP_ApiDomain === "spring") {
  apiProperty = springProperty;
}

initData = {
  property: {
    ...defualtProperty,
    ...apiProperty,
    nowOS: nowOS,
  },
};

console.log("initData : ", initData);

setProperty(initData);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
