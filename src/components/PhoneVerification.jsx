import React, { useState } from "react";
import { auth } from "../firebase-config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

function PhoneVerification({ onVerificationSuccess }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(0);

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => {
            console.log("reCAPTCHA çözüldü");
          },
          "expired-callback": () => {
            console.log("reCAPTCHA süresi doldu");
          },
        }
      );
    }
  };

  const formatPhoneNumber = (phone) => {
    let formatted = phone.replace(/\s/g, "");
    if (formatted.startsWith("0")) {
      formatted = "+90" + formatted.substring(1);
    } else if (!formatted.startsWith("+")) {
      formatted = "+90" + formatted;
    }
    return formatted;
  };

  const sendVerificationCode = async () => {
    setError("");
    setLoading(true);

    try {
      setupRecaptcha();
      const formattedPhone = formatPhoneNumber(phoneNumber);

      const confirmation = await signInWithPhoneNumber(
        auth,
        formattedPhone,
        window.recaptchaVerifier
      );

      setConfirmationResult(confirmation);
      setIsCodeSent(true);
      setTimer(60);

      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      alert("✅ Doğrulama kodu gönderildi!");
    } catch (err) {
      console.error("Kod gönderme hatası:", err);
      setError("Kod gönderilemedi. Lütfen telefon numarasını kontrol edin.");
    } finally {
      setLoading(false);
    }
  };

  const verifyCode = async () => {
    setError("");
    setLoading(true);

    try {
      const result = await confirmationResult.confirm(verificationCode);
      const user = result.user;

      alert("✅ Telefon numarası doğrulandı!");
      onVerificationSuccess(user.uid, formatPhoneNumber(phoneNumber));
    } catch (err) {
      console.error("Kod doğrulama hatası:", err);
      setError("Geçersiz kod. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div id="recaptcha-container"></div>

      {!isCodeSent ? (
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
            📞 Telefon Numarası
          </label>

          <div style={{ display: "flex", gap: "10px" }}>
            <input
              type="tel"
              placeholder="5XX XXX XX XX"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              style={{
                flex: 1,
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

            <button
              onClick={sendVerificationCode}
              disabled={loading || phoneNumber.length < 10}
              type="button"
              style={{
                padding: "12px 20px",
                background:
                  loading || phoneNumber.length < 10
                    ? "#94a3b8"
                    : "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)",
                color: "white",
                border: "none",
                borderRadius: "10px",
                fontSize: "14px",
                fontWeight: "600",
                cursor:
                  loading || phoneNumber.length < 10
                    ? "not-allowed"
                    : "pointer",
                transition: "all 0.3s ease",
                whiteSpace: "nowrap",
              }}
            >
              {loading ? "Gönderiliyor..." : "Kod Gönder"}
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div
            style={{
              padding: "12px",
              background: "#dbeafe",
              color: "#1e40af",
              borderRadius: "10px",
              fontSize: "13px",
              marginBottom: "12px",
              textAlign: "center",
            }}
          >
            ✅ Kod {formatPhoneNumber(phoneNumber)} numarasına gönderildi
          </div>

          <label
            style={{
              display: "block",
              marginBottom: "8px",
              color: "#1e293b",
              fontSize: "14px",
              fontWeight: "600",
            }}
          >
            🔐 Doğrulama Kodu
          </label>

          <div style={{ display: "flex", gap: "10px" }}>
            <input
              type="text"
              placeholder="6 haneli kod"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              maxLength={6}
              style={{
                flex: 1,
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

            <button
              onClick={verifyCode}
              disabled={loading || verificationCode.length !== 6}
              type="button"
              style={{
                padding: "12px 20px",
                background:
                  loading || verificationCode.length !== 6
                    ? "#94a3b8"
                    : "linear-gradient(135deg, #059669 0%, #10b981 100%)",
                color: "white",
                border: "none",
                borderRadius: "10px",
                fontSize: "14px",
                fontWeight: "600",
                cursor:
                  loading || verificationCode.length !== 6
                    ? "not-allowed"
                    : "pointer",
                transition: "all 0.3s ease",
                whiteSpace: "nowrap",
              }}
            >
              {loading ? "Doğrulanıyor..." : "Doğrula"}
            </button>
          </div>

          {timer > 0 ? (
            <p
              style={{
                textAlign: "center",
                color: "#64748b",
                fontSize: "13px",
                marginTop: "10px",
                marginBottom: 0,
              }}
            >
              Yeniden gönder: {timer}s
            </p>
          ) : (
            <button
              onClick={() => {
                setIsCodeSent(false);
                setVerificationCode("");
              }}
              type="button"
              style={{
                width: "100%",
                marginTop: "10px",
                padding: "10px",
                background: "transparent",
                color: "#3b82f6",
                border: "1px solid #3b82f6",
                borderRadius: "10px",
                fontSize: "13px",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            >
              Kodu Yeniden Gönder
            </button>
          )}
        </div>
      )}

      {error && (
        <p
          style={{
            color: "#dc2626",
            fontSize: "13px",
            marginTop: "8px",
            marginBottom: 0,
          }}
        >
          ⚠️ {error}
        </p>
      )}
    </div>
  );
}

export default PhoneVerification;
