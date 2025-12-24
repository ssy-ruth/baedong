const SampleLoadingStyle = {
  position: "absolute",
  top: "0",
  left: "0",
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0,0,0,0.5)",
  zIndex: "99999999",
};

// 샘플 로딩 컴포넌트
const SampleLoading = () => {
  return (
    <div style={SampleLoadingStyle}>
      <p>..로딩입니다.</p>
      <p>..로딩입니다.</p>
      <p>..로딩입니다.</p>
      <p>..로딩입니다.</p>v<p>..로딩입니다.</p>
      <p>..로딩입니다.</p>
      <p>..로딩입니다.</p>
      <p>..로딩입니다.</p>
      <p>..로딩입니다.</p>
    </div>
  );
};

export default SampleLoading;
