import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./pages/mainPage";
import Tournament from "./pages/Tournament";
import Play from "./pages/Play";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/tournament/:id" element={<Tournament />} />
          <Route path="/tournament/:id/jugar" element={<Play />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
