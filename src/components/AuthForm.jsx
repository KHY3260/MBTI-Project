import { useState } from "react";
import styled from "styled-components";

const Input = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: auto;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const AuthForm = ({ mode = "login", onSubmit = () => {} }) => {
  const [formData, setFormData] = useState({
    id: "",
    nickname: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="id"
        name="id"
        placeholder="아이디"
        value={formData.id}
        onChange={handleChange}
        required
      />
      {mode === "signup" && (
        <Input
          type="nickname"
          name="nickname"
          placeholder="닉네임"
          value={formData.nickname}
          onChange={handleChange}
          required
        />
      )}

      <Input
        type="password"
        name="password"
        placeholder="비밀번호"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <Button type="submit">{mode === "login" ? "로그인" : "회원가입"}</Button>
    </Form>
  );
};

export default AuthForm;
