import React, { useEffect, useState } from "react";

function YorumlariGoruntule() {
  const [yorumlar, setYorumlar] = useState([]);
  const [yukleniyor, setYukleniyor] = useState(false);
  const [hata, setHata] = useState("");

  useEffect(() => {
    const yorumlariGetir = async () => {
      setYukleniyor(true);
      try {
        const response = await fetch("http://localhost:8080/api/yorum/tumu");
        if (!response.ok) {
          throw new Error("Yorumlar alınırken bir hata oluştu.");
        }
        const data = await response.json();
        setYorumlar(data);
      } catch (error) {
        setHata(error.message);
      } finally {
        setYukleniyor(false);
      }
    };
    yorumlariGetir();
  }, []);

  const renderYildizlar = (puan) => {
    return (
      <div style={styles.yildizlar}>
        {[1, 2, 3, 4, 5].map((yildiz) => (
          <span
            key={yildiz}
            style={{
              color: yildiz <= puan ? "#fbbf24" : "#d1d5db",
              fontSize: "20px",
            }}
          >
            ⭐
          </span>
        ))}
      </div>
    );
  };

  // Tarih formatla
  const formatTarih = (tarih) => {
    return new Date(tarih).toLocaleDateString("tr-TR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  if (yukleniyor) {
    return (
      <div style={styles.container}>
        <div style={styles.yukleniyor}>Yorumlar yükleniyor...</div>
      </div>
    );
  }

  if (hata) {
    return (
      <div style={styles.container}>
        <div style={styles.hata}>⚠️ {hata}</div>
      </div>
    );
  }

  // Ortalama puan hesapla
  const ortalamaPuan =
    yorumlar.length > 0
      ? (
          yorumlar.reduce((toplam, yorum) => toplam + yorum.yildiz, 0) /
          yorumlar.length
        ).toFixed(1)
      : 0;

  // Sadece onaylı yorumları filtrele
const onayliYorumlar = yorumlar;

  return (
    <div style={styles.container}>
      {/* Başlık */}
      <div style={styles.baslikContainer}>
        <h1 style={styles.baslik}>💬 Müşteri Yorumları</h1>
        <p style={styles.aciklama}>
          Müşterilerimizin deneyimlerini paylaşımları
        </p>
        <button
        onClick={() => window.location.href = '/YorumYapSayfasi'}>
          <style>
            {`
            button {
              background-color: #3b82f6;
              color: white;
              padding: 10px 20px;
              border: none;
              border-radius: 8px;
              cursor: pointer;
              font-size: 16px;
              margin-top: 16px;
              transition: background-color 0.3s;
            }
            button:hover {
              background-color: #2563eb;
            }
          `}
          </style>
          Yorum Ekle</button>
      </div>

      {/* İstatistikler */}
      <div style={styles.istatistikKutu}>
        <div style={styles.istatistik}>
          <div style={styles.istatistikDeger}>{onayliYorumlar.length}</div>
          <div style={styles.istatistikLabel}>Toplam Yorum</div>
        </div>
        <div style={styles.istatistik}>
          <div style={styles.istatistikDeger}>{ortalamaPuan}</div>
          <div style={styles.istatistikLabel}>Ortalama Puan</div>
        </div>
        <div style={styles.istatistik}>
          <div style={styles.yildizlarBuyuk}>
            {renderYildizlar(Math.round(ortalamaPuan))}
          </div>
        </div>
      </div>

      {/* Yorumlar */}
      {onayliYorumlar.length === 0 ? (
        <div style={styles.bosKutu}>
          <p style={styles.bosText}>Henüz onaylanmış yorum bulunmuyor.</p>
        </div>
      ) : (
        <div style={styles.yorumlarContainer}>
          {onayliYorumlar.map((yorum) => (
            <div key={yorum.id} style={styles.yorumKarti}>
              {/* Üst Kısım */}
              <div style={styles.yorumUst}>
                <div style={styles.avatarContainer}>
                  <div style={styles.avatar}>
                    {yorum.ad?.charAt(0)}
                    {yorum.soyad?.charAt(0)}
                  </div>
                  <div>
                    <div style={styles.isim}>
                      {yorum.ad} {yorum.soyad}
                    </div>
                    <div style={styles.tarih}>
                      {formatTarih(yorum.olusturmaTarihi)}
                    </div>
                  </div>
                </div>
                {renderYildizlar(yorum.yildiz)}
              </div>

              {/* Yorum Metni */}
              {yorum.yorumMetni && (
                <p style={styles.yorumMetni}>{yorum.yorumMetni}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "1000px",
    margin: "40px auto",
    padding: "20px",
  },
  baslikContainer: {
    textAlign: "center",
    marginBottom: "32px",
  },
  baslik: {
    fontSize: "36px",
    fontWeight: "bold",
    marginBottom: "8px",
    color: "#1e293b",
  },
  aciklama: {
    fontSize: "16px",
    color: "#6b7280",
  },
  yukleniyor: {
    textAlign: "center",
    padding: "60px 20px",
    fontSize: "18px",
    color: "#6b7280",
  },
  hata: {
    background: "#fee2e2",
    color: "#dc2626",
    padding: "20px",
    borderRadius: "12px",
    textAlign: "center",
    fontSize: "16px",
  },
  istatistikKutu: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
    marginBottom: "40px",
  },
  istatistik: {
    background: "white",
    padding: "24px",
    borderRadius: "12px",
    textAlign: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  istatistikDeger: {
    fontSize: "36px",
    fontWeight: "bold",
    color: "#10b981",
    marginBottom: "8px",
  },
  istatistikLabel: {
    fontSize: "14px",
    color: "#6b7280",
    fontWeight: "500",
  },
  yildizlarBuyuk: {
    display: "flex",
    justifyContent: "center",
    gap: "4px",
  },
  bosKutu: {
    background: "white",
    borderRadius: "12px",
    padding: "60px 20px",
    textAlign: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  bosText: {
    fontSize: "16px",
    color: "#6b7280",
  },
  yorumlarContainer: {
    display: "grid",
    gap: "20px",
  },
  yorumKarti: {
    background: "white",
    borderRadius: "12px",
    padding: "24px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    transition: "transform 0.2s, box-shadow 0.2s",
    cursor: "pointer",
  },
  yorumUst: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
  },
  avatarContainer: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  avatar: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
    fontWeight: "bold",
  },
  isim: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#1e293b",
  },
  tarih: {
    fontSize: "13px",
    color: "#9ca3af",
    marginTop: "2px",
  },
  yildizlar: {
    display: "flex",
    gap: "2px",
  },
  yorumMetni: {
    fontSize: "15px",
    lineHeight: "1.6",
    color: "#374151",
    margin: 0,
  },
};

export default YorumlariGoruntule;
