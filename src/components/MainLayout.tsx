import React from "react";
import Welcome from "./Welcome";
import AuthButton from "./AuthButton";
import HabitList from "./HabitList";
import InstallButton from "./InstallButton";

interface MainLayoutProps {
  user: any;
  installable: boolean;
  handleInstallClick: () => void;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  user,
  installable,
  handleInstallClick,
}) => {
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

export default MainLayout;
