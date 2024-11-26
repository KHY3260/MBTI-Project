import axios from "./axiosInstance";

const API_URL = "https://moneyfulpublicpolicy.co.kr";

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
    return response.data;
  } catch (error) {
    throw error.response?.data || "로그인 요청 중 오류 발생";
  }
};

export const getUserProfile = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || "회원정보 확인 중 오류 발생";
  }
};

export const updateProfile = async (imgFile, nickname) => {
  try {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("avatar", imgFile);
    formData.append("nickname", nickname);

    const response = await axios.patch(`${API_URL}/profile`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response?.data || "프로필 업데이트 요청 중 오류 발생";
  }
};
