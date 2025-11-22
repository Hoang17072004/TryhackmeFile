import React, { useEffect, useState } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import { ungvienAPI } from '../services/api';

const UngVienTable = () => {
  const [ungviens, setUngviens] = useState([]);
  const [voteValue, setVoteValue] = useState({});

  const fetchData = async () => {
    const res = await ungvienAPI.getAllUngVien();
    setUngviens(res.data);
  };

  useEffect(() => { fetchData(); }, []);

  const handleVote = async (maUV) => {
    const soPhieu = voteValue[maUV] || 1;
    await ungvienAPI.voteUngVien(maUV, parseInt(soPhieu));
    fetchData();
  };

  return (
    <div className="container mt-4">
      <h3>Danh sách ứng viên</h3>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Mã UV</th>
            <th>Họ Tên</th>
            <th>Địa Chỉ</th>
            <th>Ngày Sinh</th>
            <th>Giới Tính</th>
            <th>Vote</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {ungviens.map(uv => (
            <tr key={uv.Key}>
              <td>{uv.Record.maUV}</td>
              <td>{uv.Record.hoTen}</td>
              <td>{uv.Record.diaChi}</td>
              <td>{uv.Record.ngaySinh}</td>
              <td>{uv.Record.gioiTinh}</td>
              <td>{uv.Record.vote}</td>
              <td>
                <Form.Control type="number" style={{ width: '80px', display: 'inline' }}
                  value={voteValue[uv.Record.maUV] || ''}
                  onChange={(e) => setVoteValue({...voteValue, [uv.Record.maUV]: e.target.value})} />
                <Button variant="success" size="sm" className="ms-2"
                  onClick={() => handleVote(uv.Record.maUV)}>Vote</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UngVienTable;
