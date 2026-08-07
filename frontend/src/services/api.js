import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const getDestinations = async (search = "") => {
  try {
    const response = await axios.get(
      `${API_URL}/destinations?search=${search}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error memanggil API:", error);
    return [];
  }
};
