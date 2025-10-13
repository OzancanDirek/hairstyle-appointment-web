import React, { useEffect, useState } from "react";

function HizmetYonetimi() {
  const [hizmetler, setHizmetler] = useState([]);
  const [yukleniyor, setYukleniyor] = useState(false);
  const [hata, setHata] = useState("");
  const [modalAcik, setModalAcik] = useState(false);
  const [yeniHizmet, setYeniHizmet] = useState({
    ad: "",
    fiyat: "",
    sure: "",
  });

  useEffect(() => {
    fetchHizmetler();
  }, []);

  const fetchHizmetler = async () => {
    setYukleniyor(true);
    try {
      const res = await fetch("http://localhost:8080/api/hizmet/aktif");
      if (!res.ok) throw new Error("Hizmetler alınamadı");
      const data = await res.json();
      setHizmetler(data);
    } catch (err) {
      setHata(err.message);
    } finally {
      setYukleniyor(false);
    }
  };

  const handleEkle = async () => {
    if (!yeniHizmet.ad || !yeniHizmet.fiyat || !yeniHizmet.sure) {
      alert("Lütfen tüm alanları doldurun!");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/hizmet/ekle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(yeniHizmet),
      });
      if (!res.ok) throw new Error("Hizmet eklenemedi!");
      alert("✅ Hizmet başarıyla eklendi!");
      setModalAcik(false);
      setYeniHizmet({ ad: "", fiyat: "", sure: "" });
      fetchHizmetler();
    } catch (err) {
      alert("❌ Hata: " + err.message);
    }
  };

  const handleSil = async (id) => {
    if (!window.confirm("Bu hizmeti silmek istediğinize emin misiniz?")) return;

    try {
      const res = await fetch(`http://localhost:8080/api/hizmet/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Silme işlemi başarısız!");
      alert("✅ Hizmet silindi!");
      fetchHizmetler();
    } catch (err) {
      alert("❌ Hata: " + err.message);
    }
  };

  return (
    <div
      style={{
        padding: "40px 20px",
        fontFamily: "'Inter', sans-serif",
        background: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)",
        minHeight: "100vh",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <div
          style={{
            background: "rgba(255, 255, 255, 0.95)",
            borderRadius: "20px",
            padding: "30px",
            marginBottom: "30px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
            backdropFilter: "blur(10px)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <h2
                style={{
                  margin: "0 0 8px 0",
                  fontSize: "32px",
                  fontWeight: "700",
                  color: "#1e3a8a",
                  letterSpacing: "-0.5px",
                }}
              >
                ✂️ Hizmet Yönetimi
              </h2>
              <p style={{ margin: "0", fontSize: "14px", color: "#64748b" }}>
                Hizmetleri görüntüleyin ve yönetin
              </p>
            </div>
            <button
              onClick={() => setModalAcik(true)}
              style={{
                background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                color: "white",
                border: "none",
                padding: "12px 24px",
                borderRadius: "10px",
                fontSize: "15px",
                fontWeight: "600",
                cursor: "pointer",
                boxShadow: "0 4px 15px rgba(16, 185, 129, 0.4)",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 6px 20px rgba(16, 185, 129, 0.6)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 15px rgba(16, 185, 129, 0.4)";
              }}
            >
              ➕ Yeni Hizmet Ekle
            </button>
          </div>
        </div>

        {yukleniyor && (
          <div
            style={{
              background: "rgba(255, 255, 255, 0.95)",
              borderRadius: "16px",
              padding: "60px",
              textAlign: "center",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            }}
          >
            <div
              style={{
                display: "inline-block",
                width: "40px",
                height: "40px",
                border: "4px solid #e2e8f0",
                borderTop: "4px solid #3b82f6",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
              }}
            ></div>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            <p style={{ marginTop: "16px", color: "#64748b" }}>Yükleniyor...</p>
          </div>
        )}

        {hata && (
          <div
            style={{
              background: "#fee2e2",
              color: "#991b1b",
              padding: "20px",
              borderRadius: "12px",
              marginBottom: "20px",
              border: "2px solid #fca5a5",
            }}
          >
            ⚠️ {hata}
          </div>
        )}

        {!yukleniyor && !hata && hizmetler.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "24px",
            }}
          >
            {hizmetler.map((hizmet) => (
              <div
                key={hizmet.id}
                style={{
                  background: "rgba(255, 255, 255, 0.95)",
                  borderRadius: "16px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  overflow: "hidden",
                  transition: "all 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow =
                    "0 12px 32px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 20px rgba(0,0,0,0.08)";
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
                      "linear-gradient(90deg, #f59e0b 0%, #d97706 100%)",
                  }}
                ></div>

                <div style={{ padding: "24px" }}>
                  <div
                    style={{
                      width: "64px",
                      height: "64px",
                      borderRadius: "12px",
                      background:
                        "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "32px",
                      marginBottom: "16px",
                    }}
                  >
                    ✂️
                  </div>

                  <h3
                    style={{
                      margin: "0 0 16px 0",
                      fontSize: "20px",
                      fontWeight: "600",
                      color: "#0f172a",
                    }}
                  >
                    {hizmet.ad}
                  </h3>

                  <div
                    style={{
                      display: "flex",
                      gap: "12px",
                      marginBottom: "20px",
                    }}
                  >
                    <div
                      style={{
                        flex: 1,
                        background: "#f8fafc",
                        padding: "12px",
                        borderRadius: "8px",
                        textAlign: "center",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "11px",
                          color: "#64748b",
                          marginBottom: "4px",
                          textTransform: "uppercase",
                          fontWeight: "600",
                        }}
                      >
                        Fiyat
                      </div>
                      <div
                        style={{
                          fontSize: "18px",
                          fontWeight: "700",
                          color: "#f59e0b",
                        }}
                      >
                        {hizmet.fiyat}₺
                      </div>
                    </div>
                    <div
                      style={{
                        flex: 1,
                        background: "#f8fafc",
                        padding: "12px",
                        borderRadius: "8px",
                        textAlign: "center",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "11px",
                          color: "#64748b",
                          marginBottom: "4px",
                          textTransform: "uppercase",
                          fontWeight: "600",
                        }}
                      >
                        Süre
                      </div>
                      <div
                        style={{
                          fontSize: "18px",
                          fontWeight: "700",
                          color: "#3b82f6",
                        }}
                      >
                        {hizmet.sure} dk
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleSil(hizmet.id)}
                    style={{
                      width: "100%",
                      background: "#ef4444",
                      color: "white",
                      border: "none",
                      padding: "10px",
                      borderRadius: "8px",
                      fontSize: "14px",
                      fontWeight: "600",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.background = "#dc2626")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.background = "#ef4444")
                    }
                  >
                    🗑️ Sil
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {!yukleniyor && !hata && hizmetler.length === 0 && (
          <div
            style={{
              background: "rgba(255, 255, 255, 0.95)",
              borderRadius: "16px",
              padding: "60px 40px",
              textAlign: "center",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            }}
          >
            <div style={{ fontSize: "64px", marginBottom: "16px" }}>✂️</div>
            <h3
              style={{
                color: "#0f172a",
                marginBottom: "8px",
                fontSize: "18px",
                fontWeight: "600",
              }}
            >
              Henüz hizmet bulunmuyor
            </h3>
            <p
              style={{
                color: "#64748b",
                fontSize: "14px",
                margin: "0 0 24px 0",
              }}
            >
              Yeni hizmet ekleyerek başlayın
            </p>
            <button
              onClick={() => setModalAcik(true)}
              style={{
                background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                color: "white",
                border: "none",
                padding: "12px 24px",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              ➕ İlk Hizmeti Ekle
            </button>
          </div>
        )}
      </div>

      {modalAcik && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            backdropFilter: "blur(4px)",
          }}
          onClick={() => setModalAcik(false)}
        >
          <div
            style={{
              background: "white",
              borderRadius: "20px",
              width: "90%",
              maxWidth: "500px",
              boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
              overflow: "hidden",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                padding: "24px 30px",
                color: "white",
              }}
            >
              <h3 style={{ margin: "0", fontSize: "22px", fontWeight: "600" }}>
                ➕ Yeni Hizmet Ekle
              </h3>
              <p
                style={{
                  margin: "8px 0 0 0",
                  fontSize: "13px",
                  opacity: "0.9",
                }}
              >
                Hizmet bilgilerini girin
              </p>
            </div>
            <div style={{ padding: "30px" }}>
              <div style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#0f172a",
                  }}
                >
                  Hizmet Adı
                </label>
                <input
                  type="text"
                  placeholder="Örn: Saç Kesimi"
                  value={yeniHizmet.ad}
                  onChange={(e) =>
                    setYeniHizmet({ ...yeniHizmet, ad: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: "2px solid #e2e8f0",
                    borderRadius: "10px",
                    fontSize: "15px",
                    outline: "none",
                    boxSizing: "border-box",
                    transition: "all 0.3s",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#10b981")}
                  onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
                />
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "15px",
                  marginBottom: "30px",
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#0f172a",
                    }}
                  >
                    Fiyat (₺)
                  </label>
                  <input
                    type="number"
                    placeholder="100"
                    value={yeniHizmet.fiyat}
                    onChange={(e) =>
                      setYeniHizmet({ ...yeniHizmet, fiyat: e.target.value })
                    }
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      border: "2px solid #e2e8f0",
                      borderRadius: "10px",
                      fontSize: "15px",
                      outline: "none",
                      boxSizing: "border-box",
                      transition: "all 0.3s",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#10b981")}
                    onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#0f172a",
                    }}
                  >
                    Süre (dk)
                  </label>
                  <input
                    type="number"
                    placeholder="30"
                    value={yeniHizmet.sure}
                    onChange={(e) =>
                      setYeniHizmet({ ...yeniHizmet, sure: e.target.value })
                    }
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      border: "2px solid #e2e8f0",
                      borderRadius: "10px",
                      fontSize: "15px",
                      outline: "none",
                      boxSizing: "border-box",
                      transition: "all 0.3s",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#10b981")}
                    onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
                  />
                </div>
              </div>
              <div style={{ display: "flex", gap: "12px" }}>
                <button
                  onClick={handleEkle}
                  style={{
                    flex: 1,
                    background:
                      "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                    color: "white",
                    border: "none",
                    padding: "14px",
                    borderRadius: "10px",
                    fontSize: "15px",
                    fontWeight: "600",
                    cursor: "pointer",
                    boxShadow: "0 4px 15px rgba(16, 185, 129, 0.4)",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow =
                      "0 6px 20px rgba(16, 185, 129, 0.6)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow =
                      "0 4px 15px rgba(16, 185, 129, 0.4)";
                  }}
                >
                  ✅ Kaydet
                </button>
                <button
                  onClick={() => setModalAcik(false)}
                  style={{
                    flex: 1,
                    background: "#e2e8f0",
                    color: "#475569",
                    border: "none",
                    padding: "14px",
                    borderRadius: "10px",
                    fontSize: "15px",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.3s",
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

export default HizmetYonetimi;
