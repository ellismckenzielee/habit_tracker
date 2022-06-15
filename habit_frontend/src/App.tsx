import "./App.css";
import Home from "./components/Home";
import Main from "./components/Main";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
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
