import { Link } from "react-router-dom";
import styled from "styled-components";

const ServiceSections = styled.div`
  display: flex;
  gap: 20px;
`;

const Card = styled.div`
  background-color: #f0f0f0;
  padding: 20px;
  flex: 1;
  text-align: center;
`;

const LoginButton = styled(Link)`
  margin-top: 20px;
  display: inline-block;
  padding: 10px 20px;
  background-color: #333;
  color: white;
  text-decoration: none;
  border-radius: 5px;

  &:hover {
    background-color: #555;
  }
`;

function Home() {
  return (
    <div>
      <h1>무료 성격 유형 검사</h1>
      <p>당신의 성격 유형을 알아보고 더 깊이 이해해보세요.</p>

      <ServiceSections>
        <Card>성격 유형 검사</Card>
        <Card>성격 유형 이해하기</Card>
      </ServiceSections>

      <LoginButton to="/login">로그인</LoginButton>
    </div>
  );
}

export default Home;
