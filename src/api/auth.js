import axios from "./axiosInstance";

const API_URL = "https://moneyfulpublicpolicy.co.kr";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("로그인 토큰이 존재하지 않습니다.");
  return { Authorization: `Bearer ${token}` };
};

export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || "회원가입 요청 중 오류 발생";
  }
};

export const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    localStorage.setItem("token", response.data.accessToken);
    localStorage.setItem("user", JSON.stringify(response.data));

    return response.data;
  } catch (error) {
    throw error.response?.data || "로그인 요청 중 오류 발생";
  }
};

export const getUserProfile = async () => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.get(`${API_URL}/user`, { headers });

    localStorage.setItem("user", JSON.stringify(response.data));

    return response.data;
  } catch (error) {
    throw error.response?.data || "회원정보 확인 중 오류 발생";
  }
};

export const updateProfile = async (imgFile, nickname) => {
  try {
    const headers = {
      ...getAuthHeaders(),
      "Content-Type": "multipart/form-data",
    };

    const formData = new FormData();
    if (imgFile) formData.append("avatar", imgFile);
    if (nickname) formData.append("nickname", nickname);

    const response = await axios.patch(`${API_URL}/profile`, formData, {
      headers,
    });

    localStorage.setItem("user", JSON.stringify(response.data));

    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response?.data || "프로필 업데이트 요청 중 오류 발생";
  }
};
