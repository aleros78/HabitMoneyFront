import React, { useState, useEffect } from "react";
import { FiEye } from "react-icons/fi";
import {
  fetchHabits,
  addHabits,
  deleteHabits,
  completeHabits,
  getBalance,
  getHistory,
  resetBalance,
  getHistoryBalance,
  getHistoryCompletedUserReset,
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
  const [historyCompletedUserReset, sethistoryCompletedUserReset] = useState<
    any[]
  >([]);
  const [showHistoryBalance, setShowHistoryBalance] = useState(false);
  const [showHistoryCompletedUserReset, setShowHistoryCompletedUserReset] =
    useState(false);
  const [openedResetId, setOpenedResetId] = useState<string | null>(null);

  useEffect(() => {
    loadHabits();
  }, []);

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
      console.log(data);
      setHistoryBalance(data);
      setShowHistoryBalance(true);
    }
  };

  const loadHistoryCompletedUserReset = async (resetId: string) => {
    const data = await getHistoryCompletedUserReset(user, resetId);
    if (data) {
      sethistoryCompletedUserReset(data);
      setShowHistoryCompletedUserReset(true);
    }
  };

  const loadHabits = async () => {
    const data = await fetchHabits(user);
    setHabits(data);
    await loadBalance();
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
    await loadHabits();
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
    <div className="habit-container">
      {balance !== null && (
        <div className="balance-section">
          <div className="balance-display">
            Valore delle tue azioni: € {balance.toFixed(2)}
          </div>
          <button onClick={handleResetBalance}>Ritira il tuo credito</button>
          <button onClick={loadHistoryBalance}>
            Storia dei tuoi versamenti
          </button>
        </div>
      )}
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Annulla" : "Aggiungi abitudine"}
      </button>
      <button onClick={loadHistory}>Vedi cronologia</button>

      {showForm && (
        <form onSubmit={handleSubmit} className="habit-form">
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

      <ul className="habit-list">
        {habits.map((habit) => (
          <li key={habit.id}>
            {habit.name} - Valore: {habit.value}
            <button onClick={() => handleComplete(habit.id, habit.value)}>
              ✔️
            </button>
            <button onClick={() => deleteHabit(habit.id)}>❌</button>
          </li>
        ))}
      </ul>

      {successMessage && (
        <div className="message success">{successMessage}</div>
      )}
      {deleteMessage && <div className="message error">{deleteMessage}</div>}

      {showHistory && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Cronologia Abitudini</h3>
            <ul>
              {history.map((item, index) => (
                <li key={index}>
                  {item.habitName} - {item.value} -{" "}
                  {new Date(item.completedAt).toLocaleString()}
                </li>
              ))}
            </ul>
            <button onClick={() => setShowHistory(false)}>Chiudi</button>
          </div>
        </div>
      )}

      {showHistoryBalance && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Cronologia Balance</h3>
            <ul>
              {historyBalance.map((item, index) => (
                <li key={index}>
                  {item.amount} - {new Date(item.resetAt).toLocaleString()}
                  <button
                    onClick={() => {
                      loadHistoryCompletedUserReset(item.id);
                      setOpenedResetId(item.id);
                    }}
                  >
                    {FiEye({})}
                  </button>
                  {showHistoryCompletedUserReset &&
                    openedResetId === item.id && (
                      <div className="history-detail">
                        <h4>Dettagli reset</h4>
                        <ul>
                          {historyCompletedUserReset.map((entry, index) => (
                            <li key={index}>
                              {entry.habitName} – {entry.value} –{" "}
                              {new Date(entry.completedAt).toLocaleString()}
                            </li>
                          ))}
                        </ul>
                        <button
                          onClick={() =>
                            setShowHistoryCompletedUserReset(false)
                          }
                        >
                          Chiudi dettaglio
                        </button>
                      </div>
                    )}
                </li>
              ))}
            </ul>

            <button onClick={() => setShowHistoryBalance(false)}>Chiudi</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HabitList;
