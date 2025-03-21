import { getFirebaseToken } from "../firebase";
import config from "../config";

export const fetchHabits = async (user) => {
  try {
    const token = await getFirebaseToken();
    if (!token) {
      console.error("Token non disponibile");
      return;
    }

    const response = await fetch(config.apiUrl + "/habits/" + user.uid, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Passa il token nel header
      },
    });

    if (!response.ok) {
      throw new Error("Errore nel recupero delle abitudini");
    }

    return await response.json();
  } catch (error) {
    console.error("Errore:", error);
  }
};
