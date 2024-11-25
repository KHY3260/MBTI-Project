import { Outlet, Link } from "react-router-dom";

function Layout() {
  return (
    <div>
      <nav>
        <Link to="/">홈</Link>
        <Link to="login">로그인</Link>
        <Link to="/signup">회원가입</Link>
        <button>로그아웃</button>
      </nav>

      <Outlet />
    </div>
  );
}

export default Layout;
