// main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import { UserProvider } from "./UserContext";
import "./index.css";

import SelectOption from "./pages/SelectOption";
import StudentQuestionPortal from "./pages/StudentQuestionPortal";
import TutorQuestionPortal from "./pages/TutorQuestionPortal";
import LandingPage from "./pages/Landing";
import MatchedTutorsPage from "./pages/MatchedTutorsPage";
import MatchedStudentPage from "./pages/MatchedStudentPage";
import AuthPage from "./pages/Auth";

const Auth0ProviderWithNavigate = ({ children }) => {
  // ... your Auth0Provider setup here
  return (
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      redirectUri={window.location.origin}
      onRedirectCallback={(appState) =>
        window.location.assign(appState?.returnTo || "/")
      }
    >
      {children}
    </Auth0Provider>
  );
};

const App = () => (
  <Auth0ProviderWithNavigate>
    <UserProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/SelectOption" element={<SelectOption />} />
        <Route path="/StudentQuestionPortal" element={<StudentQuestionPortal />} />
        <Route path="/TutorQuestionPortal" element={<TutorQuestionPortal />} />
        <Route path="/MatchedTutorsPage" element={<MatchedTutorsPage />} />
        <Route path="/MatchedStudentPage" element={<MatchedStudentPage />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </UserProvider>
  </Auth0ProviderWithNavigate>
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>
);
