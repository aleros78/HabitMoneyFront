import React, { useState } from "react";
import Welcome from "./Welcome";
import AuthButton from "./AuthButton";
import HabitList from "./HabitList";
import InstallButton from "./InstallButton";
import { FiLogOut, FiDownload } from "react-icons/fi";
import AdBanner from "./AdBanner";

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
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <div style={{ flex: 1, paddingTop: "20px", position: "relative" }}>
        <div style={{ position: "absolute", top: 10, right: 10 }}>
          <AuthButton user={user} />
          {installable && (
            <InstallButton
              installable={installable}
              onInstall={handleInstallClick}
            />
          )}
        </div>

        <h1 style={{ textAlign: "center" }}>Habit Tracker</h1>

        <div style={{ marginBottom: "20px", textAlign: "center" }}>
          <button onClick={() => setActiveTab("home")}>Home</button>
          <button onClick={() => setActiveTab("habits")} disabled={!user}>
            Buone Abitudini
          </button>
        </div>

        {activeTab === "home" && (
          <>
            <Welcome user={user} />
            <p style={{ textAlign: "center" }}>
              Benvenuto su Habit Tracker! Tieni traccia delle tue abitudini e
              migliora la tua vita giorno dopo giorno.
            </p>
            <p style={{ textAlign: "center" }}>
              {" "}
              <b>
                Hai mai pensato di premiarti concretamente per ogni piccola
                vittoria quotidiana?
              </b>{" "}
              Con questa app, trasformi ogni buona abitudine in un valore
              tangibile: ogni volta che completi un'abitudine che hai scelto e
              configurato, vedi il tuo bilancio personale crescere. Non genera
              denaro, ma qualcosa di ancora più prezioso: ti insegna a
              riconoscere e celebrare concretamente i tuoi sforzi. Perché ogni
              piccolo passo che fai oggi diventa la grande vittoria di domani.
              Quando decidi che è il momento di premiarti, puoi "incassare" il
              tuo saldo trasferendolo in un conto risparmio, in un salvadanaio o
              in qualsiasi fondo di accumulo tu abbia scelto. Ripaga te stesso e
              rendi visibili i risultati del tuo impegno, una buona abitudine
              alla volta.
            </p>
          </>
        )}

        {activeTab === "habits" && user && <HabitList user={user} />}
      </div>

      <div
        style={{
          height: "50px",
          backgroundColor: "#f1f1f1",
          textAlign: "center",
          padding: "10px",
          borderTop: "1px solid #ddd",
        }}
      >
        <AdBanner />
      </div>
    </div>
  );
};

export default MainLayout;
