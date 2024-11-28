import { useState } from "react";
import { login } from "../api/auth";
import AuthForm from "../components/AuthForm";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  text-align: center;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
`;

const ErrorMessage = styled.p`
  color: red;
  font-weight: bold;
`;

const SignupLink = styled.p`
  margin-top: 20px;
  font-size: 0.9rem;

  a {
    color: blue;
    text-decoration: underline;
    font-weight: bold;

    &:hover {
      color: darkblue;
    }
  }
`;

const Login = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (formData) => {
    try {
      const user = await login(formData);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    } catch (err) {
      setError(`로그인에 실패했습니다. 에러 내용: ${err.message}`);
    }
  };

  return (
    <Container>
      <Title>로그인</Title>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <AuthForm mode="login" onSubmit={handleLogin} />
      <SignupLink>
        계정이 없으신가요? <Link to="/signup">회원가입</Link>
      </SignupLink>
    </Container>
  );
};

export default Login;
