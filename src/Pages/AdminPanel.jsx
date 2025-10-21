import React from "react";
import { useNavigate } from "react-router-dom";

function AdminPanel() {
  const navigate = useNavigate();

  const menuItems = [
    {
      id: 1,
      title: "Randevu Yönetimi",
      icon: "📅",
      description: "Randevuları görüntüle ve düzenle",
      path: "/RandevuListesi",
      color: "#3b82f6",
    },
    {
      id: 2,
      title: "Randevu Oluştur",
      icon: "➕",
      description: "Yeni randevu oluştur",
      path: "/RandevuFormu",
      color: "#10b981",
    },
    {
      id: 3,
      title: "Çalışan Yönetimi",
      icon: "👥",
      description: "Çalışanları yönet",
      path: "/CalisanListesi",
      color: "#8b5cf6",
    },
    {
      id: 4,
      title: "Hizmet Yönetimi",
      icon: "✂️",
      description: "Hizmetleri düzenle",
      path: "/HizmetYonetimi",
      color: "#f59e0b",
    },
    {
      id: 5,
      title: "Raporlar",
      icon: "📊",
      description: "İstatistikler ve raporlar",
      path: "/GunlukKarDashboard",
      color: "#ec4899",
    },
    {
      id: 5,
      title: "Yorumlar",
      icon: "💬",
      description: "Yorumlar ve Yorum Yönetimi",
      path: "/YorumYapSayfasi",
      color: "#ec4899",
    },
  ];

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
        {/* Header */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.95)",
            borderRadius: "20px",
            padding: "40px",
            marginBottom: "40px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
            backdropFilter: "blur(10px)",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "64px", marginBottom: "16px" }}>🎛️</div>
          <h1
            style={{
              margin: "0 0 12px 0",
              fontSize: "36px",
              fontWeight: "700",
              color: "#1e3a8a",
              letterSpacing: "-0.5px",
            }}
          >
            Admin Paneli
          </h1>
          <p style={{ margin: "0", fontSize: "16px", color: "#64748b" }}>
            Tüm yönetim işlemlerinizi buradan gerçekleştirin
          </p>
        </div>

        {/* Menu Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "24px",
          }}
        >
          {menuItems.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate(item.path)}
              style={{
                background: "rgba(255, 255, 255, 0.95)",
                borderRadius: "16px",
                padding: "32px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                cursor: "pointer",
                transition: "all 0.3s ease",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow =
                  "0 12px 32px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)";
              }}
            >
              {/* Top border accent */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "4px",
                  background: item.color,
                }}
              ></div>

              {/* Icon */}
              <div
                style={{
                  width: "72px",
                  height: "72px",
                  borderRadius: "16px",
                  background: `${item.color}15`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "36px",
                  marginBottom: "20px",
                }}
              >
                {item.icon}
              </div>

              {/* Content */}
              <h3
                style={{
                  margin: "0 0 8px 0",
                  fontSize: "22px",
                  fontWeight: "600",
                  color: "#0f172a",
                }}
              >
                {item.title}
              </h3>
              <p
                style={{
                  margin: "0 0 20px 0",
                  fontSize: "14px",
                  color: "#64748b",
                  lineHeight: "1.6",
                }}
              >
                {item.description}
              </p>

              {/* Arrow */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  color: item.color,
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                <span>Git</span>
                <span style={{ fontSize: "18px" }}>→</span>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Stats */}
        <div
          style={{
            marginTop: "40px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
          }}
        >
          <div
            style={{
              background: "rgba(255, 255, 255, 0.95)",
              borderRadius: "12px",
              padding: "24px",
              textAlign: "center",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            }}
          >
            <div
              style={{
                fontSize: "32px",
                fontWeight: "700",
                color: "#3b82f6",
                marginBottom: "8px",
              }}
            >
              24
            </div>
            <div style={{ fontSize: "14px", color: "#64748b" }}>
              Bugünkü Randevular
            </div>
          </div>
          <div
            style={{
              background: "rgba(255, 255, 255, 0.95)",
              borderRadius: "12px",
              padding: "24px",
              textAlign: "center",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            }}
          >
            <div
              style={{
                fontSize: "32px",
                fontWeight: "700",
                color: "#10b981",
                marginBottom: "8px",
              }}
            >
              12
            </div>
            <div style={{ fontSize: "14px", color: "#64748b" }}>
              Aktif Çalışan
            </div>
          </div>
          <div
            style={{
              background: "rgba(255, 255, 255, 0.95)",
              borderRadius: "12px",
              padding: "24px",
              textAlign: "center",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            }}
          >
            <div
              style={{
                fontSize: "32px",
                fontWeight: "700",
                color: "#f59e0b",
                marginBottom: "8px",
              }}
            >
              8
            </div>
            <div style={{ fontSize: "14px", color: "#64748b" }}>
              Aktif Hizmet
            </div>
          </div>
          <div
            style={{
              background: "rgba(255, 255, 255, 0.95)",
              borderRadius: "12px",
              padding: "24px",
              textAlign: "center",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            }}
          >
            <div
              style={{
                fontSize: "32px",
                fontWeight: "700",
                color: "#ec4899",
                marginBottom: "8px",
              }}
            >
              156
            </div>
            <div style={{ fontSize: "14px", color: "#64748b" }}>
              Toplam Müşteri
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
