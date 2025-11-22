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

  const styles = {
    card: {
      maxWidth: 700,
      margin: '20px auto',
      padding: 20,
      borderRadius: 8,
      boxShadow: '0 6px 18px rgba(0,0,0,0.08)',
      background: '#fff',
      fontFamily: 'Segoe UI, Roboto, Helvetica, Arial, sans-serif'
    },
    header: { margin: '0 0 12px', color: '#222' },
    grid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 12,
      marginBottom: 12
    },
    full: { gridColumn: '1 / -1' },
    label: { display: 'block', fontSize: 13, marginBottom: 6, color: '#444' },
    input: {
      width: '100%',
      padding: '10px 12px',
      borderRadius: 6,
      border: '1px solid #ddd',
      fontSize: 14,
      boxSizing: 'border-box'
    },
    actions: { display: 'flex', justifyContent: 'flex-end', gap: 8 },
    button: {
      padding: '10px 16px',
      borderRadius: 6,
      border: 'none',
      cursor: 'pointer',
      fontWeight: 600
    },
    addBtn: { background: '#0078d4', color: '#fff' },
    cancelBtn: { background: '#f3f3f3', color: '#333' }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === 'vote' ? (value === '' ? '' : Number(value)) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // simple validation
      if (!form.maUV || !form.hoTen) {
        alert('Vui lòng nhập Mã UV và Họ tên');
        return;
      }
      await ungvienAPI.createUngVien(form);
      reload();
      alert("Thêm ứng viên thành công");
      // reset
      setForm({
        maUV: "",
        hoTen: "",
        diaChi: "",
        ngaySinh: "",
        gioiTinh: "",
        vote: 0
      });
    } catch (err) {
      console.error(err);
      alert('Có lỗi xảy ra khi thêm ứng viên');
    }
  };

  return (
    <div style={styles.card}>
      <h3 style={styles.header}>Thêm Ứng Viên</h3>
      <form onSubmit={handleSubmit}>
        <div style={styles.grid}>
          <div>
            <label style={styles.label}>Mã UV</label>
            <input
              name="maUV"
              value={form.maUV}
              onChange={handleChange}
              placeholder="Mã ứng viên"
              style={styles.input}
            />
          </div>

          <div>
            <label style={styles.label}>Họ tên</label>
            <input
              name="hoTen"
              value={form.hoTen}
              onChange={handleChange}
              placeholder="Họ và tên"
              style={styles.input}
            />
          </div>

          <div style={styles.full}>
            <label style={styles.label}>Địa chỉ</label>
            <input
              name="diaChi"
              value={form.diaChi}
              onChange={handleChange}
              placeholder="Địa chỉ"
              style={styles.input}
            />
          </div>

          <div>
            <label style={styles.label}>Ngày sinh</label>
            <input
              name="ngaySinh"
              value={form.ngaySinh}
              onChange={handleChange}
              type="date"
              style={styles.input}
            />
          </div>

          <div>
            <label style={styles.label}>Giới tính</label>
            <select
              name="gioiTinh"
              value={form.gioiTinh}
              onChange={handleChange}
              style={{ ...styles.input, height: 42 }}
            >
              <option value="">Chọn giới tính</option>
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
              <option value="Khác">Khác</option>
            </select>
          </div>

          <div style={styles.full}>
            <label style={styles.label}>Vote</label>
            <input
              name="vote"
              value={form.vote}
              onChange={handleChange}
              type="number"
              min="0"
              placeholder="Số vote"
              style={styles.input}
            />
          </div>
        </div>

        <div style={styles.actions}>
          <button
            type="button"
            onClick={() =>
              setForm({
                maUV: "",
                hoTen: "",
                diaChi: "",
                ngaySinh: "",
                gioiTinh: "",
                vote: 0
              })
            }
            style={{ ...styles.button, ...styles.cancelBtn }}
          >
            Reset
          </button>
          <button type="submit" style={{ ...styles.button, ...styles.addBtn }}>
            Thêm
          </button>
        </div>
      </form>
    </div>
  );
};

export default UngVienForm;
