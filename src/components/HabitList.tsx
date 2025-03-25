import React, { useState } from "react";
import {
  fetchHabits,
  addHabits,
  deleteHabits,
  completeHabits,
  getBalance,
  getHistory,
  resetBalance,
  getHistoryBalance,
} from "../services/habits";

interface HabitListProps {
  user: any;
}

const HabitList: React.FC<HabitListProps> = ({ user }) => {
  const [habits, setHabits] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [value, setValue] = useState(1);
  const [successMessage, setSuccessMessage] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");
  const [balance, setBalance] = useState<number | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<any[]>([]);
  const [historyBalance, setHistoryBalance] = useState<any[]>([]);
  const [showHistoryBalance, setShowHistoryBalance] = useState(false);

  const loadBalance = async () => {
    const data = await getBalance(user);
    if (data && typeof data.balance === "number") {
      setBalance(data.balance);
    }
  };

  const loadHistory = async () => {
    const data = await getHistory(user);
    if (data) {
      setHistory(data);
      setShowHistory(true);
    }
  };

  const loadHistoryBalance = async () => {
    const data = await getHistoryBalance(user);
    if (data) {
      setHistoryBalance(data);
      setShowHistoryBalance(true);
    }
  };

  const loadHabits = async () => {
    const data = await fetchHabits(user);
    setHabits(data);
    await loadBalance(); // aggiunto
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const decimalValue = parseFloat(Number(value).toFixed(2));
    await addHabits(user, name, decimalValue);
    setName("");
    setValue(1);
    setShowForm(false);
    await loadHabits();
  };

  const handleResetBalance = async () => {
    await resetBalance(user);
    await loadHabits(); // ricarica anche il bilancio
  };

  const handleComplete = async (habitId: string, value: number) => {
    await completeHabits(user, habitId, value);
    setSuccessMessage("✅ Abitudine completata!");

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);

    await loadHabits();
  };

  const deleteHabit = async (habitId: string) => {
    await deleteHabits(habitId);
    setDeleteMessage("Abitudine Eliminata");

    setTimeout(() => {
      setDeleteMessage("");
    }, 3000);

    await loadHabits();
  };

  return (
    <div>
      {balance !== null && (
        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
          <span style={{ fontWeight: "bold", marginRight: "1rem" }}>
            💰 Bilancio: {balance.toFixed(2)}
          </span>
          <button onClick={handleResetBalance}>🔄 Reset</button>
          <button onClick={loadHistoryBalance}>Balance history</button>
        </div>
      )}
      <button onClick={loadHabits}>Carica abitudini</button>
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Annulla" : "Aggiungi abitudine"}
      </button>
      <button onClick={loadHistory}>Vedi cronologia</button>

      {showForm && (
        <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
          <div>
            <label>
              Nome abitudine:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Valore:
              <input
                type="number"
                step="0.01"
                value={value}
                onChange={(e) => setValue(parseFloat(e.target.value))}
                required
                min="0"
              />
            </label>
          </div>
          <button type="submit">Salva</button>
        </form>
      )}

      <ul>
        {habits.map((habit) => (
          <li key={habit.id}>
            {habit.name} - Valore: {habit.value}{" "}
            <button onClick={() => handleComplete(habit.id, habit.value)}>
              Completa
            </button>
            <button onClick={() => deleteHabit(habit.id)}>Elimina</button>
          </li>
        ))}
      </ul>

      {successMessage && (
        <div style={{ marginTop: "1rem", color: "green" }}>
          {successMessage}
        </div>
      )}
      {deleteMessage && (
        <div style={{ marginTop: "1rem", color: "red" }}>{deleteMessage}</div>
      )}
      {showHistory && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "2rem",
              borderRadius: "10px",
              maxHeight: "80vh",
              overflowY: "auto",
              minWidth: "300px",
            }}
          >
            <h2>Cronologia abitudini</h2>
            <ul>
              {history.length === 0 ? (
                <li>Nessuna abitudine completata.</li>
              ) : (
                history.map((item, index) => (
                  <li key={index}>
                    {item.habitName} – {item.value} –{" "}
                    {new Date(item.completedAt).toLocaleString()}
                  </li>
                ))
              )}
            </ul>
            <button onClick={() => setShowHistory(false)}>Chiudi</button>
          </div>
        </div>
      )}
      {showHistoryBalance && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "2rem",
              borderRadius: "10px",
              maxHeight: "80vh",
              overflowY: "auto",
              minWidth: "300px",
            }}
          >
            <h2>Cronologia Balance</h2>
            <ul>
              {historyBalance.length === 0 ? (
                <ul>
                  <li>Nessun Balance reset.</li>
                </ul>
              ) : (
                <>
                  <ul>
                    {historyBalance.map((item, index) => (
                      <li key={index}>
                        {item.amount} –{" "}
                        {new Date(item.resetAt).toLocaleString()}
                      </li>
                    ))}
                  </ul>
                  <div style={{ marginTop: "1rem", fontWeight: "bold" }}>
                    Totale reset:{" "}
                    {historyBalance
                      .reduce((acc, item) => acc + Number(item.amount), 0)
                      .toFixed(2)}
                  </div>
                </>
              )}
            </ul>
            <button onClick={() => setShowHistoryBalance(false)}>Chiudi</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HabitList;
