import { useState } from "react";
import TestForm from "../components/TestForm";
import { calculateMBTI } from "../utils/mbtiCalculator";
import { createTestResult } from "../api/testResult";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

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

const TestPage = ({ user, setTestResult }) => {
  const navigate = useNavigate();
  const [result, setResult] = useState(null);

  const handleTestSubmit = async (answers) => {
    try {
      const mbtiResult = calculateMBTI(answers);
      setResult(result);
      setTestResult(result);

      if (user) {
        await createTestResult({ userId: user.id, result: mbtiResult });
      }

      navigate("/results", { state: { result: mbtiResult } });
    } catch (error) {
      console.error("테스트 결과 저장 실패...ㅠㅠ:", error);
    }
  };

  return (
    <Container>
      <Title>MBTI 테스트</Title>
      <TestForm onSubmit={handleTestSubmit} />
    </Container>
  );
};

export default TestPage;
