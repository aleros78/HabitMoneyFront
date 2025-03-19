import React from "react";
import { useAuth } from "./hooks/useAuth";
import { usePWAInstallPrompt } from "./hooks/usePWAInstallPrompt";
import MainLayout from "./components/MainLayout";
import "./App.css";

const App: React.FC = () => {
  const { user } = useAuth();
  const { installable, handleInstallClick } = usePWAInstallPrompt();

  return (
    <MainLayout
      user={user}
      installable={installable}
      handleInstallClick={handleInstallClick}
    />
  );
};

export default App;
