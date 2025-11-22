import React, { useState } from 'react';
import { ungvienAPI } from "../services/api";

const UngVienForm = ({ reload }) => {
  const [form, setForm] = useState({
    maUV: "",
    hoTen: "",
    diaChi: "",
    ngaySinh: "",
    gioiTinh: "",
    vote: 0
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await ungvienAPI.createUngVien(form);
    reload();
    alert("Thêm ứng viên thành công");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Thêm Ứng Viên</h3>
      <input name="maUV" placeholder="Mã UV" onChange={handleChange} />
      <input name="hoTen" placeholder="Họ tên" onChange={handleChange} />
      <input name="diaChi" placeholder="Địa chỉ" onChange={handleChange} />
      <input name="ngaySinh" placeholder="YYYY-MM-DD" onChange={handleChange} />
      <input name="gioiTinh" placeholder="Giới tính" onChange={handleChange} />
      <input name="vote" placeholder="Vote (số)" onChange={handleChange} />
      <button type="submit">Thêm</button>
    </form>
  );
};

export default UngVienForm;
