import React from "react";

interface InstallButtonProps {
  installable: boolean;
  onInstall: () => void;
}

const InstallButton: React.FC<InstallButtonProps> = ({
  installable,
  onInstall,
}) => {
  if (!installable) return null;

  return (
    <button style={{ marginTop: "20px" }} onClick={onInstall}>
      Installa l'App
    </button>
  );
};

export default InstallButton;
