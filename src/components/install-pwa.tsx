import React, { useEffect, useState } from "react";
import { IonAlert } from "@ionic/react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

const InstallPWA: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const isAppleDevice = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(isAppleDevice);

    const handleBeforeInstallPrompt = (event: Event) => {
      const beforeInstallEvent = event as BeforeInstallPromptEvent;
      beforeInstallEvent.preventDefault();
      setDeferredPrompt(beforeInstallEvent);
      setShowAlert(true);
    };

    if (!isAppleDevice) {
      window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    } else {
      setShowAlert(true);
    }

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User response: ${outcome}`);
      setDeferredPrompt(null);
      setShowAlert(false);
    }
  };

  const handleClose = () => {
    setShowAlert(false);
  };
  return (
    <>
      {!isIOS ? (
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={handleClose}
          header="Install SIMPEG"
          message="Untuk pengalaman lebih baik, install aplikasi ini ke layar utama perangkat Anda."
          buttons={[
            {
              text: "Batal",
              role: "cancel",
              handler: handleClose,
            },
            {
              text: "Install",
              handler: handleInstall,
            },
          ]}
        />
      ) : (
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={handleClose}
          header="Tambah aplikasi ke layar utama anda"
          message='Tekan tombol "Share" pada Safari, lalu pilih "Add to Home Screen" atau "Tambahkan ke Layar Utama".'
          buttons={[
            {
              text: "Tutup",
              role: "cancel",
              handler: handleClose,
            },
          ]}
        />
      )}
    </>
  );
};

export default InstallPWA;
