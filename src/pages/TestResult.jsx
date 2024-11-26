import styled from "styled-components";

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #007bff;
`;

const ResultBox = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const ResultText = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
`;

const TestResult = ({ result }) => {
  return (
    <Container>
      <Title>테스트 결과</Title>
      <ResultBox>
        <ResultText>당신의 MBTI 결과: {result || "결과 없음"}</ResultText>
      </ResultBox>
    </Container>
  );
};

export default TestResult;
