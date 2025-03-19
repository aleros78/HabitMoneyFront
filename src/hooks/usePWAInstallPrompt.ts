import { useEffect, useState } from "react";

export const usePWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [installable, setInstallable] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: any) => {
        setDeferredPrompt(null);
        setInstallable(false);
        console.log(
          `L'utente ha ${choiceResult.outcome === "accepted" ? "accettato" : "rifiutato"} l'installazione`,
        );
      });
    }
  };

  return { installable, handleInstallClick };
};
