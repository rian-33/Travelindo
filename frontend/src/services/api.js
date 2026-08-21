import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const getDestinations = async (search = "", getAll = false) => {
  try {
    const response = await axios.get(
      `${API_URL}/destinations?search=${encodeURIComponent(search)}${getAll ? "&all=true" : ""}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error memanggil API:", error);
    return [];
  }
};

export const getCulinaryPlaces = async () => {
  try {
    const response = await axios.get(`${API_URL}/culinary`);
    return response.data;
  } catch (error) {
    console.error("Error memanggil API Kuliner:", error);
    return [];
  }
};

// Tambahkan di bawah getDestinations
export const getDestinationById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/destinations/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error memanggil API Detail:", error);
    return null;
  }
};
