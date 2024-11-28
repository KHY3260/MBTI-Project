import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { questions } from "../data/questions";
import { calculateMBTI } from "../utils/mbtiCalculator";
import { createTestResult } from "../api/TestResult";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  max-width: 700px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #007bff;
  margin-bottom: 24px;
  text-align: center;
`;

const QuestionContainer = styled.div`
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
`;

const QuestionTitle = styled.h3`
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 15px;
  font-weight: bold;
`;

const Options = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Option = styled.label`
  font-size: 1rem;
  color: #555;
  display: flex;
  align-items: center;
  gap: 10px;

  input {
    accent-color: #007bff;
    transform: scale(1.2);
  }
`;

const SubmitButton = styled.button`
  padding: 12px 24px;
  font-size: 1.1rem;
  font-weight: bold;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 30px;

  &:hover {
    background-color: #0056b3;
  }
`;

const TestPage = () => {
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  const handleOptionChange = (questionId, option) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: option,
    }));
  };

  const handleSubmit = async () => {
    if (Object.keys(answers).length !== questions.length) {
      alert("모든 질문에 응답해주세요.");
      return;
    }

    const mbtiResult = calculateMBTI(answers);

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        await createTestResult({
          userId: user.id,
          result: mbtiResult,
        });
      }
      localStorage.setItem("testResult", JSON.stringify(mbtiResult));
      alert(`테스트 결과: ${mbtiResult}`);
      navigate("/results");
    } catch (error) {
      console.error("결과 저장 실패:", error);
    }
  };

  return (
    <Container>
      <Title>MBTI 테스트</Title>
      {questions.map((question) => (
        <QuestionContainer key={question.id}>
          <QuestionTitle>{question.question}</QuestionTitle>
          <Options>
            {question.options.map((option) => (
              <Option key={option}>
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={option}
                  checked={answers[question.id] === option}
                  onChange={() => handleOptionChange(question.id, option)}
                />
                {option}
              </Option>
            ))}
          </Options>
        </QuestionContainer>
      ))}
      <SubmitButton onClick={handleSubmit}>테스트 제출</SubmitButton>
    </Container>
  );
};

export default TestPage;
