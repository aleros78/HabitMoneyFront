import React, { useState } from "react";
import { fetchHabits, addHabits } from "../services/habits";

interface HabitListProps {
  user: any;
}

const HabitList: React.FC<HabitListProps> = ({ user }) => {
  const [habits, setHabits] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [value, setValue] = useState(1);

  const loadHabits = async () => {
    const data = await fetchHabits(user);
    setHabits(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const decimalValue = parseFloat(Number(value).toFixed(2)); // massimo 2 decimali

    await addHabits(user, name, decimalValue);
    setName("");
    setValue(1);
    setShowForm(false);
    await loadHabits();
  };

  return (
    <div>
      <button onClick={loadHabits}>Carica abitudini</button>
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Annulla" : "Aggiungi abitudine"}
      </button>

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
            {habit.name} - Valore: {habit.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HabitList;
