import React, { useState } from "react";
import idIcon from "@/assets/LGN/input_id.png";
import pwIcon from "@/assets/LGN/input_pw.png";
import closeEyesIcon from "@/assets/LGN/close_eyes.png";
import eyesIcon from "@/assets/LGN/eyes.png";

const LoginInput = ({
  inputType,
  value,
  onChange,
  placeholder,
  errorMessage,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputConfig = {
    id: {
      icon: <img src={idIcon} alt="아이디 아이콘" width={20} />,
      placeholder: "아이디",
      type: "text",
    },
    password: {
      icon: <img src={pwIcon} alt="비밀번호 아이콘" width={20} />,
      placeholder: "비밀번호",
      type: "password",
    },
  };

  const config = inputConfig[inputType];

  if (!config) {
    return null;
  }

  const dynamicInputType =
    inputType === "password"
      ? showPassword
        ? "text"
        : "password"
      : config.type;

  return (
    <div className="w-full">
      <div className="relative">
        <span className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400">
          {config.icon}
        </span>
        <input
          type={dynamicInputType}
          id={inputType}
          name={inputType}
          placeholder={placeholder || config.placeholder}
          value={value}
          onChange={onChange}
          className={`w-full box-border py-3 px-4 pl-10 pr-12 border rounded-lg text-base bg-white shadow-sm transition-colors ${
            errorMessage ? "border-red-500" : "border-transparent"
          }`}
          {...rest}
        />
        {inputType === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-1/2 right-4 -translate-y-1/2 opacity-30 hover:opacity-50 transition-opacity"
            aria-label="비밀번호 보기/숨기기"
          >
            {showPassword ? (
              <img src={eyesIcon} alt="비밀번호 보이기" width={20} />
            ) : (
              <img src={closeEyesIcon} alt="비밀번호 숨기기" width={20} />
            )}
          </button>
        )}
      </div>

      {errorMessage && (
        <span className="block mt-1 pl-10 text-xs text-red-500">
          {errorMessage}
        </span>
      )}
    </div>
  );
};

export default LoginInput;
