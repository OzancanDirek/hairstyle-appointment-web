import React, { useEffect, useState } from "react";

function RandevuListesi() {
  const [randevular, setRandevular] = useState([]);
  const [yukleniyor, setYukleniyor] = useState(false);
  const [hata, setHata] = useState("");
  const [modalAcik, setModalAcik] = useState(false);
  const [seciliRandevu, setSeciliRandevu] = useState(null);

  useEffect(() => {
    fetchRandevular();
  }, []);

  const fetchRandevular = async () => {
    setYukleniyor(true);
    try {
      const res = await fetch("http://localhost:8080/api/randevu/aktif");
      if (!res.ok) throw new Error("Randevu listesi alınamadı");
      const data = await res.json();
      setRandevular(data);
    } catch (err) {
      setHata(err.message);
    } finally {
      setYukleniyor(false);
    }
  };

  const handleDuzenle = (randevu) => {
    setSeciliRandevu({
      id: randevu.id,
      ad: randevu.ad,
      soyad: randevu.soyad,
      tarih: randevu.tarih,
      saat: randevu.saat,
    });
    setModalAcik(true);
  };

  const handleGuncelle = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/randevu/update/${seciliRandevu.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(seciliRandevu),
        }
      );
      if (!res.ok) throw new Error("Güncelleme başarısız!");
      alert("✅ Randevu güncellendi!");
      setModalAcik(false);
      fetchRandevular();
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
          <h2
            style={{
              margin: "0 0 8px 0",
              fontSize: "32px",
              fontWeight: "700",
              color: "#1e3a8a",
              textAlign: "center",
              letterSpacing: "-0.5px",
            }}
          >
            📅 Randevu Yönetimi
          </h2>
          <p
            style={{
              margin: "0",
              fontSize: "14px",
              color: "#64748b",
              textAlign: "center",
            }}
          >
            Randevuları görüntüleyin ve düzenleyin
          </p>
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
              background: "#fef2f2",
              color: "#991b1b",
              padding: "16px 20px",
              borderRadius: "12px",
              marginBottom: "20px",
              border: "1px solid #fca5a5",
            }}
          >
            ⚠️ {hata}
          </div>
        )}

        {!yukleniyor && !hata && randevular.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
              gap: "20px",
            }}
          >
            {randevular.map((randevu) => (
              <div
                key={randevu.id}
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
                    padding: "20px 24px",
                    borderBottom: "1px solid #f1f5f9",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <div
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "10px",
                        background:
                          "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "20px",
                      }}
                    >
                      👤
                    </div>
                    <div>
                      <h3
                        style={{
                          margin: "0",
                          fontSize: "17px",
                          fontWeight: "600",
                          color: "#0f172a",
                        }}
                      >
                        {randevu.ad} {randevu.soyad}
                      </h3>
                      <p
                        style={{
                          margin: "4px 0 0 0",
                          fontSize: "13px",
                          color: "#64748b",
                        }}
                      >
                        Müşteri
                      </p>
                    </div>
                  </div>
                  <div
                    style={{
                      background: "#d1fae5",
                      color: "#065f46",
                      padding: "5px 12px",
                      borderRadius: "6px",
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                  >
                    Aktif
                  </div>
                </div>

                <div style={{ padding: "20px 24px" }}>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "12px",
                      marginBottom: "16px",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: "12px",
                          color: "#64748b",
                          marginBottom: "6px",
                          fontWeight: "500",
                        }}
                      >
                        Tarih
                      </div>
                      <div
                        style={{
                          fontSize: "15px",
                          fontWeight: "600",
                          color: "#0f172a",
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        <span>📅</span>
                        {randevu.tarih}
                      </div>
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: "12px",
                          color: "#64748b",
                          marginBottom: "6px",
                          fontWeight: "500",
                        }}
                      >
                        Saat
                      </div>
                      <div
                        style={{
                          fontSize: "15px",
                          fontWeight: "600",
                          color: "#0f172a",
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        <span>🕐</span>
                        {randevu.saat}
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      padding: "12px",
                      borderRadius: "8px",
                      marginBottom: "12px",
                      background: "#f8fafc",
                      border: "1px solid #e2e8f0",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#64748b",
                        marginBottom: "6px",
                        fontWeight: "500",
                      }}
                    >
                      Çalışan
                    </div>
                    <div
                      style={{
                        fontSize: "15px",
                        fontWeight: "600",
                        color: "#0f172a",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <span>👨‍💼</span>
                      {randevu.calisanAd} {randevu.calisanSoyad}
                    </div>
                  </div>

                  <div
                    style={{
                      padding: "12px",
                      borderRadius: "8px",
                      background: "#eff6ff",
                      border: "1px solid #bfdbfe",
                      marginBottom: "16px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#1e40af",
                        marginBottom: "6px",
                        fontWeight: "500",
                      }}
                    >
                      Hizmet
                    </div>
                    <div
                      style={{
                        fontSize: "15px",
                        fontWeight: "600",
                        color: "#1e3a8a",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <span>✂️</span>
                      {randevu.hizmetAd}
                    </div>
                  </div>

                  <button
                    onClick={() => handleDuzenle(randevu)}
                    style={{
                      width: "100%",
                      background:
                        "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                      color: "white",
                      border: "none",
                      padding: "10px",
                      borderRadius: "8px",
                      fontSize: "14px",
                      fontWeight: "600",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => (e.target.style.opacity = "0.9")}
                    onMouseLeave={(e) => (e.target.style.opacity = "1")}
                  >
                    ✏️ Düzenle
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {!yukleniyor && !hata && randevular.length === 0 && (
          <div
            style={{
              background: "rgba(255, 255, 255, 0.95)",
              borderRadius: "16px",
              padding: "60px 40px",
              textAlign: "center",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            }}
          >
            <div style={{ fontSize: "64px", marginBottom: "16px" }}>📭</div>
            <h3
              style={{
                color: "#0f172a",
                marginBottom: "8px",
                fontSize: "18px",
                fontWeight: "600",
              }}
            >
              Henüz randevu bulunmuyor
            </h3>
            <p style={{ color: "#64748b", fontSize: "14px", margin: "0" }}>
              Yeni randevular burada görünecektir
            </p>
          </div>
        )}
      </div>

      {modalAcik && seciliRandevu && (
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
                background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                padding: "24px 30px",
                color: "white",
              }}
            >
              <h3 style={{ margin: "0", fontSize: "22px", fontWeight: "600" }}>
                ✏️ Randevu Güncelle
              </h3>
              <p
                style={{
                  margin: "8px 0 0 0",
                  fontSize: "13px",
                  opacity: "0.9",
                }}
              >
                Bilgileri düzenleyin
              </p>
            </div>
            <div style={{ padding: "30px" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "15px",
                  marginBottom: "20px",
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
                    Ad
                  </label>
                  <input
                    type="text"
                    value={seciliRandevu.ad}
                    onChange={(e) =>
                      setSeciliRandevu({ ...seciliRandevu, ad: e.target.value })
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
                    onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
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
                    Soyad
                  </label>
                  <input
                    type="text"
                    value={seciliRandevu.soyad}
                    onChange={(e) =>
                      setSeciliRandevu({
                        ...seciliRandevu,
                        soyad: e.target.value,
                      })
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
                    onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
                    onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
                  />
                </div>
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
                    Tarih
                  </label>
                  <input
                    type="date"
                    value={seciliRandevu.tarih}
                    onChange={(e) =>
                      setSeciliRandevu({
                        ...seciliRandevu,
                        tarih: e.target.value,
                      })
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
                    onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
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
                    Saat
                  </label>
                  <input
                    type="time"
                    value={seciliRandevu.saat}
                    onChange={(e) =>
                      setSeciliRandevu({
                        ...seciliRandevu,
                        saat: e.target.value,
                      })
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
                    onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
                    onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
                  />
                </div>
              </div>
              <div style={{ display: "flex", gap: "12px" }}>
                <button
                  onClick={handleGuncelle}
                  style={{
                    flex: 1,
                    background:
                      "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                    color: "white",
                    border: "none",
                    padding: "14px",
                    borderRadius: "10px",
                    fontSize: "15px",
                    fontWeight: "600",
                    cursor: "pointer",
                    boxShadow: "0 4px 15px rgba(59, 130, 246, 0.4)",
                    transition: "all 0.3s",
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

export default RandevuListesi;
