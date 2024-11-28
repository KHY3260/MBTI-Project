import { useNavigate } from "react-router-dom";
import { calculateMBTI } from "../utils/mbtiCalculator";
import { createTestResult } from "../api/testResult";
import styled from "styled-components";
import TestForm from "../components/TestForm";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #007bff;
  margin-bottom: 24px;
`;

const TestPage = () => {
  const navigate = useNavigate();

  const handleTestSubmit = async (answers) => {
    const mbtiResult = calculateMBTI(answers);
    localStorage.setItem("testResult", JSON.stringify(mbtiResult));

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        await createTestResult({ userId: user.id, result: mbtiResult });
      }
    } catch (error) {
      console.error("결과 저장 실패:", error);
    }

    navigate("/results");
  };

  return (
    <Container>
      <Title>MBTI 테스트</Title>
      <TestForm onSubmit={handleTestSubmit} />
    </Container>
  );
};

export default TestPage;
