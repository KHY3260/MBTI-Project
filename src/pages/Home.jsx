import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from "react";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 20px;
  color: #333;
  text-align: center;
`;

const Description = styled.p`
  font-size: 1.2rem;
  margin-bottom: 40px;
  color: #666;
  text-align: center;
`;

const ServiceSections = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 40px;
`;

const Card = styled.div`
  background-color: #f9f9f9;
  padding: 20px;
  flex: 1;
  text-align: center;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 10px;
`;

const CardDescription = styled.p`
  font-size: 1rem;
  color: #666;
`;

const ActionButton = styled(Link)`
  display: inline-block;
  padding: 12px 24px;
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
  background-color: #ff6b6b;
  border-radius: 25px;
  text-decoration: none;
  transition: background-color 0.3s;
  text-align: center;

  &:hover {
    background-color: #fa5252;
  }
`;

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <Container>
      <Title>무료 성격 테스트</Title>
      <Description>
        자신의 성격 유형을 확인할 수 있도록 솔직하게 답변해 주세요.
      </Description>
      <ServiceSections>
        <Card>
          <CardTitle>성격 유형 검사</CardTitle>
          <CardDescription>
            자신의 성격 유형을 파악하고 삶의 여러 영역에서 어떤 영향을 미치는지
            알아보세요.
          </CardDescription>
        </Card>
        <Card>
          <CardTitle>성격 유형 이해</CardTitle>
          <CardDescription>
            다른 사람들이 어떻게 행동하는지 이해하는 데 도움을 줄 수 있습니다.
          </CardDescription>
        </Card>
        <Card>
          <CardTitle>팀 평가</CardTitle>
          <CardDescription>
            팀 내에서 자신의 성격과 동료들의 성격을 이해하고 협력할 수 있는
            방법을 배워보세요.
          </CardDescription>
        </Card>
      </ServiceSections>
      <ActionButton to={isLoggedIn ? "/test" : "/login"}>
        {isLoggedIn ? "내 성격 알아보기" : "로그인이 필요합니다"}
      </ActionButton>
    </Container>
  );
};

export default Home;
