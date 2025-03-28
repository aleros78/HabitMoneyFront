import React from "react";

interface WelcomeProps {
  user: any;
}

const Welcome: React.FC<WelcomeProps> = ({ user }) => (
  <h2 style={{ textAlign: "center", fontSize: "1.2rem" }}>
    {user ? `Ciao, ${user.displayName}!` : "Benvenuto!"}
  </h2>
);

export default Welcome;
