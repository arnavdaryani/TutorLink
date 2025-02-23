import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar"; // Adjust path if necessary
import { useUser } from "../UserContext"; // Make sure this path is correct

function SelectOption() {
  const navigate = useNavigate();
  const { user, loading } = useUser();

  if (loading) {
    return (
      <div style={{ textAlign: "center", paddingTop: "2rem", color: "#fff" }}>
        Loading user data...
      </div>
    );
  }

  return (
    <>
      {/* Inline <style> with improved styling */}
      <style>
        {`
          /* 1) Google Font (Optional) */
          @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap');

          /* 2) Global resets & font */
          html, body {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            font-family: 'Montserrat', sans-serif;
            background: radial-gradient(circle at top left, #111 0%, #000 100%);
            color: #fff;
          }

          ul, li {
            list-style: none;
          }

          /* 3) Container that holds everything (hero-like) */
          .main-container {
            min-height: 80vh;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            padding: 2rem;
            box-sizing: border-box;
          }

          /* 4) Header text styling */
          header {
            text-align: center;
            margin-top: 2rem;
          }
          header h1 {
            margin-bottom: 0.5rem;
            font-size: 2.2rem;
            font-weight: 600;
          }
          header p {
            margin-top: 0.5rem;
            font-size: 1rem;
            opacity: 0.85;
          }

          /* 5) Card container: flex layout with wrap for responsiveness */
          .cards {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 2rem;
            flex-wrap: wrap;
            margin-top: 2rem; 
          }

          /* 6) Each card styling */
          .card {
            background-color: #1a1a1a;
            border-radius: 8px;
            padding: 1.5rem;
            text-align: center;
            width: 360px;
            height: 230px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.6);
          }
          .card h2 {
            margin-bottom: 1rem;
            font-weight: 600;
            font-size: 1.6rem;
          }
          .card p {
            margin-bottom: 1.5rem;
            font-size: 0.95rem;
            line-height: 1.4;
          }

          /* 7) Button styling */
          button {
            border: none;
            padding: 0.65rem 1.25rem;
            border-radius: 4px;
            cursor: pointer;
            font-size: 0.95rem;
            transition: background-color 0.3s ease, opacity 0.3s ease;
          }
          button:hover {
            opacity: 0.9;
          }
          .student-btn {
            background-color: #7842E5;
            color: #ffffff;
          }
          .tutor-btn {
            background-color: #2196F3;
            color: #ffffff;
          }

          /* 8) Responsive adjustments (optional) */
          @media (max-width: 768px) {
            header h1 {
              font-size: 1.8rem;
            }
            .card {
              width: 100%;
              max-width: 300px;
            }
          }
        `}
      </style>

      {/* Top navigation */}
      <Navbar />

      {/* Main container */}
      <div className="main-container">
        {/* Header section */}
        <header>
          <h1>Welcome to TutorLink</h1>
          {user ? (
            <div>
              <p>
                Logged in as <strong>{user.name}</strong> ({user.email})
              </p>
              {user.picture && (
                <img
                  src={user.picture}
                  alt="Profile"
                  style={{ width: "100px", borderRadius: "50%" }}
                />
              )}
            </div>
          ) : (
            <p>Your one-stop platform for students and tutors to connect.</p>
          )}
        </header>

        {/* Cards section */}
        <div className="cards">
          {/* For Students */}
          <div className="card">
            <h2>For Students</h2>
            <p>Find expert tutors to help you excel in your studies.</p>
            <button
              className="student-btn"
              onClick={() => navigate("/StudentQuestionPortal")}
            >
              Start Learning
            </button>
          </div>

          {/* For Tutors */}
          <div className="card">
            <h2>For Tutors</h2>
            <p>Join our platform to share your expertise and earn.</p>
            <button
              className="tutor-btn"
              onClick={() => navigate("/TutorQuestionPortal")}
            >
              Start Teaching
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SelectOption;
