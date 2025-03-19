import React, { useState } from "react";
import { fetchHabits } from "../services/habits";

interface HabitListProps {
  user: any;
}

const HabitList: React.FC<HabitListProps> = ({ user }) => {
  const [habits, setHabits] = useState<any[]>([]);

  const loadHabits = async () => {
    const data = await fetchHabits(user);
    setHabits(data);
  };

  return (
    <div>
      <button onClick={loadHabits}>Carica abitudini</button>
      <ul>
        {habits.map((habit) => (
          <li key={habit.id}>{habit.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default HabitList;
