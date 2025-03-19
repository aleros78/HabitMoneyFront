import React from "react";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../firebase";

interface AuthButtonProps {
  user: any;
}

const AuthButton: React.FC<AuthButtonProps> = ({ user }) => {
  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Errore autenticazione:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Errore logout:", error);
    }
  };

  return user ? (
    <button onClick={handleSignOut}>Esci</button>
  ) : (
    <button onClick={handleSignIn}>Accedi con Google</button>
  );
};

export default AuthButton;
