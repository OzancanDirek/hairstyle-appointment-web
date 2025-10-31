import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig";

function RandevuFormu() {
  const [input, setInput] = useState({
    ad: "",
    soyad: "",
    calisan: "",
    tarih: "",
    saat: "",
    hizmet: "",
  });

  const [hizmetler, setHizmetler] = useState([]);
  const [calisanlar, setCalisanlar] = useState([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [firebaseUid, setFirebaseUid] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [hizmetResponse, calisanResponse] = await Promise.all([
          api.get("/hizmet/aktif"),
          api.get("/calisan/getCalisanList"),
        ]);

        setHizmetler(hizmetResponse.data);
        setCalisanlar(calisanResponse.data);

        console.log("Hizmetler:", hizmetResponse.data);
        console.log("Çalışanlar:", calisanResponse.data);
      } catch (error) {
        console.error("Veriler alınamadı:", error);
      } finally {
        setYukleniyor(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();


    const payload = {
      ad: input.ad,
      soyad: input.soyad,
      tarih: input.tarih,
      saat: input.saat,
      calisan: { id: input.calisan },
      hizmet: { id: input.hizmet },
      firebaseUid: firebaseUid,
    };

    try {
      const response = await api.post("/randevu/createRandevu", payload);
      console.log("Kayıt başarılı:", response.data);
      alert("✅ Randevu başarıyla oluşturuldu!");

      // Formu temizle
      setInput({
        ad: "",
        soyad: "",
        calisan: "",
        tarih: "",
        saat: "",
        hizmet: "",
      });
      setFirebaseUid("");
    } catch (error) {
      console.error(
        "Randevu oluşturulamadı:",
        error.response?.data || error.message
      );

      const hataMesaji =
        error.response?.data?.message ||
        "Bir hata oluştu. Lütfen tekrar deneyin.";

      alert("❌ " + hataMesaji);
    }
  };

  return (
    <div
      style={{
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
        background: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
      }}
    >
      <div style={{ maxWidth: "500px", width: "100%" }}>
        {/* Form Container */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.95)",
            borderRadius: "20px",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.2)",
            overflow: "hidden",
            backdropFilter: "blur(10px)",
          }}
        >
          {/* Header */}
          <div
            style={{
              background: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)",
              padding: "30px",
              textAlign: "center",
              color: "white",
            }}
          >
            <div style={{ fontSize: "48px", marginBottom: "12px" }}>📅</div>
            <h2 style={{ margin: "0", fontSize: "28px", fontWeight: "700" }}>
              Randevu Oluştur
            </h2>
            <p
              style={{ margin: "8px 0 0 0", fontSize: "14px", opacity: "0.9" }}
            >
              Randevu bilgilerinizi eksiksiz doldurun
            </p>
          </div>

          {/* Form Body */}
          <div style={{ padding: "40px 30px" }}>
            {yukleniyor ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
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
                  Yükleniyor...
                </p>
              </div>
            ) : (
              <div onSubmit={handleSubmit}>
                {/* Ad Soyad Grid */}
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
                        color: "#1e293b",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      Ad
                    </label>
                    <input
                      type="text"
                      name="ad"
                      value={input.ad}
                      onChange={handleChange}
                      required
                      placeholder="Örn: Ahmet"
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        border: "2px solid #e2e8f0",
                        borderRadius: "10px",
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
                      name="soyad"
                      value={input.soyad}
                      onChange={handleChange}
                      required
                      placeholder="Örn: Yılmaz"
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        border: "2px solid #e2e8f0",
                        borderRadius: "10px",
                        fontSize: "14px",
                        transition: "all 0.3s ease",
                        outline: "none",
                        boxSizing: "border-box",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
                      onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
                    />
                  </div>
                </div>
                
                {/* Tarih ve Saat Grid */}
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
                        color: "#1e293b",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      📅 Tarih
                    </label>
                    <input
                      type="date"
                      name="tarih"
                      value={input.tarih}
                      onChange={handleChange}
                      required
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        border: "2px solid #e2e8f0",
                        borderRadius: "10px",
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
                        marginBottom: "8px",
                        color: "#1e293b",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      🕐 Saat
                    </label>
                    <input
                      type="time"
                      name="saat"
                      value={input.saat}
                      onChange={handleChange}
                      min={"09:00"}
                      max={"20:00"}
                      required
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        border: "2px solid #e2e8f0",
                        borderRadius: "10px",
                        fontSize: "14px",
                        transition: "all 0.3s ease",
                        outline: "none",
                        boxSizing: "border-box",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
                      onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
                    />
                  </div>
                </div>

                {/* Hizmet */}
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
                    ✂️ Hizmet Seçimi
                  </label>
                  <select
                    name="hizmet"
                    value={input.hizmet}
                    onChange={handleChange}
                    required
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      border: "2px solid #e2e8f0",
                      borderRadius: "10px",
                      fontSize: "14px",
                      transition: "all 0.3s ease",
                      outline: "none",
                      boxSizing: "border-box",
                      backgroundColor: "white",
                      cursor: "pointer",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
                    onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
                  >
                    <option value="">Hizmet seçiniz</option>
                    {hizmetler.map((h) => (
                      <option key={h.id} value={h.id}>
                        {h.ad} — {h.fiyat}₺ ({h.sure} dk)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Çalışan */}
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
                    👨‍💼 Çalışan Seçimi
                  </label>
                  <select
                    name="calisan"
                    value={input.calisan}
                    onChange={handleChange}
                    required
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      border: "2px solid #e2e8f0",
                      borderRadius: "10px",
                      fontSize: "14px",
                      transition: "all 0.3s ease",
                      outline: "none",
                      boxSizing: "border-box",
                      backgroundColor: "white",
                      cursor: "pointer",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
                    onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
                  >
                    <option value="">Çalışan seçiniz</option>
                    {calisanlar.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.ad} {c.soyad}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  onClick={handleSubmit}
                  style={{
                    width: "100%",
                    background:
                      "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)",
                    color: "white",
                    border: "none",
                    borderRadius: "10px",
                    padding: "16px",
                    fontSize: "16px",
                    fontWeight: "600",
                    cursor: "pointer",
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
                  💾 Randevuyu Kaydet
                </button>
              </div>
            )}
          </div>

          {/* Footer Info */}
          <div
            style={{
              background: "#f8fafc",
              padding: "20px 30px",
              borderTop: "1px solid #e2e8f0",
              textAlign: "center",
            }}
          >
            <p style={{ margin: "0", fontSize: "13px", color: "#64748b" }}>
              ℹ️ Lütfen randevunuza zamanında geliniz. Herhangi bir sorunda
              iletişim numaranızdan size ulaşılacaktır.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RandevuFormu;
