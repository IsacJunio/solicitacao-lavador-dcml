import axios from "axios";

const API_URL = "http://localhost:3000/api/solicitacoes";

const SolicitacaoApi = {
  create: (data) => axios.post(API_URL, data),

  getAll: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  update: async (id, data) => {
    const response = await axios.put(`${API_URL}/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    // <-- Adicione a vírgula antes deste método!
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  },
};

export default SolicitacaoApi;
