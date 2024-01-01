import Homepage from "../pages/Homepage";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={Homepage} />
            {/* <Route path="/application" element={<About />} /> */}
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
