import Homepage from "../pages/Homepage";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route path="/" element={<Homepage />} />
        {/* <Route path="/application" element={<About />} /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
