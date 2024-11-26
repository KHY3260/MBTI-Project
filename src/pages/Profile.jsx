import { useState, useEffect } from "react";
import { getUserProfile, updateProfile } from "../api/auth";
import styled from "styled-components";

const Container = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.label`
  margin-bottom: 10px;
`;

const Input = styled.input`
  padding: 8px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const FeedbackMessage = styled.p`
  margin-top: 20px;
  color: ${({ $success }) => ($success ? "green" : "red")};
`;

const Profile = ({ setUser }) => {
  const [nickname, setNickname] = useState("");
  const [feedback, setFeedback] = useState({ message: "", success: false });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userData = await getUserProfile();
        setNickname(userData.nickname || "");
      } catch (error) {
        setFeedback({
          message:
            error.response?.data?.message ||
            "회원정보를 가져오는 중 오류가 발생했습니다.",
          success: false,
        });
      }
    };

    fetchUserProfile();
  }, []);

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await updateProfile(null, nickname);
      setUser(updatedUser);
      setFeedback({
        message: "프로필이 성공적으로 업데이트되었습니다!",
        success: true,
      });
    } catch (error) {
      console.log(error);
      setFeedback({
        message:
          error.response?.data?.message ||
          "프로필 업데이트 중 오류가 발생했습니다.",
        success: false,
      });
    }
  };

  return (
    <Container>
      <h1>프로필 수정</h1>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="nickname">닉네임</Label>
        <Input
          type="text"
          id="nickname"
          value={nickname}
          onChange={handleNicknameChange}
          placeholder="닉네임을 입력하세요"
        />
        <Button type="submit">프로필 업데이트</Button>
      </Form>
      {feedback.message && (
        <FeedbackMessage $success={feedback.success}>
          {feedback.message}
        </FeedbackMessage>
      )}
    </Container>
  );
};

export default Profile;
