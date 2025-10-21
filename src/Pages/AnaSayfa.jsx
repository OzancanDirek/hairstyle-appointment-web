import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

function AnaSayfa() {
  const [hizmetler, setHizmetler] = useState([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/hizmet/aktif")
      .then((res) => {
        setHizmetler(res.data);
        setYukleniyor(false);
      })
      .catch((err) => {
        console.error("Hizmetler alınamadı:", err);
        setYukleniyor(false);
      });
  }, []);

  return (
    <div
      style={{
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
        backgroundColor: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      {/* HEADER */}
      <header
        style={{
          backgroundColor: "white",
          borderBottom: "1px solid #e2e8f0",
          padding: "20px 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "22px",
            }}
          >
            💈
          </div>
          <div>
            <h1
              style={{
                margin: "0",
                fontSize: "20px",
                fontWeight: "700",
                color: "#0f172a",
              }}
            >
              Ozan Berber
            </h1>
            <p style={{ margin: "0", fontSize: "13px", color: "#64748b" }}>
              Hairstyle Design
            </p>
          </div>
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          <button
            onClick={() => navigate("/RandevuFormu")}
            style={{
              background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
              color: "white",
              border: "none",
              borderRadius: "8px",
              padding: "10px 24px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.2s ease",
              boxShadow: "0 2px 8px rgba(59, 130, 246, 0.3)",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-1px)";
              e.target.style.boxShadow = "0 4px 12px rgba(59, 130, 246, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 2px 8px rgba(59, 130, 246, 0.3)";
            }}
          >
            📅 Randevu Al
          </button>
          <button
            onClick={() => navigate("/YorumlariGoruntule")}
            style={{
              background: "transparent",
              color: "#374151",
              border: "2px solid #e5e7eb",
              borderRadius: "8px",
              padding: "8px 20px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-1px)";
              e.target.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
              e.target.style.background = "#f3f4f6";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "none";
              e.target.style.background = "transparent";
            }}
          >
            ⭐ Yorumları Görüntüle
          </button>
        </div>
      </header>

      {/* HERO SECTION */}
      <section
        style={{
          marginTop: "84px",
          background: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)",
          padding: "80px 40px",
          textAlign: "center",
          color: "white",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          <h2
            style={{
              margin: "0 0 16px 0",
              fontSize: "42px",
              fontWeight: "700",
              lineHeight: "1.2",
            }}
          >
            Ozan Hairstyle Design'a Hoş Geldiniz
          </h2>
          <p
            style={{
              margin: "0 0 32px 0",
              fontSize: "18px",
              opacity: "0.95",
              lineHeight: "1.6",
            }}
          >
            Profesyonel ekibimiz ve kaliteli hizmetlerimizle size özel bakım
            deneyimi sunuyoruz
          </p>
          <div
            style={{
              display: "flex",
              gap: "32px",
              justifyContent: "center",
              marginTop: "32px",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "32px",
                  fontWeight: "700",
                  marginBottom: "4px",
                }}
              >
                500+
              </div>
              <div style={{ fontSize: "14px", opacity: "0.9" }}>
                Mutlu Müşteri
              </div>
            </div>
            <div
              style={{ width: "1px", background: "rgba(255,255,255,0.2)" }}
            ></div>
            <div>
              <div
                style={{
                  fontSize: "32px",
                  fontWeight: "700",
                  marginBottom: "4px",
                }}
              >
                15+
              </div>
              <div style={{ fontSize: "14px", opacity: "0.9" }}>
                Yıllık Deneyim
              </div>
            </div>
            <div
              style={{ width: "1px", background: "rgba(255,255,255,0.2)" }}
            ></div>
            <div>
              <div
                style={{
                  fontSize: "32px",
                  fontWeight: "700",
                  marginBottom: "4px",
                }}
              >
                10+
              </div>
              <div style={{ fontSize: "14px", opacity: "0.9" }}>
                Farklı Hizmet
              </div>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div
          style={{
            position: "absolute",
            top: "-50px",
            right: "-50px",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.1)",
            filter: "blur(60px)",
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            left: "-80px",
            width: "250px",
            height: "250px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.1)",
            filter: "blur(70px)",
          }}
        ></div>
      </section>

      {/* HİZMETLER SECTION */}
      <main
        style={{ padding: "60px 40px", maxWidth: "1400px", margin: "0 auto" }}
      >
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h3
            style={{
              margin: "0 0 12px 0",
              fontSize: "32px",
              fontWeight: "700",
              color: "#0f172a",
            }}
          >
            Hizmetlerimiz
          </h3>
          <p style={{ margin: "0", fontSize: "16px", color: "#64748b" }}>
            Size özel profesyonel bakım hizmetlerimizi keşfedin
          </p>
        </div>

        {yukleniyor ? (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
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
            <p style={{ marginTop: "16px", color: "#64748b" }}>
              Hizmetler yükleniyor...
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "24px",
            }}
          >
            {hizmetler.length > 0 ? (
              hizmetler.map((hizmet) => (
                <div
                  key={hizmet.id}
                  style={{
                    backgroundColor: "white",
                    borderRadius: "12px",
                    padding: "24px",
                    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.08)",
                    border: "1px solid #e2e8f0",
                    transition: "all 0.2s ease",
                    cursor: "pointer",
                    position: "relative",
                    overflow: "hidden",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 16px rgba(0, 0, 0, 0.1)";
                    e.currentTarget.style.borderColor = "#cbd5e0";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 1px 3px rgba(0, 0, 0, 0.08)";
                    e.currentTarget.style.borderColor = "#e2e8f0";
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "0",
                      left: "0",
                      right: "0",
                      height: "3px",
                      background:
                        "linear-gradient(90deg, #3b82f6 0%, #2563eb 100%)",
                    }}
                  ></div>

                  <div
                    style={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "12px",
                      background:
                        "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "28px",
                      marginBottom: "16px",
                    }}
                  >
                    ✂️
                  </div>

                  <h4
                    style={{
                      margin: "0 0 12px 0",
                      fontSize: "18px",
                      fontWeight: "600",
                      color: "#0f172a",
                    }}
                  >
                    {hizmet.ad}
                  </h4>

                  <div
                    style={{ display: "flex", gap: "16px", marginTop: "16px" }}
                  >
                    <div
                      style={{
                        flex: "1",
                        background: "#f8fafc",
                        padding: "10px",
                        borderRadius: "8px",
                        textAlign: "center",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "12px",
                          color: "#64748b",
                          marginBottom: "4px",
                        }}
                      >
                        Süre
                      </div>
                      <div
                        style={{
                          fontSize: "16px",
                          fontWeight: "600",
                          color: "#0f172a",
                        }}
                      >
                        {hizmet.sure} dk
                      </div>
                    </div>

                    <div
                      style={{
                        flex: "1",
                        background: "#eff6ff",
                        padding: "10px",
                        borderRadius: "8px",
                        textAlign: "center",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "12px",
                          color: "#1e40af",
                          marginBottom: "4px",
                        }}
                      >
                        Fiyat
                      </div>
                      <div
                        style={{
                          fontSize: "16px",
                          fontWeight: "700",
                          color: "#1e3a8a",
                        }}
                      >
                        {hizmet.fiyat}₺
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div
                style={{
                  gridColumn: "1 / -1",
                  textAlign: "center",
                  padding: "40px",
                  background: "white",
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                }}
              >
                <p style={{ color: "#64748b", fontSize: "16px" }}>
                  Henüz hizmet bulunmuyor
                </p>
              </div>
            )}
          </div>
        )}

        {/* CTA Section */}
        {hizmetler.length > 0 && (
          <div
            style={{
              marginTop: "60px",
              background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
              borderRadius: "16px",
              padding: "48px 32px",
              textAlign: "center",
              border: "1px solid #bfdbfe",
            }}
          >
            <h3
              style={{
                margin: "0 0 12px 0",
                fontSize: "24px",
                fontWeight: "700",
                color: "#0f172a",
              }}
            >
              Randevunuzu Hemen Alın
            </h3>
            <p
              style={{
                margin: "0 0 24px 0",
                fontSize: "15px",
                color: "#475569",
              }}
            >
              Uygun tarihi ve saati seçerek hızlıca randevu oluşturabilirsiniz
            </p>
            <button
              onClick={() => navigate("/RandevuFormu")}
              style={{
                background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                color: "white",
                border: "none",
                borderRadius: "10px",
                padding: "14px 32px",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.2s ease",
                boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 6px 16px rgba(59, 130, 246, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 12px rgba(59, 130, 246, 0.3)";
              }}
            >
              📅 Hemen Randevu Oluştur
            </button>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer
        style={{
          background: "#0f172a",
          color: "white",
          padding: "32px 40px",
          textAlign: "center",
          marginTop: "40px",
        }}
      >
        <p style={{ margin: "0", fontSize: "14px", opacity: "0.8" }}>
          © 2025 Ozan Berber - Tüm hakları saklıdır
        </p>
      </footer>
    </div>
  );
}

export default AnaSayfa;
