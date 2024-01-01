import Homepage from "../pages/Homepage";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Route path="/" element={<Homepage />} />
      {/* <Route path="/application" element={<About />} /> */}
    </div>
  );
}

export default App;
