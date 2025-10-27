import React, { useState } from 'react';

const YorumYapSayfasi = ({ onSuccess }) => {
  const [ad, setAd] = useState('');
  const [soyad, setSoyad] = useState('');
  const [telefon, setTelefon] = useState('');
  const [yildiz, setYildiz] = useState(0);
  const [hoverYildiz, setHoverYildiz] = useState(0);
  const [yorumMetni, setYorumMetni] = useState('');
  const [yukleniyor, setYukleniyor] = useState(false);
  const [hata, setHata] = useState('');

  const yorumGonder = async (e) => {
    e.preventDefault();

    // Validasyon
    if (!ad || !soyad) {
      setHata('Lütfen ad ve soyadınızı giriniz!');
      return;
    }

    if (yildiz === 0) {
      setHata('Lütfen yıldız seçiniz!');
      return;
    }

    setYukleniyor(true);
    setHata('');

    try {
      const response = await fetch('https://hairstyle-appointment-backend-production.up.railway.app/api/yorum/ekle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ad: ad,
          soyad: soyad,
          telefon: telefon,
          yildiz: yildiz,
          yorumMetni: yorumMetni,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      alert('✅ Yorumunuz başarıyla gönderildi! Admin onayından sonra yayınlanacaktır.');
      
      // Formu temizle
      setAd('');
      setSoyad('');
      setTelefon('');
      setYildiz(0);
      setYorumMetni('');
      
      if (onSuccess) onSuccess();
      
    } catch (error) {
      setHata(error.message || 'Yorum gönderilemedi!');
    } finally {
      setYukleniyor(false);
    }
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.baslik}>💬 Değerlendirme Yapın</h3>
      
      <form onSubmit={yorumGonder}>
        {/* Ad Soyad ve Telefon */}
        <div style={styles.kisiBilgileri}>
          <div style={styles.inputContainer}>
            <label style={styles.label}>Adınız *</label>
            <input
              type="text"
              value={ad}
              onChange={(e) => setAd(e.target.value)}
              placeholder="Adınız"
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputContainer}>
            <label style={styles.label}>Soyadınız *</label>
            <input
              type="text"
              value={soyad}
              onChange={(e) => setSoyad(e.target.value)}
              placeholder="Soyadınız"
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputContainer}>
            <label style={styles.label}>Telefon (Opsiyonel)</label>
            <input
              type="tel"
              value={telefon}
              onChange={(e) => setTelefon(e.target.value)}
              placeholder="0555 123 45 67"
              style={styles.input}
            />
          </div>
        </div>

        {/* Yıldız Seçimi */}
        <div style={styles.yildizContainer}>
          <label style={styles.label}>Puanınız: *</label>
          <div style={styles.yildizlar}>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => setYildiz(star)}
                onMouseEnter={() => setHoverYildiz(star)}
                onMouseLeave={() => setHoverYildiz(0)}
                style={{
                  ...styles.yildiz,
                  color: (hoverYildiz || yildiz) >= star ? '#fbbf24' : '#d1d5db',
                  cursor: 'pointer',
                  transform: (hoverYildiz || yildiz) >= star ? 'scale(1.2)' : 'scale(1)',
                  filter: (hoverYildiz || yildiz) >= star ? 'drop-shadow(0 0 8px #fbbf24)' : 'none',
                }}
              >
                ⭐
              </span>
            ))}
            <span style={styles.yildizText}>
              {yildiz > 0 ? `${yildiz}/5` : 'Seçiniz'}
            </span>
          </div>
        </div>

        {/* Yorum Metni */}
        <div style={styles.yorumContainer}>
          <label style={styles.label}>Yorumunuz: (Opsiyonel)</label>
          <textarea
            value={yorumMetni}
            onChange={(e) => setYorumMetni(e.target.value)}
            placeholder="Deneyiminizi bizimle paylaşın..."
            rows="4"
            style={styles.textarea}
            maxLength="500"
          />
          <span style={styles.karakterSayaci}>
            {yorumMetni.length}/500
          </span>
        </div>

        {/* Hata Mesajı */}
        {hata && (
          <div style={styles.hata}>
            ⚠️ {hata}
          </div>
        )}

        {/* Gönder Butonu */}
        <button
          type="submit"
          disabled={yukleniyor}
          style={{
            ...styles.buton,
            opacity: yukleniyor ? 0.6 : 1,
            cursor: yukleniyor ? 'not-allowed' : 'pointer',
          }}
        >
          {yukleniyor ? 'Gönderiliyor...' : '📤 Yorumu Gönder'}
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    background: 'white',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    maxWidth: '600px',
    margin: '20px auto',
  },
  baslik: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#1e293b',
  },
  kisiBilgileri: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '16px',
    marginBottom: '20px',
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '8px',
  },
  input: {
    width: '100%',
    padding: '10px 12px',
    border: '2px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box',
  },
  yildizContainer: {
    marginBottom: '20px',
  },
  yildizlar: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  yildiz: {
    fontSize: '36px',
    transition: 'all 0.2s',
    userSelect: 'none',
  },
  yildizText: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#6b7280',
    marginLeft: '12px',
  },
  yorumContainer: {
    marginBottom: '20px',
  },
  textarea: {
    width: '100%',
    padding: '12px',
    border: '2px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '14px',
    fontFamily: 'inherit',
    resize: 'vertical',
    outline: 'none',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box',
  },
  karakterSayaci: {
    fontSize: '12px',
    color: '#9ca3af',
    display: 'block',
    textAlign: 'right',
    marginTop: '4px',
  },
  hata: {
    background: '#fee2e2',
    color: '#dc2626',
    padding: '12px',
    borderRadius: '8px',
    marginBottom: '16px',
    fontSize: '14px',
  },
  buton: {
    width: '100%',
    padding: '14px',
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    transition: 'all 0.3s',
  },
};

export default YorumYapSayfasi;