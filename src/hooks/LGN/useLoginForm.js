import { useState, useEffect } from "react";
import { useAuth } from "@/stores/AuthContext";
import { loginService } from "@/utils/LoginUtils";
import meService from "@/api/service/meService";

const useLoginForm = (goForward) => {
  const { setAuth } = useAuth();
  const [formData, setFormData] = useState({ id: "", password: "" });
  const [rememberId, setRememberId] = useState(false);
  const [errors, setErrors] = useState({ id: "", password: "" });
  const [loading, setLoading] = useState(false);

  // LocalStorage 불러오기
  useEffect(() => {
    const savedId = localStorage.getItem("savedUserId");
    const rememberMeChecked =
      localStorage.getItem("rememberIdChecked") === "true";

    setRememberId(rememberMeChecked);
    if (rememberMeChecked && savedId) {
      setFormData((prev) => ({ ...prev, id: savedId }));
    }
  }, []);

  // 입력 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // 체크박스 핸들러
  const handleRememberIdChange = (e) => setRememberId(e.target.checked);

  // 유효성 검사
  const validate = () => {
    const newErrors = { id: "", password: "" };
    let isValid = true;

    if (!formData.id.trim()) {
      newErrors.id = "필수 입력란입니다.";
      isValid = false;
    } else if (!/^\d{8}$/.test(formData.id)) {
      newErrors.id = "ID는 숫자 8자리입니다.";
      isValid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = "필수 입력란입니다.";
      isValid = false;
    } else if (
      !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,20}$/.test(
        formData.password
      )
    ) {
      newErrors.password = "비밀번호는 영문, 숫자, 기호를 포함한 8~20자입니다.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // 로그인 시도
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    const success = await loginService({
      empNum: formData.id,
      password: formData.password,
      rememberId,
    });

    setLoading(false);

    if (success) {
      try {
        const res = await meService();
        setAuth({ checked: true, loggedIn: true, user: res.data });
        goForward("HOM_001_P01");
      } catch (err) {
        console.error("내 정보 조회 실패");
        setAuth({ checked: true, loggedIn: false, user: null });
      }
    } else {
      setAuth({ checked: true, loggedIn: false, user: null });
    }
  };

  return {
    formData,
    errors,
    rememberId,
    loading,
    setFormData,
    handleChange,
    handleRememberIdChange,
    handleSubmit,
  };
};

export default useLoginForm;
