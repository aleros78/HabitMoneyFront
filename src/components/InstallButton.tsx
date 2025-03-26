import React from "react";
import { FiDownload } from "react-icons/fi";

interface InstallButtonProps {
  installable: boolean;
  onInstall: () => void;
}

const InstallButton: React.FC<InstallButtonProps> = ({ installable, onInstall }) => {
  if (!installable) return null;

  return (
    <button onClick={onInstall}>
      <FiDownload />
    </button>
  );
};

export default InstallButton;
