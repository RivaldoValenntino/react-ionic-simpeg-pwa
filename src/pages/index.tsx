import React, { useEffect } from "react";
import {
  IonPage,
  IonContent,
  IonButton,
  IonText,
  IonImg,
  useIonRouter,
} from "@ionic/react";
import IcLogo from "../assets/images/logo.svg";
import IcSplash from "../assets/images/ic_splash_screen.svg";
import "../css/index.css";
import { useAuthStore } from "../store/auth-store";
export const IndexPage = () => {
  const { token } = useAuthStore();
  const router = useIonRouter();
  useEffect(() => {
    if (token) {
      router.push("/home", "root", "replace");
    }
  }, [token, router]);
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="container ion-text-center">
          <IonImg
            src={IcLogo}
            style={{ width: "80px", margin: "40px auto 20px" }}
            alt="User Icon"
          />

          <IonText color="dark">
            <h2 style={{ fontWeight: "bold", fontSize: "20px" }}>
              Selamat Datang di aplikasi Kepegawaian Absensi
            </h2>
          </IonText>

          <IonImg
            src={IcSplash}
            style={{ width: "80%", maxWidth: "300px", margin: "20px auto" }}
            alt="Ilustrasi Kalender"
          />

          <IonText color="medium">
            <p>Silahkan masuk untuk menggunakan aplikasi absen.</p>
          </IonText>

          <IonButton
            color="primary"
            className="custom-login-btn ion-margin-top"
            shape="round"
            routerLink="/login"
          >
            Masuk
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};
