import React, { useState, useEffect } from "react";

function CalisanListele() {
  const [calisanlar, setCalisanlar] = useState([]);
  const [yukleniyor, setYukleniyor] = useState(false);
  const [hata, setHata] = useState("");
  const [yeniCalisan, setYeniCalisan] = useState({
    ad: "",
    soyad: "",
    telefon: "",
  });
  const [modalAcik, setModalAcik] = useState(false);
  const [seciliCalisan, setSeciliCalisan] = useState({
    id: "",
    ad: "",
    soyad: "",
    telefon: "",
  });

  useEffect(() => {
    calisanlariGetir();
  }, []);

  const calisanlariGetir = async () => {
    setYukleniyor(true);
    try {
      const res = await fetch(
        "http://localhost:8080/api/calisan/getCalisanList"
      );
      if (!res.ok) throw new Error("Çalışan listesi alınamadı");
      const data = await res.json();
      setCalisanlar(data);
    } catch (err) {
      setHata(err.message);
    } finally {
      setYukleniyor(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bu çalışanı silmek istediğine emin misin?")) return;

    try {
      const res = await fetch(
        `http://localhost:8080/api/calisan/deleteCalisan/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!res.ok) throw new Error("Silme işlemi başarısız!");
      setCalisanlar((prev) => prev.filter((c) => c.id !== id));
      alert("Çalışan başarıyla silindi ✅");
    } catch (err) {
      alert("❌ Hata: " + err.message);
    }
  };

  const handleGuncelle = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/calisan/updateCalisan/${seciliCalisan.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(seciliCalisan),
        }
      );
      if (!res.ok) throw new Error("Güncelleme işlemi başarısız!");
      const updated = await res.json();
      setCalisanlar((prev) =>
        prev.map((c) => (c.id === seciliCalisan.id ? updated : c))
      );
      setModalAcik(false);
      alert("Çalışan başarıyla güncellendi ✅");
    } catch (err) {
      alert("❌ Hata: " + err.message);
    }
  };

  const handleEkle = () => {
    if (!yeniCalisan.ad || !yeniCalisan.soyad || !yeniCalisan.telefon) {
      alert("Lütfen tüm alanları doldurun!");
      return;
    }

    fetch("http://localhost:8080/api/calisan/createCalisan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(yeniCalisan),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Çalışan eklenemedi!");
        return res.json();
      })
      .then((yeni) => {
        setCalisanlar((prev) => [...prev, yeni]);
        setYeniCalisan({ ad: "", soyad: "", telefon: "" });
        alert("Yeni çalışan eklendi ✅");
      })
      .catch((err) => {
        alert("❌ Hata: " + err.message);
      });
  };

  return (
    <div
      style={{
        padding: "40px 20px",
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
        background: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)",
        minHeight: "100vh",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.95)",
            borderRadius: "20px",
            padding: "30px",
            marginBottom: "30px",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(10px)",
          }}
        >
          <h2
            style={{
              color: "#1e3a8a",
              textAlign: "center",
              fontSize: "32px",
              fontWeight: "700",
              margin: "0",
              letterSpacing: "-0.5px",
            }}
          >
            👥 Çalışan Yönetim Sistemi
          </h2>
          <p
            style={{
              textAlign: "center",
              color: "#64748b",
              marginTop: "8px",
              fontSize: "14px",
            }}
          >
            Çalışanlarınızı kolayca yönetin
          </p>
        </div>

        {/* Yeni Çalışan Ekleme */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.95)",
            borderRadius: "16px",
            padding: "25px",
            marginBottom: "30px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
          }}
        >
          <h3
            style={{
              marginTop: "0",
              marginBottom: "20px",
              color: "#1e3a8a",
              fontSize: "18px",
              fontWeight: "600",
            }}
          >
            ➕ Yeni Çalışan Ekle
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "15px",
              alignItems: "end",
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "6px",
                  color: "#475569",
                  fontSize: "13px",
                  fontWeight: "500",
                }}
              >
                Ad
              </label>
              <input
                type="text"
                placeholder="Örn: Ahmet"
                value={yeniCalisan.ad}
                onChange={(e) =>
                  setYeniCalisan({ ...yeniCalisan, ad: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "10px",
                  border: "2px solid #e2e8f0",
                  fontSize: "14px",
                  transition: "all 0.3s ease",
                  outline: "none",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "6px",
                  color: "#475569",
                  fontSize: "13px",
                  fontWeight: "500",
                }}
              >
                Soyad
              </label>
              <input
                type="text"
                placeholder="Örn: Yılmaz"
                value={yeniCalisan.soyad}
                onChange={(e) =>
                  setYeniCalisan({ ...yeniCalisan, soyad: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "10px",
                  border: "2px solid #e2e8f0",
                  fontSize: "14px",
                  transition: "all 0.3s ease",
                  outline: "none",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "6px",
                  color: "#475569",
                  fontSize: "13px",
                  fontWeight: "500",
                }}
              >
                Telefon
              </label>
              <input
                type="text"
                placeholder="Örn: 0555 123 45 67"
                value={yeniCalisan.telefon}
                onChange={(e) =>
                  setYeniCalisan({ ...yeniCalisan, telefon: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "10px",
                  border: "2px solid #e2e8f0",
                  fontSize: "14px",
                  transition: "all 0.3s ease",
                  outline: "none",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>
            <button
              onClick={handleEkle}
              style={{
                background: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)",
                color: "white",
                border: "none",
                borderRadius: "10px",
                padding: "12px 24px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "600",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 15px rgba(59, 130, 246, 0.4)",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 6px 20px rgba(59, 130, 246, 0.6)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 15px rgba(59, 130, 246, 0.4)";
              }}
            >
              Ekle
            </button>
          </div>
        </div>

        {yukleniyor && (
          <div
            style={{
              textAlign: "center",
              padding: "40px",
              color: "white",
              fontSize: "16px",
            }}
          >
            <div
              style={{
                display: "inline-block",
                width: "40px",
                height: "40px",
                border: "4px solid rgba(255,255,255,0.3)",
                borderTop: "4px solid white",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
              }}
            ></div>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        )}

        {hata && (
          <div
            style={{
              background: "#fed7d7",
              color: "#c53030",
              padding: "16px",
              borderRadius: "12px",
              marginBottom: "20px",
              border: "1px solid #fc8181",
            }}
          >
            {hata}
          </div>
        )}

        {/* Card Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "24px",
          }}
        >
          {calisanlar.map((c) => (
            <div
              key={c.id}
              style={{
                background: "rgba(255, 255, 255, 0.95)",
                borderRadius: "16px",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                transition: "all 0.3s ease",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow =
                  "0 12px 32px rgba(0, 0, 0, 0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 4px 20px rgba(0, 0, 0, 0.08)";
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "0",
                  left: "0",
                  right: "0",
                  height: "4px",
                  background:
                    "linear-gradient(90deg, #1e3a8a 0%, #3b82f6 100%)",
                }}
              ></div>

              <div
                style={{
                  width: "90px",
                  height: "90px",
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "16px",
                  boxShadow: "0 8px 24px rgba(59, 130, 246, 0.3)",
                }}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  alt="Çalışan"
                  style={{
                    width: "50px",
                    height: "50px",
                    filter: "brightness(0) invert(1)",
                  }}
                />
              </div>

              <h3
                style={{
                  margin: "0 0 8px 0",
                  color: "#1e293b",
                  fontSize: "20px",
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                {c.ad} {c.soyad}
              </h3>

              <div
                style={{
                  background: "#f1f5f9",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  marginBottom: "20px",
                }}
              >
                <p
                  style={{
                    color: "#475569",
                    fontSize: "14px",
                    margin: "0",
                    fontWeight: "500",
                  }}
                >
                  📞 {c.telefon}
                </p>
              </div>

              <div style={{ display: "flex", gap: "10px", width: "100%" }}>
                <button
                  onClick={() => {
                    setSeciliCalisan({
                      id: c.id,
                      ad: c.ad,
                      soyad: c.soyad,
                      telefon: c.telefon,
                    });
                    setModalAcik(true);
                  }}
                  style={{
                    flex: "1",
                    background:
                      "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)",
                    color: "white",
                    border: "none",
                    padding: "10px 16px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: "600",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => (e.target.style.opacity = "0.9")}
                  onMouseLeave={(e) => (e.target.style.opacity = "1")}
                >
                  ✏️ Düzenle
                </button>

                <button
                  onClick={() => handleDelete(c.id)}
                  style={{
                    flex: "1",
                    background: "#ef4444",
                    color: "white",
                    border: "none",
                    padding: "10px 16px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: "600",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => (e.target.style.background = "#dc2626")}
                  onMouseLeave={(e) => (e.target.style.background = "#ef4444")}
                >
                  🗑️ Sil
                </button>
              </div>
            </div>
          ))}
        </div>

        {calisanlar.length === 0 && !yukleniyor && !hata && (
          <div
            style={{
              background: "rgba(255, 255, 255, 0.95)",
              borderRadius: "16px",
              padding: "60px 40px",
              textAlign: "center",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
            }}
          >
            <div style={{ fontSize: "64px", marginBottom: "16px" }}>📋</div>
            <h3
              style={{
                color: "#1e293b",
                marginBottom: "8px",
                fontSize: "20px",
              }}
            >
              Henüz çalışan bulunmuyor
            </h3>
            <p style={{ color: "#64748b", fontSize: "14px" }}>
              Yukarıdaki formu kullanarak yeni çalışan ekleyebilirsiniz
            </p>
          </div>
        )}
      </div>

      {/* Modern Modal */}
      {modalAcik && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            backdropFilter: "blur(4px)",
            animation: "fadeIn 0.3s ease",
          }}
          onClick={() => setModalAcik(false)}
        >
          <style>{`@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }`}</style>
          <div
            style={{
              background: "white",
              borderRadius: "20px",
              width: "90%",
              maxWidth: "480px",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
              overflow: "hidden",
              animation: "slideUp 0.3s ease",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <style>{`@keyframes slideUp { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }`}</style>

            {/* Modal Header */}
            <div
              style={{
                background: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)",
                padding: "24px 30px",
                color: "white",
              }}
            >
              <h3 style={{ margin: "0", fontSize: "22px", fontWeight: "600" }}>
                ✏️ Çalışan Bilgilerini Güncelle
              </h3>
              <p
                style={{
                  margin: "8px 0 0 0",
                  fontSize: "13px",
                  opacity: "0.9",
                }}
              >
                Bilgileri düzenleyin ve kaydedin
              </p>
            </div>

            {/* Modal Body */}
            <div style={{ padding: "30px" }}>
              <div style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    color: "#1e293b",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  Ad
                </label>
                <input
                  type="text"
                  value={seciliCalisan.ad}
                  onChange={(e) =>
                    setSeciliCalisan({ ...seciliCalisan, ad: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: "10px",
                    border: "2px solid #e2e8f0",
                    fontSize: "15px",
                    transition: "all 0.3s ease",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
                  onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
                />
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    color: "#1e293b",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  Soyad
                </label>
                <input
                  type="text"
                  value={seciliCalisan.soyad}
                  onChange={(e) =>
                    setSeciliCalisan({
                      ...seciliCalisan,
                      soyad: e.target.value,
                    })
                  }
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: "10px",
                    border: "2px solid #e2e8f0",
                    fontSize: "15px",
                    transition: "all 0.3s ease",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
                  onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
                />
              </div>

              <div style={{ marginBottom: "30px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    color: "#1e293b",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  Telefon
                </label>
                <input
                  type="text"
                  value={seciliCalisan.telefon}
                  onChange={(e) =>
                    setSeciliCalisan({
                      ...seciliCalisan,
                      telefon: e.target.value,
                    })
                  }
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: "10px",
                    border: "2px solid #e2e8f0",
                    fontSize: "15px",
                    transition: "all 0.3s ease",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
                  onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
                />
              </div>

              {/* Modal Actions */}
              <div style={{ display: "flex", gap: "12px" }}>
                <button
                  onClick={handleGuncelle}
                  style={{
                    flex: "1",
                    background:
                      "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)",
                    color: "white",
                    border: "none",
                    borderRadius: "10px",
                    padding: "14px",
                    cursor: "pointer",
                    fontSize: "15px",
                    fontWeight: "600",
                    transition: "all 0.3s ease",
                    boxShadow: "0 4px 15px rgba(59, 130, 246, 0.4)",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow =
                      "0 6px 20px rgba(59, 130, 246, 0.6)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow =
                      "0 4px 15px rgba(59, 130, 246, 0.4)";
                  }}
                >
                  ✅ Kaydet
                </button>

                <button
                  onClick={() => setModalAcik(false)}
                  style={{
                    flex: "1",
                    background: "#e2e8f0",
                    color: "#475569",
                    border: "none",
                    borderRadius: "10px",
                    padding: "14px",
                    cursor: "pointer",
                    fontSize: "15px",
                    fontWeight: "600",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => (e.target.style.background = "#cbd5e0")}
                  onMouseLeave={(e) => (e.target.style.background = "#e2e8f0")}
                >
                  ❌ İptal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CalisanListele;
