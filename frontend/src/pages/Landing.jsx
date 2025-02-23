import React from "react";
import { useNavigate } from "react-router-dom"; // v6 or higher
import EduMatchLogo from "../images/EduMatch.png"; // Adjust path if needed

function LandingPage() {
  const navigate = useNavigate();

  // Testimonials array
  const testimonials = [
    {
      quote:
        "TutorLink matched me with a tutor who truly understands my learning style. My grades have improved drastically!",
      author: "Jane, High School Student",
    },
    {
      quote:
        "As a tutor, the dynamic pricing feature helped me set competitive rates without undervaluing my expertise.",
      author: "David, Freelance Tutor",
    },
    {
      quote:
        "The ML-driven matching saved me hours of searching for the right tutor. Highly recommend!",
      author: "Emily, College Sophomore",
    },
  ];

  // State to track the current testimonial index
  const [currentTestimonial, setCurrentTestimonial] = React.useState(0);

  // Change testimonial every 5 seconds
  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000); // change testimonial every 5000ms (5 seconds)
    return () => clearInterval(intervalId);
  }, [testimonials.length]);

  return (
    <>
      {/* Global and keyframe styles */}
      <style>
        {`
          /* Remove default margin, padding on html/body */
          html, body {
            margin: 0;
            padding: 0;
            height: 100%;
            background-color: #000; /* Ensure full black background */
            color: #fff;
            overflow: auto;
            box-sizing: border-box;
          }
          *, *:before, *:after {
            box-sizing: inherit;
          }
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }
        `}
      </style>

      <div style={styles.pageWrapper}>
        {/* Navigation Bar */}
        <nav style={styles.navbar}>
          <div style={styles.navLeft}>
            <span style={styles.logo}>EduMatch</span>
          </div>
          <div style={styles.navRight}>
            <a href="#story" style={styles.navLink}>Product and Services</a>
            <a href="#news" style={styles.navLink}>Testimonials</a>
            <a href="#login" style={styles.navLink}>Contact</a>
            <a href="#signup" style={styles.navLink}>Login</a>
          </div>
        </nav>

        {/* Hero Section */}
        <section style={styles.heroSection}>
          <img src={EduMatchLogo} alt="EduMatch" style={styles.logoImage} />
          {/* Moved the button above the text and center aligned it */}
          <button style={styles.heroButton} onClick={() => navigate("/SelectOption")}>
            Get started
          </button>
          <div style={styles.dynamicTextBox}>
            <p style={styles.heroSubtitle}>
              A smart, ML-powered tutor-student connector with killer UI and instant market appeal.
            </p>
          </div>
        </section>

        {/* Testimonial Section: Display one testimonial at a time */}
        <section style={styles.testimonialSection}>
          <div style={styles.testimonialItem}>
            <p style={styles.testimonialText}>
              “{testimonials[currentTestimonial].quote}”
            </p>
            <p style={styles.testimonialAuthor}>
              - {testimonials[currentTestimonial].author}
            </p>
          </div>
        </section>
      </div>
    </>
  );
}

const styles = {
  pageWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    width: "100vw",
    minHeight: "100vh",
    backgroundColor: "#000",
    overflowY: "auto",
  },
  navbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "1rem 2rem",
    borderBottom: "1px solid #333",
  },
  navLeft: {
    display: "flex",
    alignItems: "center",
  },
  logo: {
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  navRight: {
    display: "flex",
    alignItems: "center",
  },
  navLink: {
    marginLeft: "1.5rem",
    textDecoration: "none",
    color: "#ccc",
    fontSize: "1rem",
    transition: "color 0.2s",
  },
  heroSection: {
    textAlign: "center",
    padding: "4rem 2rem",
    margin: 0,
  },
  dynamicTextBox: {
    maxWidth: "700px",
    margin: "0 auto",
    textAlign: "center",
  },
  heroSubtitle: {
    fontSize: "1.1rem",
    lineHeight: "1.6",
    color: "#ddd",
    margin: 0,
  },
  heroButton: {
    backgroundColor: "#5c6bc0",
    color: "#fff",
    border: "none",
    padding: "0.8rem 1.5rem",
    borderRadius: "10px",
    fontSize: "1rem",
    cursor: "pointer",
    display: "block",     // Makes the button a block element
    margin: "0 auto 1rem", // Centers the button and adds spacing below it
  },
  logoImage: {
    width: "900px",
    height: "auto",
    marginBottom: "1rem",
  },
  testimonialSection: {
    padding: "1rem 2rem",
    margin: "0 auto",
    width: "80%",
    maxWidth: "1000px",
    backgroundColor: "#222",
    borderRadius: "8px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "130px",
  },
  testimonialItem: {
    textAlign: "center",
  },
  testimonialText: {
    fontStyle: "italic",
    fontSize: "1.4rem",
    lineHeight: "1.6",
    marginBottom: "0.5rem",
    color: "#fff",
    margin: 0,
  },
  testimonialAuthor: {
    fontSize: "1.2rem",
    color: "#ccc",
    margin: 0,
  },
};

export default LandingPage;
