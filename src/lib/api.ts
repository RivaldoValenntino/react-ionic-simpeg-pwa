import axios from "axios";

const api = axios.create({
  // baseURL: "/tirta-kahuripan/kepegawaian-api",
  baseURL: "https://devcharisma.aurorasystem.co.id/atg/kepegawaian-api",
  // withCredentials: true,
});

export default api;
