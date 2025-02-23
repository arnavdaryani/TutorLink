import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";

import SelectOption from "./pages/SelectOption";
import StudentQuestionPortal from "./pages/StudentQuestionPortal";
import TutorQuestionPortal from "./pages/TutorQuestionPortal";
import LandingPage from "./pages/Landing";
import Welcome from "./pages/Welcome";
import MatchedTutorsPage from "./pages/MatchedTutorsPage";
import MatchedStudentPage from "./pages/MatchedStudentPage";
import Bubble from "./pages/Welcome";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/StudentQuestionPortal" element={<StudentQuestionPortal />} />
        <Route path="/TutorQuestionPortal" element={<TutorQuestionPortal />} />
        <Route path="/SelectOption" element={<SelectOption />} />
        <Route path="/Welcome" element={<Welcome />} />
        <Route path="/MatchedTutorsPage" element={<MatchedTutorsPage />} />
        <Route path="/MatchedStudentPage" element={<MatchedStudentPage />} />
        <Route path="/Welcome" element={<Bubble />} />
      </Routes>
    </Router>
  </StrictMode>
);
