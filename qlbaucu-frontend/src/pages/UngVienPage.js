import React, { useEffect, useState } from "react";
import { ungvienAPI } from "../services/api";
import UngVienForm from "../components/UngVienForm";
import UngVienEditModal from "../components/UngVienEditModal";

const styles = {
  container: {
    maxWidth: 1100,
    margin: "24px auto",
    padding: 20,
    fontFamily: "'Segoe UI', Roboto, 'Helvetica Neue', Arial",
    color: "#222",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    gap: 16,
    marginBottom: 18,
  },
  title: {
    margin: 0,
    fontSize: 26,
    fontWeight: 700,
    color: "#0b3d91",
  },
  subtitle: {
    margin: "24px 0 12px",
    fontSize: 18,
    color: "#333",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: 16,
  },
  card: {
    background: "linear-gradient(180deg,#fff,#fbfdff)",
    border: "1px solid #e6eefc",
    borderRadius: 10,
    padding: 14,
    boxShadow: "0 1px 6px rgba(12,38,100,0.06)",
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  avatarRow: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: "50%",
    background: "linear-gradient(135deg,#3b82f6,#60a5fa)",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    fontSize: 18,
    flexShrink: 0,
  },
  meta: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  name: {
    margin: 0,
    fontSize: 16,
    fontWeight: 600,
  },
  info: {
    margin: 0,
    fontSize: 13,
    color: "#586069",
  },
  badge: {
    background: "#f0f9ff",
    color: "#0369a1",
    padding: "6px 10px",
    borderRadius: 999,
    fontWeight: 700,
    fontSize: 14,
  },
  actions: {
    display: "flex",
    gap: 8,
    marginTop: 8,
    flexWrap: "wrap",
  },
  btn: {
    padding: "8px 10px",
    borderRadius: 8,
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: 13,
  },
  editBtn: {
    background: "#0ea5e9",
    color: "#fff",
  },
  deleteBtn: {
    background: "#ef4444",
    color: "#fff",
  },
  voteBtn: {
    background: "#10b981",
    color: "#fff",
  },
  smallText: {
    fontSize: 12,
    color: "#6b7280",
  },
  noData: {
    color: "#6b7280",
    padding: 18,
    textAlign: "center",
    border: "1px dashed #e6eefc",
    borderRadius: 8,
  },
};

const getInitials = (name = "") =>
  name
    .split(" ")
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

const formatDate = (d) => {
  if (!d) return "";
  const date = new Date(d);
  if (isNaN(date)) return d;
  return date.toLocaleDateString();
};

const UngVienPage = () => {
  const [ungviens, setUngviens] = useState([]);
  const [editing, setEditing] = useState(null);

  const loadData = async () => {
    try {
      const res = await ungvienAPI.getAllUngVien();
      setUngviens(res.data || []);
    } catch (err) {
      console.error("Load data error:", err);
    }
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
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Quản Lý Ứng Viên Bầu Cử</h2>
      </div>

      <UngVienForm reload={loadData} />

      <h3 style={styles.subtitle}>Danh Sách Ứng Viên</h3>

      {ungviens.length === 0 ? (
        <div style={styles.noData}>Chưa có ứng viên nào. Hãy thêm ứng viên mới.</div>
      ) : (
        <div style={styles.grid}>
          {ungviens.map((uv) => {
            const r = uv.Record || {};
            return (
              <div key={uv.Key} style={styles.card}>
                <div style={styles.row}>
                  <div style={styles.avatarRow}>
                    <div style={styles.avatar}>{getInitials(r.hoTen)}</div>
                    <div style={styles.meta}>
                      <p style={styles.name}>
                        {r.hoTen || "—"}{" "}
                        <span style={{ fontWeight: 500, color: "#0f172a", fontSize: 12 }}>
                          #{r.maUV || ""}
                        </span>
                      </p>
                      <p style={styles.info}>{r.diaChi || "Địa chỉ chưa có"}</p>
                    </div>
                  </div>
                  <div style={styles.badge}>{r.vote ?? 0} votes</div>
                </div>

                <div style={{ ...styles.row, marginTop: 6 }}>
                  <div>
                    <div style={styles.smallText}>Ngày sinh</div>
                    <div style={{ fontSize: 14 }}>{formatDate(r.ngaySinh)}</div>
                  </div>
                  <div>
                    <div style={styles.smallText}>Giới tính</div>
                    <div style={{ fontSize: 14 }}>{r.gioiTinh || "—"}</div>
                  </div>
                </div>

                <div style={styles.actions}>
                  <button
                    style={{ ...styles.btn, ...styles.editBtn }}
                    onClick={() => setEditing(r)}
                    aria-label={`Sửa ${r.hoTen}`}
                  >
                    Sửa
                  </button>
                  <button
                    style={{ ...styles.btn, ...styles.deleteBtn }}
                    onClick={() => handleDelete(r.maUV)}
                    aria-label={`Xóa ${r.hoTen}`}
                  >
                    Xóa
                  </button>
                  <button
                    style={{ ...styles.btn, ...styles.voteBtn }}
                    onClick={() => handleVote(r.maUV)}
                    aria-label={`Vote ${r.hoTen}`}
                  >
                    Vote +1
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {editing && (
        <UngVienEditModal data={editing} close={() => setEditing(null)} reload={loadData} />
      )}
    </div>
  );
};

export default UngVienPage;

