import styled from "styled-components";
import { Outlet, Link } from "react-router-dom";

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
`;

const Layout = ({ onLogout }) => {
  const isLoggedIn = !!localStorage.getItem("token");

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
              <LogoutButton onClick={onLogout}>로그아웃</LogoutButton>
            </>
          ) : (
            <NavLink to="/login">로그인</NavLink>
          )}
        </NavLinks>
      </Navbar>
      <Container>
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
