import { useEffect, useState } from "react";
import styled from "styled-components";
import { getTestResults, deleteTestResult } from "../api/testResult";

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

const ResultList = styled.div`
  margin-top: 20px;
`;

const ResultCard = styled.div`
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 15px;
`;

const Button = styled.button`
  background-color: ${(props) => (props.primary ? "#007bff" : "#dc3545")};
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  margin-right: 10px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.primary ? "#0056b3" : "#a71d2a")};
  }
`;

const TestResult = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const data = await getTestResults();
        console.log(data);
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
      alert("결과가 삭제되었습니다.");
    } catch (error) {
      console.error("결과 삭제 중 오류 발생:", error);
    }
  };
  console.log(results);
  return (
    <Container>
      <Title>모든 테스트 결과</Title>
      <ResultList>
        {results.map((result) => (
          <ResultCard key={result.id}>
            <p>
              <strong>사용자 ID:</strong> {result.nickname}
            </p>
            <p>
              <strong>MBTI 결과:</strong> {result.result}
            </p>
            <Button
              primary
              onClick={() => alert("결과를 비공개로 설정했습니다.")}
            >
              비공개로 전환
            </Button>
            <Button onClick={() => handleDelete(result.id)}>삭제</Button>
          </ResultCard>
        ))}
      </ResultList>
    </Container>
  );
};

export default TestResult;
