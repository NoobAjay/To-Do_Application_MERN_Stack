import Homepage from "../pages/Homepage";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Homepage />} />
          {/* <Route path="/application" element={<About />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
