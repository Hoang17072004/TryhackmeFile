import React, { useEffect, useState } from 'react';
import { ungvienAPI } from "../services/api";
import UngVienForm from "../components/UngVienForm";
import UngVienEditModal from "../components/UngVienEditModal";

const UngVienPage = () => {
  const [ungviens, setUngviens] = useState([]);
  const [editing, setEditing] = useState(null);

  const loadData = async () => {
    const res = await ungvienAPI.getAllUngVien();
    setUngviens(res.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (maUV) => {
    if (window.confirm("Bạn có chắc muốn xóa ứng viên?")) {
      await ungvienAPI.deleteUngVien(maUV);
      loadData();
    }
  };

  const handleVote = async (maUV) => {
    await ungvienAPI.voteUngVien(maUV, 1);
    loadData();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Quản Lý Ứng Viên Bầu Cử</h2>

      <UngVienForm reload={loadData} />

      <h3>Danh Sách Ứng Viên</h3>
      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th>Mã</th>
            <th>Họ Tên</th>
            <th>Địa Chỉ</th>
            <th>Ngày Sinh</th>
            <th>Giới Tính</th>
            <th>Vote</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {ungviens.map((uv) => (
            <tr key={uv.Key}>
              <td>{uv.Record.maUV}</td>
              <td>{uv.Record.hoTen}</td>
              <td>{uv.Record.diaChi}</td>
              <td>{uv.Record.ngaySinh}</td>
              <td>{uv.Record.gioiTinh}</td>
              <td>{uv.Record.vote}</td>
              <td>
                <button onClick={() => setEditing(uv.Record)}>Sửa</button>
                <button onClick={() => handleDelete(uv.Record.maUV)}>Xóa</button>
                <button onClick={() => handleVote(uv.Record.maUV)}>Vote +1</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editing && (
        <UngVienEditModal
          data={editing}
          close={() => setEditing(null)}
          reload={loadData}
        />
      )}
    </div>
  );
};

export default UngVienPage;
