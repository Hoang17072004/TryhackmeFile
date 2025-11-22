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
      background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center",
      zIndex: 1000
    }}>
      <div style={{ 
        background: "#fff", padding: 30, borderRadius: 12, 
        boxShadow: "0 4px 20px rgba(0,0,0,0.2)", minWidth: 400
      }}>
        <h3 style={{ marginBottom: 20, fontSize: 20, fontWeight: 600, color: "#333" }}>
          Sửa Ứng Viên
        </h3>
        
        <div style={{ marginBottom: 15 }}>
          <label style={{ display: "block", marginBottom: 5, fontSize: 14, fontWeight: 500, color: "#555" }}>
            Họ Tên
          </label>
          <input 
            name="hoTen" 
            defaultValue={form.hoTen} 
            onChange={handleChange}
            style={{ width: "100%", padding: 10, border: "1px solid #ddd", borderRadius: 6, fontSize: 14, boxSizing: "border-box" }}
          />
        </div>

        <div style={{ marginBottom: 15 }}>
          <label style={{ display: "block", marginBottom: 5, fontSize: 14, fontWeight: 500, color: "#555" }}>
            Địa Chỉ
          </label>
          <input 
            name="diaChi" 
            defaultValue={form.diaChi} 
            onChange={handleChange}
            style={{ width: "100%", padding: 10, border: "1px solid #ddd", borderRadius: 6, fontSize: 14, boxSizing: "border-box" }}
          />
        </div>

        <div style={{ marginBottom: 15 }}>
          <label style={{ display: "block", marginBottom: 5, fontSize: 14, fontWeight: 500, color: "#555" }}>
            Ngày Sinh
          </label>
          <input 
            name="ngaySinh" 
            defaultValue={form.ngaySinh} 
            onChange={handleChange}
            style={{ width: "100%", padding: 10, border: "1px solid #ddd", borderRadius: 6, fontSize: 14, boxSizing: "border-box" }}
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ display: "block", marginBottom: 5, fontSize: 14, fontWeight: 500, color: "#555" }}>
            Giới Tính
          </label>
          <input 
            name="gioiTinh" 
            defaultValue={form.gioiTinh} 
            onChange={handleChange}
            style={{ width: "100%", padding: 10, border: "1px solid #ddd", borderRadius: 6, fontSize: 14, boxSizing: "border-box" }}
          />
        </div>

        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <button 
            onClick={close}
            style={{ padding: "10px 20px", background: "#e0e0e0", border: "none", borderRadius: 6, cursor: "pointer", fontSize: 14, fontWeight: 500 }}
          >
            Đóng
          </button>
          <button 
            onClick={handleSave}
            style={{ padding: "10px 20px", background: "#1890ff", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer", fontSize: 14, fontWeight: 500 }}
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};

export default UngVienEditModal;
