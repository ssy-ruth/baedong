import RootRoute from "@/routes/RootRoute";
import "@/assets/style/samples/Sample.css";
import { useEffect } from "react";
import useHistoryStore from "@/stores/useHistoryStore";
import DialogComponent from "@/components/common/dialog/DialogComponent";
import useCoreStore from "@/stores/useCoreStore";
import SampleLoading from "@/components/common/sample/SampleLoading";

function App() {
  const { historyList } = useHistoryStore();
  const { loading } = useCoreStore();

  useEffect(() => {
    console.log("히스토리 변화 감지", historyList);
    console.log("로딩 변화 감지", loading);
  }, [historyList, loading]);

  return (
    <>
      <RootRoute />
      <DialogComponent />
      {loading > 0 && <SampleLoading />}
    </>
  );
}

export default App;
