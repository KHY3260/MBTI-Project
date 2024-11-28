import axios from "axios";

const API_URL = "http://localhost:4000/testResults";

export const getTestResults = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("모든 테스트 결과를 가져오는 중 오류 발생:", error);
    throw error;
  }
};

export const createTestResult = async (resultData) => {
  try {
    const response = await axios.post(API_URL, resultData);
    return response.data;
  } catch (error) {
    console.error("테스트 결과 생성 중 오류 발생:", error);
    throw error;
  }
};

export const deleteTestResult = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("테스트 결과 삭제 중 오류 발생:", error);
    throw error;
  }
};

export const updateTestResultVisibility = async (id, visibility) => {
  try {
    const response = await axios.patch(`${API_URL}/${id}`, { visibility });
    return response.data;
  } catch (error) {
    console.error("테스트 결과 공개 여부 업데이트 중 오류 발생:", error);
    throw error;
  }
};
