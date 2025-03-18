import React, { useEffect, useState } from "react";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, getFirebaseToken } from "./firebase";

const App: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [installable, setInstallable] = useState(false);

  useEffect(() => {
    // Controlla lo stato di autenticazione dell'utente
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    const usertoken = getFirebaseToken().then(token => {
      console.log("Ecco il token:", token);
    })
    .catch(error => {
      console.error("Errore del token:", error);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Cattura l'evento "beforeinstallprompt" per mostrare il pulsante di installazione
    const handler = (e: any) => {
      e.preventDefault();
      console.log("Install prompt catturato");
      setDeferredPrompt(e);
      setInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === "accepted") {
          console.log("L'utente ha accettato l'installazione");
        } else {
          console.log("L'utente ha rifiutato l'installazione");
        }
        setDeferredPrompt(null);
        setInstallable(false);
      });
    }
  };

  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Errore durante l'autenticazione:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Errore durante il logout:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to Habit Tracker</h1>

      {/* Bottone di autenticazione */}
      {user ? (
        <div>
          <p>Ciao, {user.displayName}!</p>
          <button onClick={handleSignOut}>Esci</button>
        </div>
      ) : (
        <button onClick={handleSignIn}>Accedi con Google</button>
      )}

      {/* Bottone di installazione della PWA */}
      {installable && (
        <div style={{ marginTop: "20px" }}>
          <button onClick={handleInstallClick}>Installa l'App</button>
        </div>
      )}
    </div>
  );
};

export default App;
