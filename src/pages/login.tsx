/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IonPage,
  IonContent,
  IonBackButton,
  IonButton,
  IonButtons,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonInput,
  IonText,
  IonInputPasswordToggle,
  IonImg,
  useIonToast,
  IonLoading,
  useIonRouter,
} from "@ionic/react";
import IlustrasiLogin from "../assets/images/ic_masuk_akun.svg";
import "../css/login.css";
import { useEffect, useRef, useState } from "react";
import { LoginResponse } from "../types/responses/login";
import api from "../lib/api";
import { useAuthStore } from "../store/auth-store";

const LoginPage: React.FC = () => {
  const usernameRef = useRef<HTMLIonInputElement>(null);
  const passwordRef = useRef<HTMLIonInputElement>(null);
  const router = useIonRouter();
  const { setToken, setUser, token } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const [presentToast] = useIonToast();

  const handleLogin = async () => {
    const username = usernameRef.current?.value as string;
    const password = passwordRef.current?.value as string;

    if (!username || !password) {
      presentToast({
        message: "Form login belum lengkap, silahkan isi username dan password",
        duration: 500,
        position: "top",
        color: "primary",
      });
      return;
    }

    const data = { username, password };

    try {
      setLoading(true);
      const response = await api.post<LoginResponse>("/mobile-v2/login", data);
      const result = response.data;

      if (result) {
        setToken(result.token);
        setUser(result.user);
        router.push("/home", "root", "replace");
      }
    } catch (error: any) {
      console.log(error);
      presentToast({
        message: error.response?.data?.message || "Login gagal",
        duration: 1000,
        position: "top",
        color: "primary",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      router.push("/home", "root", "replace");
    }
    const timer = setTimeout(() => {
      usernameRef.current?.setFocus();
    }, 100);

    return () => clearTimeout(timer);
  });

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle style={{ fontSize: "1rem" }}>Masuk Akun</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen scrollY={false}>
        <div className="login-container-wrapper">
          <div className="login-container ion-text-center">
            <IonImg
              src={IlustrasiLogin}
              style={{ width: "50%", maxWidth: "300px", margin: "20px auto" }}
              alt="Ilustrasi Masuk"
              className="login-illustration"
            />

            <IonText color="dark">
              <h2
                style={{
                  fontWeight: "bold",
                  fontSize: "20px",
                  marginTop: "20px",
                }}
              >
                Masuk ke Aplikasi
              </h2>
            </IonText>

            <IonText color="medium">
              <p style={{ marginTop: "8px", fontSize: "14px" }}>
                Masukan informasi pengguna Anda di bawah ini untuk melanjutkan
              </p>
            </IonText>

            <div
              className="input-container"
              style={{
                textAlign: "left",
                marginTop: "20px",
                marginBottom: "20px",
              }}
            >
              <IonInput
                placeholder="Masukan Username"
                type="text"
                fill="outline"
                label="Username"
                ref={usernameRef}
                required
                labelPlacement="floating"
                className="input-field"
              />
              <IonInput
                placeholder="Masukan Password"
                type="password"
                fill="outline"
                ref={passwordRef}
                required
                label="Password"
                labelPlacement="floating"
                className="input-field"
              >
                <IonInputPasswordToggle slot="end" />
              </IonInput>
            </div>

            <IonButton
              expand="block"
              shape="round"
              size="small"
              className="login-button"
              onClick={handleLogin}
            >
              Login
            </IonButton>
          </div>
        </div>
        <IonLoading isOpen={loading} message={"Sedang Login....."} />
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
