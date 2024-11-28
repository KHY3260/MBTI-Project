import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from "react";

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f8f9fa;
  padding: 10px 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const NavLinks = styled.div`
  display: flex;
  gap: 15px;
`;

const NavLink = styled(Link)`
  font-size: 1rem;
  color: #ff6b6b;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const LogoutButton = styled.button`
  padding: 8px 16px;
  font-size: 1rem;
  background-color: #ff6b6b;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #fa5252;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #333;
`;

const Description = styled.p`
  font-size: 1.2rem;
  margin-bottom: 40px;
  color: #666;
`;

const ServiceSections = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const Card = styled.div`
  background-color: #f0f0f0;
  padding: 20px;
  flex: 1;
  text-align: center;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ActionButton = styled(Link)`
  display: inline-block;
  margin-top: 20px;
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  background-color: #ff6b6b;
  border-radius: 25px;
  text-decoration: none;
  transition: background-color 0.3s;

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
    <>
      <Navbar>
        <NavLink to="/">홈</NavLink>
        <NavLinks>
          {isLoggedIn ? (
            <>
              <NavLink to="/profile">프로필</NavLink>
              <NavLink to="/test">테스트</NavLink>
              <NavLink to="/results">결과 보기</NavLink>
              <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
            </>
          ) : (
            <NavLink to="/login">로그인</NavLink>
          )}
        </NavLinks>
      </Navbar>
      <Container>
        <Title>무료 성격 테스트</Title>
        <Description>
          자신의 성격 유형을 확인할 수 있도록 솔직하게 답변해 주세요.
        </Description>
        <ServiceSections>
          <Card>
            <h3>성격 유형 검사</h3>
            <p>
              자신의 성격 유형을 파악하고 삶의 여러 영역에서 어떤 영향을
              미치는지 알아보세요.
            </p>
          </Card>
          <Card>
            <h3>성격 유형 이해</h3>
            <p>
              다른 사람들이 어떻게 행동하는지 이해하는 데 도움을 줄 수 있습니다.
            </p>
          </Card>
          <Card>
            <h3>팀 평가</h3>
            <p>
              팀 내에서 자신의 성격과 동료들의 성격을 이해하고 협력할 수 있는
              방법을 배워보세요.
            </p>
          </Card>
        </ServiceSections>
        <ActionButton to={isLoggedIn ? "/test" : "/login"}>
          {isLoggedIn ? "내 성격 알아보기" : "로그인이 필요합니다"}
        </ActionButton>
      </Container>
    </>
  );
};

export default Home;
