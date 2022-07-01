import "./App.css";
import Home from "./components/Home";
import Main from "./components/Main";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useContext } from "react";
import axios from "axios";
import { UserContext, UserContextType } from "./context/UserContext";

function App() {
  const { user } = useContext(UserContext) as UserContextType;
  console.log(user);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Main />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
