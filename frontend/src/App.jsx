import ApplicationPage from "../pages/ApplicationPage";
import Homepage from "../pages/Homepage";
import "./App.css";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/application" element={<ApplicationPage />} />
      </Routes>
    </div>
  );
}

export default App;
