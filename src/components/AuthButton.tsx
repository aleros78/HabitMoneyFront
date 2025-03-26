import React from "react";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { FiLogOut } from "react-icons/fi";

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

  return !user ? (
    <button onClick={handleSignIn}>Accedi con Google</button>
  ) : (
    <button onClick={handleSignOut}>{(<FiLogOut />) as JSX.Element}</button>
  );
};

export default AuthButton;
