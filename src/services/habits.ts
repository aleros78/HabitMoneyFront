import { getFirebaseToken } from "../firebase";
import config from "../config";

interface User {
  uid: string;
}

export const fetchHabits = async (user: User) => {
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

export const getBalance = async (user: User) => {
  try {
    const token = await getFirebaseToken();
    if (!token) {
      console.error("Token non disponibile");
      return;
    }

    const response = await fetch(config.apiUrl + "/balance/" + user.uid, {
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

export const getHistory = async (user: User) => {
  try {
    const token = await getFirebaseToken();
    if (!token) {
      console.error("Token non disponibile");
      return;
    }

    const response = await fetch(config.apiUrl + "/history/" + user.uid, {
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

export const resetBalance = async (user: User) => {
  try {
    const token = await getFirebaseToken();
    if (!token) {
      console.error("Token non disponibile");
      return;
    }

    const response = await fetch(config.apiUrl + "/reset-balance/" + user.uid, {
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

export const getHistoryBalance = async (user: User) => {
  try {
    const token = await getFirebaseToken();
    if (!token) {
      console.error("Token non disponibile");
      return;
    }

    const response = await fetch(
      config.apiUrl + "/balance-history/" + user.uid,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Passa il token nel header
        },
      },
    );

    if (!response.ok) {
      throw new Error("Errore nel recupero delle abitudini");
    }

    return await response.json();
  } catch (error) {
    console.error("Errore:", error);
  }
};

export const addHabits = async (user: User, name: string, value: number) => {
  try {
    const token = await getFirebaseToken();
    if (!token) {
      console.error("Token non disponibile");
      return;
    }

    const response = await fetch(config.apiUrl + "/habits", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userId: user.uid,
        name,
        value,
      }),
    });

    if (!response.ok) {
      throw new Error("Errore nell'aggiunta dell'abitudine");
    }

    return await response.json();
  } catch (error) {
    console.error("Errore:", error);
  }
};

export const completeHabits = async (
  user: User,
  habitId: string,
  value: number,
) => {
  try {
    const token = await getFirebaseToken();
    if (!token) {
      console.error("Token non disponibile");
      return;
    }

    const response = await fetch(config.apiUrl + "/complete-habit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userId: user.uid,
        habitId,
        value,
      }),
    });

    if (!response.ok) {
      throw new Error("Errore nell'aggiunta dell'abitudine");
    }

    return await response.json();
  } catch (error) {
    console.error("Errore:", error);
  }
};
