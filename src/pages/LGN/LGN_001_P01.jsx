import Layout from "@/components/common/layout/Layout";
import LoginInput from "@/components/feature/LGN/LoginInput";
import LogoImage from "@/assets/common/baedongLogo.jpeg";
import BackgroundImage from "@/assets/LGN/login_bg.png";
import BasePrimaryBtn from "@/components/common/base/button/BasePrimaryBtn";
import useCore from "@/hooks/useCore";
import useLoginForm from "@/hooks/LGN/useLoginForm";

const LGN001P01 = () => {
  const { goForward } = useCore();
  const {
    formData,
    errors,
    rememberId,
    handleChange,
    handleRememberIdChange,
    handleSubmit,
  } = useLoginForm(goForward);

  return (
    <Layout>
      <section
        className="relative h-screen w-full overflow-hidden bg-white"
        aria-label="로그인 화면"
      >
        {/* 상단 로고 */}
        <header className="absolute top-6 left-6 z-20">
          <img src={LogoImage} alt="배동 로고" className="h-6" />
        </header>

        {/* 로그인 폼 - 화면 세로 정중앙 */}
        <div
          className="
    absolute
    top-1/2
    left-1/2
    -translate-x-1/2
    -translate-y-full
    w-full
    px-4
    z-20
  "
        >
          {/* <div
          className="
            absolute
            top-1/2
            left-1/2
            -translate-x-1/2
            -translate-y-1/2
            w-full
            px-4
            z-20
          "
        > */}
          <form
            className="bg-sky-100/60 p-4 rounded-xl w-full max-w-sm mx-auto"
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="mb-4">
              <LoginInput
                inputType="id"
                value={formData.id}
                onChange={handleChange}
                errorMessage={errors.id}
              />
            </div>

            <div className="mb-3">
              <LoginInput
                inputType="password"
                value={formData.password}
                onChange={handleChange}
                errorMessage={errors.password}
              />
            </div>

            <label className="text-sm text-gray-700 mb-5 flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="rounded"
                checked={rememberId}
                onChange={handleRememberIdChange}
              />
              ID 저장
            </label>

            <BasePrimaryBtn text={"로그인"} type="submit" />
          </form>
        </div>

        {/* 배경 이미지 - 화면 1/3 지점부터 시작 */}
        <img
          src={BackgroundImage}
          alt="로그인 배경"
          className="
            absolute
            top-1/3
            left-1/2
            -translate-x-1/2
            w-full
            max-w-none
            object-contain
            pointer-events-none
          "
        />
      </section>
    </Layout>
  );
};

export default LGN001P01;
