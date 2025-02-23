import React, { useState, useEffect } from "react";

function MatchedTutorsPage() {
  // State to control the 5-second loading delay
  const [loading, setLoading] = useState(true);

  // Sample data of matched tutors (replace with real data as needed)
  const matchedTutors = [
    { 
      name: "John Doe", 
      experience: "3 years teaching CS courses", 
      matchPercentage: 85,
      
      linkedin: "https://www.linkedin.com/in/johndoe",
      email: "johndoe@example.com",
    },
    { 
      name: "Jane Smith", 
      experience: "5 years as a Math TA", 
      matchPercentage: 88,
      linkedin: "https://www.linkedin.com/in/janesmith",
      email: "janesmith@example.com",
    },
    { 
      name: "Sam Johnson", 
      experience: "Graduate student specializing in Physics", 
      matchPercentage: 92,
      linkedin: "https://www.linkedin.com/in/samjohnson",
      email: "samjohnson@example.com",
    },
    { 
      name: "Lisa Chen", 
      experience: "Professional tutor with 10+ years experience", 
      matchPercentage: 99,
      linkedin: "https://www.linkedin.com/in/lisachen",
      email: "lisachen@example.com",
    },
  ];

  // Track which tutors have had the "Send Request" button clicked
  const [requestsSent, setRequestsSent] = useState({});

  // Toggle the request state for a specific tutor index
  const toggleRequest = (index) => {
    setRequestsSent((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // StarRating component: displays 5 stars with filled stars based on the rating value
  const StarRating = ({ rating }) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} style={{ color: i < rating ? "#FFD700" : "#555" }}>
          &#9733;
        </span>
      );
    }
    return <div style={styles.rating}>{stars}</div>;
  };

  // Email icon
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

  // LinkedIn icon
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

  // Simulate a 5-second loading delay before showing main content.
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <h1 style={{ color: "#fff" }}>Loading your matched tutors...</h1>
      </div>
    );
  }

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
        <h1 style={styles.title}>Your Matched Tutors</h1>
        <div style={styles.grid}>
          {matchedTutors.map((tutor, index) => {
            // Calculate rating as a number between 0 and 5
            const rating = Math.round(tutor.matchPercentage / 20);
            return (
              <div key={index} style={styles.card}>
                <div style={styles.cardContent}>
                  <h2 style={styles.name}>{tutor.name}</h2>
                  <p style={styles.experience}>{tutor.experience}</p>
                  <div style={styles.match}>{tutor.matchPercentage}%</div>
                  <p style={styles.info}>
                    <p style={styles.subjects}>Subjects: {tutor.subjects}</p>
                  </p>
                </div>

                {/* Star rating container */}
                <StarRating rating={rating} />

                {/* Icons container */}
                <div style={styles.iconContainer}>
                  <a href={`mailto:${tutor.email}`} style={styles.iconLink}>
                    <EmailIcon />
                  </a>
                  <a
                    href={tutor.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.iconLink}
                  >
                    <LinkedInIcon />
                  </a>
                </div>

                {/* Button container with toggle button */}
                <div style={styles.buttonContainer}>
                  <button
                    style={
                      requestsSent[index]
                        ? { ...styles.button, backgroundColor: "red" }
                        : styles.button
                    }
                    onClick={() => toggleRequest(index)}
                  >
                    {requestsSent[index] ? "Cancel" : "Send Request"}
                  </button>
                </div>
                
                {/* Status display */}
                <div style={styles.statusContainer}>
                  <p style={styles.statusText}>
                    {requestsSent[index]
                      ? "Status: Pending"
                      : "Status: Not Requested"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

// ----- STYLES -----
const styles = {
  loadingContainer: {
    width: "100vw",
    height: "100vh",
    backgroundColor: "#000",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  pageWrapper: {
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
    backgroundColor: "#000",
    color: "#fff",
    padding: "2rem",
    fontFamily: "Inter, sans-serif",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    textAlign: "center",
    width: "100%",
    marginBottom: "3rem",
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
    backgroundColor: "#1a1a1a",
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
  experience: {
    margin: "0.5rem 0",
    fontSize: "1rem",
    color: "#ccc",
  },
  match: {
    marginTop: "1rem",
    fontWeight: "bold",
    fontSize: "1.5rem",
    color: "#4caf50",
    textAlign: "center",
  },
  info: {
    margin: "0.5rem 0",
    fontSize: "0.9rem",
    color: "#ccc",
  },
  iconContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "2rem",
    marginTop: "1rem",
  },
  iconLink: {
    textDecoration: "none",
  },
  icon: {
    width: "20px",
    height: "20px",
  },
  rating: {
    display: "flex",
    justifyContent: "center",
    marginTop: "0.5rem",
  },
  buttonContainer: {
    marginTop: "1rem",
    display: "flex",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#48BB78",
    color: "#fff",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    cursor: "pointer",
  },
  statusContainer: {
    marginTop: "0.5rem",
    textAlign: "center",
  },
  statusText: {
    color: "#fff",
    fontSize: "0.9rem",
  },
};

export default MatchedTutorsPage;
