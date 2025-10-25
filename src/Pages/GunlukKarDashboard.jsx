import React, { useState, useEffect, useCallback } from "react";

// ✅ stil objesini ekle
const stil = {
  sayfa: {
    minHeight: "100vh",
    background: "linear-gradient(to bottom right, #eff6ff, #e0e7ff)",
    padding: "2rem",
  },
  kart: {
    background: "white",
    borderRadius: "12px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    padding: "1.5rem",
    marginBottom: "1.5rem",
  },
  buton: {
    padding: "8px 24px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontWeight: "500",
    transition: "all 0.2s",
  },
  input: {
    width: "100%",
    padding: "8px 12px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "14px",
  },
};

const GunlukKarDashboard = () => {
  const [veriler, setVeriler] = useState([]);
  const [yukleniyor, setYukleniyor] = useState(false);
  const [seciliGun, setSeciliGun] = useState("30");

  // Demo veri oluştur
  const demoVeriOlustur = (kacGun) => {
    const liste = [];
    const bugun = new Date();

    for (let i = kacGun - 1; i >= 0; i--) {
      const tarih = new Date(bugun);
      tarih.setDate(tarih.getDate() - i);

      liste.push({
        tarih: tarih.toLocaleDateString("tr-TR", {
          day: "2-digit",
          month: "short",
        }),
        kar: Math.floor(Math.random() * 5000) + 1000,
      });
    }

    return liste;
  };

  // useCallback ile fonksiyonu wrap et
  const verileriGetir = useCallback(async () => {
    setYukleniyor(true);
    try {
      console.log(`API çağrısı: sonKacGun=${seciliGun}`); // ✅ Debug ekle
      const cevap = await fetch(
        `http://localhost:8080/api/istatistik/gunluk-kar?sonKacGun=${seciliGun}`
      );
      const veri = await cevap.json();
      console.log("API yanıtı:", veri); // ✅ Debug ekle

      const duzenlenmis = veri.map((item) => ({
        tarih: new Date(item.tarih).toLocaleDateString("tr-TR", {
          day: "2-digit",
          month: "short",
        }),
        kar: item.toplamKar,
      }));

      setVeriler(duzenlenmis);
    } catch (hata) {
      console.log("API çalışmıyor, demo veri gösteriliyor");
      setVeriler(demoVeriOlustur(parseInt(seciliGun)));
    }
    setYukleniyor(false);
  }, [seciliGun]); // seciliGun dependency olarak ekle

  // Sayfa yüklendiğinde ve gün değiştiğinde verileri getir
  useEffect(() => {
    verileriGetir();
  }, [verileriGetir]);

  // Toplam ve ortalama hesapla
  const toplamKar = veriler.reduce(
    (toplam, item) => toplam + Number(item.kar),
    0
  );
  const ortalamaKar = veriler.length > 0 ? toplamKar / veriler.length : 0;

  return (
    <div style={stil.sayfa}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Başlık */}
        <h1
          style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "8px" }}
        >
          💰 Kar İstatistikleri
        </h1>
        <p style={{ color: "#666", marginBottom: "32px" }}>
          Günlük gelir analizinizi görüntüleyin
        </p>

        {/* İstatistik Kartları */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          {/* Toplam Kar Kartı */}
          <div style={{ ...stil.kart, borderLeft: "4px solid #10b981" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "8px",
              }}
            >
              <span style={{ color: "#666", fontSize: "14px" }}>
                Toplam Kar
              </span>
              <span style={{ fontSize: "24px" }}>💵</span>
            </div>
            <div style={{ fontSize: "28px", fontWeight: "bold" }}>
              ₺{toplamKar.toLocaleString("tr-TR", { minimumFractionDigits: 2 })}
            </div>
          </div>

          {/* Ortalama Kar Kartı */}
          <div style={{ ...stil.kart, borderLeft: "4px solid #3b82f6" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "8px",
              }}
            >
              <span style={{ color: "#666", fontSize: "14px" }}>
                Ortalama Günlük Kar
              </span>
              <span style={{ fontSize: "24px" }}>📈</span>
            </div>
            <div style={{ fontSize: "28px", fontWeight: "bold" }}>
              ₺
              {ortalamaKar.toLocaleString("tr-TR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
          </div>

          {/* Gün Sayısı Kartı */}
          <div style={{ ...stil.kart, borderLeft: "4px solid #8b5cf6" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "8px",
              }}
            >
              <span style={{ color: "#666", fontSize: "14px" }}>
                Toplam Gün
              </span>
              <span style={{ fontSize: "24px" }}>📅</span>
            </div>
            <div style={{ fontSize: "28px", fontWeight: "bold" }}>
              {veriler.length}
            </div>
          </div>
        </div>

        {/* Dönem Seçimi */}
        <div style={stil.kart}>
          <label
            style={{
              display: "block",
              fontSize: "14px",
              fontWeight: "500",
              marginBottom: "8px",
            }}
          >
            Dönem Seçin
          </label>
          <div style={{ display: "flex", gap: "8px" }}>
            {["7", "30", "90"].map((gun) => (
              <button
                key={gun}
                onClick={() => {
                  console.log(`Butona tıklandı: ${gun} gün`); // ✅ Debug ekle
                  setSeciliGun(gun);
                }}
                style={{
                  ...stil.buton,
                  background: seciliGun === gun ? "#2563eb" : "#f3f4f6",
                  color: seciliGun === gun ? "white" : "#374151",
                }}
              >
                Son {gun} Gün
              </button>
            ))}
          </div>
        </div>

        {/* Grafik */}
        <div style={stil.kart}>
          <h2
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              marginBottom: "16px",
            }}
          >
            📊 Günlük Kar Grafiği
          </h2>

          {yukleniyor ? (
            <div style={{ textAlign: "center", padding: "80px 0" }}>
              Yükleniyor...
            </div>
          ) : (
            <Grafik veriler={veriler} />
          )}
        </div>

        {/* Tablo */}
        <div style={stil.kart}>
          <h2
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              marginBottom: "16px",
            }}
          >
            📋 Detaylı Veri
          </h2>
          <Tablo veriler={veriler} toplam={toplamKar} />
        </div>
      </div>
    </div>
  );
};

