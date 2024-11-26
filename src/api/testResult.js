import axios from "./axiosInstance";

const API_URL = "https://moneyfulpublicpolicy.co.kr/testResults";

export const createTestResult = async ({ userId, result }) => {
  try {
    const response = await axios.post(API_URL, { userId, result });
    return response.data;
  } catch (error) {
    throw error.response?.data || "테스트 결과 생성 중 오류가 발생했습니다.";
  }
};

export const getTestResultsByUserId = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}?userId=${userId}`);
    return response.data;
  } catch (error) {
    throw (
      error.response?.data ||
      "사용자의 테스트 결과를 가져오는 중 오류가 발생했습니다."
    );
  }
};

export const updateTestResult = async (id, updatedResult) => {
  try {
    const response = await axios.patch(`${API_URL}/${id}`, updatedResult);
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || "테스트 결과 업데이트 중 오류가 발생했습니다."
    );
  }
};

export const deleteTestResult = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || "테스트 결과 삭제 중 오류가 발생했습니다.";
  }
};
