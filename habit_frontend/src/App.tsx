import React, { useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  useEffect(() => {
    const url = "http://localhost:5656/habits";
    console.log(url);
    axios
      .get(url)
      .then((res) => {
        console.log("RES", res);
      })
      .catch(() => {
        console.log("unsuccessful");
      });
  });
  return (
    <div className="App">
      <h1> Habitsies </h1>
    </div>
  );
}

export default App;
