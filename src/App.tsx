import React from "react";
import { useAuth } from "./hooks/useAuth";
import { usePWAInstallPrompt } from "./hooks/usePWAInstallPrompt";
import AuthButton from "./components/AuthButton";
import InstallButton from "./components/InstallButton";
import HabitList from "./components/HabitList";
import Welcome from "./components/Welcome";

const App: React.FC = () => {
  const { user } = useAuth();
  const { installable, handleInstallClick } = usePWAInstallPrompt();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Habit Tracker</h1>
      <Welcome user={user} />
      <AuthButton user={user} />
      {user && <HabitList user={user} />}
      <InstallButton installable={installable} onInstall={handleInstallClick} />
    </div>
  );
};

export default App;
