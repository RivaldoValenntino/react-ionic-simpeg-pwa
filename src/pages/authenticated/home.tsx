import { IonButton, IonContent, IonImg, IonPage, IonText } from "@ionic/react";
import IcSplash from "../../assets/images/ic_splash_screen.svg";
import { useAuthStore } from "../../store/auth-store";
export const HomePage = () => {
  const { logout } = useAuthStore();
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="container">
          <IonImg src={IcSplash} alt="User Avatar" />
          <IonText>Dashboard Page</IonText>
          <IonButton onClick={() => logout()}>Logout</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};
