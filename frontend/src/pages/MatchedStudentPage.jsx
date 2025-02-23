import React, { useState } from "react";

function MatchedStudentPage() {
  // Sample data of matched students (replace with real data as needed)
  const matchedStudents = [
    { 
      name: "Devansh Khandelwal", 
      matchPercentage: 97,
      linkedin: "https://www.linkedin.com/in/alicebrown",
      subjects: "Computer Science, Programming",
      bio: "Dedicated student passionate about science and learning."
    },
    { 
      name: "David Lee", 
      matchPercentage: 85,
      linkedin: "https://www.linkedin.com/in/davidlee",
      subjects: "Mathematics, Computer Science",
      bio: "Combines technical expertise with a creative approach to problem-solving."
    },
  ];

  // State to track each student's response ("Accepted" or "Rejected")
  const [responses, setResponses] = useState({});

  // Handler for Accept/Reject buttons
  const handleResponse = (index, response) => {
    setResponses((prev) => ({ ...prev, [index]: response }));
  };

  // Inline SVG for LinkedIn icon
  const LinkedInIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24" 
      height="24"
      viewBox="0 0 24 24"
      fill="#48BB78"
      style={styles.icon}
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.327-.027-3.036-1.849-3.036-1.85 0-2.134 1.445-2.134 2.941v5.664h-3.554V9h3.414v1.561h.049c.476-.9 1.637-1.849 3.369-1.849 3.601 0 4.267 2.368 4.267 5.455v6.285zM5.337 7.433c-1.144 0-2.072-.928-2.072-2.072 0-1.144.928-2.072 2.072-2.072 1.144 0 2.072.928 2.072 2.072 0 1.144-.928 2.072-2.072 2.072zm1.777 13.019H3.56V9h3.554v11.452zM22.225 0H1.771C.792 0 0 .771 0 1.723v20.554C0 23.229.792 24 1.771 24h20.451C23.208 24 24 23.229 24 22.277V1.723C24 .771 23.208 0 22.225 0z"/>
    </svg>
  );

  // Inline SVG for Email icon
  const EmailIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24" 
      height="24"
      viewBox="0 0 24 24"
      fill="#48BB78"
      style={styles.icon}
    >
      <path d="M12 13.065l-10-7.065v12h20v-12l-10 7.065zm0-2.13l10-7.435v-1.5h-20v1.5l10 7.435z"/>
    </svg>
  );

  return (
    <>
      {/* Global styles to disable scrolling */}
      <style>
        {`
          html, body {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            background-color: #000;
          }
        `}
      </style>
      <div style={styles.pageWrapper}>
        <h1 style={styles.title}>Your Matched Students</h1>
        <div style={styles.grid}>
          {matchedStudents.map((student, index) => {
            return (
              <div key={index} style={styles.card}>
                <div style={styles.cardContent}>
                  <h2 style={styles.name}>{student.name}</h2>
                  <div style={styles.match}>{student.matchPercentage}%</div>
                  {/* Render subjects as a read-only text field */}
                  <input
                    type="text"
                    readOnly
                    value={student.subjects}
                    style={styles.subjectsField}
                  />
                  <p style={styles.info}>
                    <strong>Bio:</strong> {student.bio}
                  </p>
                  {/* Display status if a response exists */}
                  {responses[index] && (
                    <p style={styles.status}>
                      <strong>Status:</strong> {responses[index]}
                    </p>
                  )}
                </div>
                {/* Render action buttons only if no response yet */}
                {!responses[index] && (
                  <div style={styles.actionContainer}>
                    <button 
                      style={styles.acceptButton} 
                      onClick={() => handleResponse(index, "Accepted")}
                    >
                      Accept
                    </button>
                    <button 
                      style={styles.rejectButton} 
                      onClick={() => handleResponse(index, "Rejected")}
                    >
                      Reject
                    </button>
                  </div>
                )}
                {/* Icons container with Email and LinkedIn icons */}
                <div style={styles.iconContainer}>
                  <a 
                    href={`mailto:${student.email}`} 
                    style={styles.iconLink}
                  >
                    <EmailIcon />
                  </a>
                  <a 
                    href={student.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    style={styles.iconLink}
                  >
                    <LinkedInIcon />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

const styles = {
  pageWrapper: {
    width: "100vw",
    height: "100vh",         // Fill the viewport height
    overflow: "hidden",      // Disable scrolling
    backgroundColor: "#000", // Black background
    color: "#fff",
    padding: "2rem",
    fontFamily: "Inter, sans-serif",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start", // Align items at the top
  },
  title: {
    textAlign: "center",
    width: "100%",
    marginBottom: "3rem", // Increased spacing between heading and grid
    fontSize: "2rem",
  },
  grid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "1.5rem",
    justifyContent: "center",
    width: "100%",
  },
  card: {
    backgroundColor: "#1a1a1a", // Default background
    borderRadius: "8px",
    width: "250px",
    padding: "1.5rem",
    boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  cardContent: {
    flex: 1,
  },
  name: {
    margin: "0.5rem 0",
    fontSize: "1.3rem",
    color: "#fff",
  },
  match: {
    marginTop: "1rem",
    fontWeight: "bold",
    fontSize: "2.5rem", // Increased font size for percentage
    color: "#4caf50",
    textAlign: "center",
  },
  subjectsField: {
    width: "100%",
    padding: "0.5rem",
    fontSize: "1rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
    backgroundColor: "#333",
    color: "#fff",
    marginTop: "0.5rem",
    appearance: "none",
    WebkitAppearance: "none",
    outline: "none",
  },
  info: {
    margin: "0.5rem 0",
    fontSize: "0.9rem",
    color: "#ccc",
  },
  status: {
    marginTop: "1.5rem", // Extra margin to push the status down
    fontSize: "1.5rem", // Larger status font
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  actionContainer: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    marginTop: "1rem",
  },
  acceptButton: {
    backgroundColor: "#4CAF50", // Green for accept
    color: "#fff",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    cursor: "pointer",
  },
  rejectButton: {
    backgroundColor: "#f44336", // Red for reject
    color: "#fff",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    cursor: "pointer",
  },
  iconContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
    marginTop: "1rem",
  },
  iconLink: {
    textDecoration: "none",
  },
  icon: {
    width: "24px",
    height: "24px",
  },
};

export default MatchedStudentPage;