// Basit çubuk grafik komponenti
const Grafik = ({ veriler }) => {
  const [secili, setSecili] = useState(null);

  if (!veriler || veriler.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "40px", color: "#999" }}>
        Veri yok
      </div>
    );
  }

  const enBuyukKar = Math.max(...veriler.map((v) => v.kar));

  return (
    <div>
      {/* Çubuklar */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          height: "350px",
          gap: "4px",
          borderBottom: "2px solid #ddd",
          padding: "20px 16px 0 16px",
          position: "relative",
        }}
      >
        {veriler.map((item, index) => {
          const yuzde = (item.kar / enBuyukKar) * 100;

          return (
            <div
              key={index}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                alignItems: "center",
                height: "100%",
                position: "relative",
              }}
              onMouseEnter={() => setSecili(index)}
              onMouseLeave={() => setSecili(null)}
            >
              {/* Tooltip */}
              {secili === index && (
                <div
                  style={{
                    position: "absolute",
                    top: "-30px",
                    background: "#333",
                    color: "white",
                    padding: "6px 10px",
                    borderRadius: "6px",
                    fontSize: "13px",
                    whiteSpace: "nowrap",
                    zIndex: 10,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                  }}
                >
                  ₺{item.kar.toLocaleString("tr-TR")}
                </div>
              )}

              {/* Çubuk */}
              <div
                style={{
                  width: "100%",
                  height: `${yuzde}%`,
                  minHeight: "30px",
                  background:
                    secili === index
                      ? "linear-gradient(to top, #1d4ed8, #3b82f6)"
                      : "linear-gradient(to top, #2563eb, #60a5fa)",
                  borderRadius: "6px 6px 0 0",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  boxShadow:
                    secili === index
                      ? "0 4px 12px rgba(37, 99, 235, 0.4)"
                      : "none",
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Tarihler */}
      <div style={{ display: "flex", gap: "4px", padding: "12px 16px 0" }}>
        {veriler.map((item, index) => (
          <div key={index} style={{ flex: 1, textAlign: "center" }}>
            <span
              style={{ fontSize: "12px", color: "#666", fontWeight: "500" }}
            >
              {item.tarih}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Basit tablo komponenti
const Tablo = ({ veriler, toplam }) => {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr style={{ borderBottom: "2px solid #ddd" }}>
          <th style={{ padding: "12px", textAlign: "left" }}>Tarih</th>
          <th style={{ padding: "12px", textAlign: "right" }}>Günlük Kar</th>
          <th style={{ padding: "12px", textAlign: "center" }}>Durum</th>
        </tr>
      </thead>
      <tbody>
        {veriler.map((item, index) => {
          const oncekiKar = index > 0 ? veriler[index - 1].kar : item.kar;

          const trend =
            item.kar > oncekiKar ? (
              <span style={{ color: "#10b981", fontSize: "20px" }}>▲</span>
            ) : item.kar < oncekiKar ? (
              <span style={{ color: "#ef4444", fontSize: "20px" }}>▼</span>
            ) : (
              <span style={{ color: "#e78b0bff", fontSize: "20px" }}>▶</span>
            );
          return (
            <tr key={index} style={{ borderBottom: "1px solid #f0f0f0" }}>
              <td style={{ padding: "12px" }}>{item.tarih}</td>
              <td
                style={{
                  padding: "12px",
                  textAlign: "right",
                  fontWeight: "bold",
                  color: "#10b981",
                }}
              >
                ₺
                {item.kar.toLocaleString("tr-TR", { minimumFractionDigits: 2 })}
              </td>
              <td
                style={{
                  padding: "12px",
                  textAlign: "center",
                  fontSize: "20px",
                }}
              >
                {trend}
              </td>
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        <tr style={{ background: "#f9f9f9", fontWeight: "bold" }}>
          <td style={{ padding: "12px" }}>TOPLAM</td>
          <td style={{ padding: "12px", textAlign: "right", color: "#10b981" }}>
            ₺{toplam.toLocaleString("tr-TR", { minimumFractionDigits: 2 })}
          </td>
          <td></td>
        </tr>
      </tfoot>
    </table>
  );
};

export default GunlukKarDashboard;
