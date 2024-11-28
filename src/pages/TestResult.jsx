import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  getTestResults,
  deleteTestResult,
  updateTestResultVisibility,
} from "../api/TestResult";

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #007bff;
  text-align: center;
`;

const ResultCard = styled.div`
  background-color: #1e293b;
  color: #e2e8f0;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Button = styled.button`
  background-color: ${(props) => (props.primary ? "#2563eb" : "#d97706")};
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  margin-right: 10px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.primary ? "#1d4ed8" : "#c2410c")};
  }
`;

const TestResult = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const data = await getTestResults();
        setResults(data);
      } catch (error) {
        console.error("결과를 가져오는 중 오류 발생:", error);
      }
    };

    fetchResults();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteTestResult(id);
      setResults((prevResults) =>
        prevResults.filter((result) => result.id !== id)
      );
    } catch (error) {
      console.error("결과 삭제 중 오류 발생:", error);
    }
  };

  const handleToggleVisibility = async (id, visibility) => {
    try {
      await updateTestResultVisibility(id, !visibility);
      setResults((prevResults) =>
        prevResults.map((result) =>
          result.id === id ? { ...result, visibility: !visibility } : result
        )
      );
    } catch (error) {
      console.error("공개/비공개 전환 중 오류 발생:", error);
    }
  };

  return (
    <Container>
      <Title>모든 테스트 결과</Title>
      {results.map((result) => (
        <ResultCard key={result.id}>
          <h2>{result.nickname}님의 결과</h2>
          <p>
            <strong>MBTI 유형:</strong> {result.result}
          </p>
          <p>{result.description}</p>
          <div>
            <Button
              primary
              onClick={() =>
                handleToggleVisibility(result.id, result.visibility)
              }
            >
              {result.visibility ? "비공개로 전환" : "공개로 전환"}
            </Button>
            <Button onClick={() => handleDelete(result.id)}>삭제</Button>
          </div>
        </ResultCard>
      ))}
    </Container>
  );
};

export default TestResult;
