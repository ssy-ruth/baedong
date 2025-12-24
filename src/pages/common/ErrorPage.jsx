import Layout from "@/components/common/layout/Layout";

const ErrorPage = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-8 mb-8">
            <div className="flex items-center gap-2">
              <span className="text-4xl md:text-6xl font-bold text-gray-900">
                4
              </span>
              <span className="text-4xl md:text-6xl font-bold text-gray-900">
                0
              </span>
              <span className="text-4xl md:text-6xl font-bold text-gray-900">
                4
              </span>
            </div>
          </div>

          {/* Main message */}
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
            페이지를 찾을 수 없습니다.
          </h1>

          {/* Description */}
          <p className="text-sm md:text-base text-gray-600 mb-2">
            페이지가 존재하지 않거나, 사용할 수 없는 페이지입니다.
          </p>
          <p className="text-sm md:text-base text-gray-600 mb-8">
            입력하신 주소가 정확한지 다시 한 번 확인해 세요.
          </p>

          {/* Buttons */}
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => window.history.back()}
              className="px-6 py-2.5 border-2 rounded text-main font-medium hover:bg-gray-50 transition-colors"
              style={{ borderColor: "#215BA0" }}
            >
              이전 페이지
            </button>
            <a
              href="/"
              className="px-6 py-2.5 rounded text-white font-medium hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "#215BA0" }}
            >
              홈으로
            </a>
          </div>
          {/* </CHANGE> */}
        </div>
      </div>
    </Layout>
  );
};

export default ErrorPage;
