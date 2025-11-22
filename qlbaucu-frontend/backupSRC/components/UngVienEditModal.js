import React, { useState } from 'react';
import { ungvienAPI } from "../services/api";

const UngVienEditModal = ({ data, close, reload }) => {
  const [form, setForm] = useState(data);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async () => {
    await ungvienAPI.updateUngVien(form.maUV, form);
    reload();
    close();
    alert("Cập nhật thành công");
  };

  return (
    <div style={{ 
      position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
      background: "rgba(0,0,0,0.3)", display: "flex", justifyContent: "center", alignItems: "center"
    }}>
      <div style={{ background: "#fff", padding: 20, borderRadius: 8 }}>
        <h3>Sửa Ứng Viên</h3>
        <input name="hoTen" defaultValue={form.hoTen} onChange={handleChange} />
        <input name="diaChi" defaultValue={form.diaChi} onChange={handleChange} />
        <input name="ngaySinh" defaultValue={form.ngaySinh} onChange={handleChange} />
        <input name="gioiTinh" defaultValue={form.gioiTinh} onChange={handleChange} />
        <button onClick={handleSave}>Lưu</button>
        <button onClick={close}>Đóng</button>
      </div>
    </div>
  );
};

export default UngVienEditModal;
