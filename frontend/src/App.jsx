import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";

import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Disease from "./pages/Disease";
import Rainfall from "./pages/Rainfall";
import Recommendation from "./pages/Recommendation";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/disease" element={<Disease />} />
          <Route path="/rainfall" element={<Rainfall />} />
          <Route path="/recommendation" element={<Recommendation />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;
