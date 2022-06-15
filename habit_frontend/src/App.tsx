import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Home from "./components/Home";
interface Response {
  id: any;
  name: string;
}
function App() {
  const [habits, setHabits] = useState<any[]>([]);
  useEffect(() => {
    const url = "http://localhost:5656/habits";
    console.log(url);
    axios
      .get(url)
      .then(({ data: habits }: { data: Response }) => {
        setHabits([habits]);
      })
      .catch(() => {
        console.log("unsuccessful");
      });
  }, []);
  return (
    <div className="App">
      <Home />
      <h1> Do it over and over and over again </h1>
      {habits.map((habit, indx) => {
        return <p>{habit.name}</p>;
      })}
    </div>
  );
}

export default App;
