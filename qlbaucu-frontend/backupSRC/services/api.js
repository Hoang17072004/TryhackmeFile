import axios from 'axios';

const API_BASE_URL = process.env.NODE_ENV === 'development' ? '/api' : 'http://localhost:3006/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

export const ungvienAPI = {
  initData: () => api.post('/init'),
  getAllUngVien: () => api.get('/ungvien'),
  getUngVienByMa: (maUV) => api.get(`/ungvien/${maUV}`),
  createUngVien: (data) => api.post('/ungvien', data),
  updateUngVien: (maUV, data) => api.put(`/ungvien/${maUV}`, data),
  deleteUngVien: (maUV) => api.delete(`/ungvien/${maUV}`),
  voteUngVien: (maUV, vote) => api.post(`/ungvien/${maUV}/vote`, { vote }),
};
