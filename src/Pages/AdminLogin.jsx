import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function AdminLogin() {
  const [credentials, setCredentials] = useState({
    kullaniciAdi: "",
    sifre: "",
  });
  const [hata, setHata] = useState("");
  const [yukleniyor, setYukleniyor] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHata("");
    setYukleniyor(true);

    try {
      const response = await api.post("/auth/login", credentials);

      if (response.data.basarili) {
        // Login başarılı - localStorage'a kaydet
        localStorage.setItem("kullaniciAdi", response.data.kullaniciAdi);
        localStorage.setItem("ad", response.data.ad);
        localStorage.setItem("soyad", response.data.soyad);
        localStorage.setItem("roller", JSON.stringify(response.data.roller));

        // Admin paneline yönlendir
        navigate("/AdminPanel");
      } else {
        setHata(response.data.mesaj);
      }
    } catch (error) {
      console.error("Login hatası:", error);
      if (error.response && error.response.data) {
        setHata(error.response.data.mesaj || "Bir hata oluştu");
      } else {
        setHata("Sunucuya bağlanılamadı");
      }
    } finally {
      setYukleniyor(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "15px",
          boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
          width: "400px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "30px",
            color: "#333",
            fontSize: "28px",
          }}
        >
          🔐 Admin Girişi
        </h2>

        {hata && (
          <div
            style={{
              background: "#fee",
              color: "#c00",
              padding: "12px",
              borderRadius: "8px",
              marginBottom: "20px",
              textAlign: "center",
              border: "1px solid #fcc",
            }}
          >
            {hata}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "bold",
                color: "#555",
              }}
            >
              Kullanıcı Adı
            </label>
            <input
              type="text"
              name="username"
              autoComplete="username" // ✅ EKLE
              value={credentials.kullaniciAdi}
              onChange={(e) =>
                setCredentials({
                  ...credentials,
                  kullaniciAdi: e.target.value,
                })
              }
              style={{
                width: "100%",
                padding: "12px",
                border: "2px solid #ddd",
                borderRadius: "8px",
                fontSize: "16px",
                boxSizing: "border-box",
              }}
              required
              disabled={yukleniyor}
            />
          </div>

          <div style={{ marginBottom: "30px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "bold",
                color: "#555",
              }}
            >
              Şifre
            </label>
            <input
              type="password"
              name="password"
              autoComplete="current-password" // ✅ EKLE
              value={credentials.sifre}
              onChange={(e) =>
                setCredentials({
                  ...credentials,
                  sifre: e.target.value,
                })
              }
              style={{
                width: "100%",
                padding: "12px",
                border: "2px solid #ddd",
                borderRadius: "8px",
                fontSize: "16px",
                boxSizing: "border-box",
              }}
              required
              disabled={yukleniyor}
            />
          </div>

          <button
            type="submit"
            disabled={yukleniyor}
            style={{
              width: "100%",
              padding: "14px",
              background: yukleniyor
                ? "#ccc"
                : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: yukleniyor ? "not-allowed" : "pointer",
              transition: "transform 0.2s",
            }}
            onMouseOver={(e) => {
              if (!yukleniyor) {
                e.target.style.transform = "scale(1.02)";
              }
            }}
            onMouseOut={(e) => {
              e.target.style.transform = "scale(1)";
            }}
          >
            {yukleniyor ? "Giriş yapılıyor..." : "Giriş Yap"}
          </button>
        </form>

        <div
          style={{
            marginTop: "20px",
            textAlign: "center",
            color: "#666",
          }}
        >
          <button
            onClick={() => navigate("/")}
            style={{
              background: "none",
              border: "none",
              color: "#667eea",
              cursor: "pointer",
              textDecoration: "underline",
              fontSize: "14px",
            }}
          >
            ← Ana Sayfaya Dön
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
