import { useState } from "react";
import { register } from "../api/auth";
import AuthForm from "../components/AuthForm";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (formData) => {
    try {
      await register(formData);
      navigate("/login");
    } catch (error) {
      setError(
        `회원가입에 실패했습니다. 다시 시도해주세요.에러내용 : ${error}`
      );
    }
  };

  return (
    <div>
      <h1>회원가입</h1>
      {error && <p>{error}</p>}
      <AuthForm mode="signup" onSubmit={handleSignUp} />
    </div>
  );
};

export default SignUp;
