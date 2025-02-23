import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import the hook
import Navbar from "./navbar"; // Adjust the path if necessary

const StudentQuestionPortal = () => {
  const navigate = useNavigate(); // Create a navigate instance

  // Define the steps for the multi-step form.
  const steps = [
    {
      question: "What is your major or intended field of study?",
      name: "major",
      type: "radio",
      options: [
        "Computer Science",
        "Engineering (Mechanical, Electrical, Civil, etc.)",
        "Business (Finance, Marketing, Supply Chain, etc.)",
        "Biology/Chemistry/Physics",
        "Mathematics/Statistics",
        "Social Sciences (Psychology, Political Science, etc.)",
        "Other",
      ],
    },
    {
      question:
        "What Purdue courses do you need tutoring for? (Select all that apply)",
      name: "courses",
      type: "checkbox",
      options: [
        "CS 180 (Problem Solving & Object-Oriented Programming)",
        "MA 161/162/261 (Calculus I/II/III)",
        "PHYS 172 (Modern Mechanics)",
        "CHM 115/116 (General Chemistry)",
        "STAT 350/511 (Probability & Statistics)",
        "ECE 201/202 (Electrical Engineering Core)",
        "MGMT 200 (Intro to Accounting)",
        "Other",
      ],
    },
    {
      question: "How do you prefer to receive tutoring?",
      name: "tutoringPreference",
      type: "radio",
      options: [
        "One-on-One (Personalized help)",
        "Small Group (2-5 students)",
        "Large Group (6+ students)",
        "No preference",
      ],
    },
    {
      question: "When starting a new topic, how do you prefer to learn?",
      name: "learningStyle",
      type: "radio",
      options: [
        "Watch videos or visual explanations.",
        "Break learning material into smaller, logical step.",
        "Read textbooks or articles.",
        "Try hands-on activities or experiments.",
      ],
    },
    {
      question: "What is your budget per hour for tutoring?",
      name: "budget",
      type: "radio",
      options: [
        "$10 - $20 (Affordable, peer tutoring)",
        "$20 - $40 (Experienced students, TAs)",
        "$40+ (Professional tutors, professors)",
      ],
    },
    {
      question: "What are your main goals for tutoring?",
      name: "goals",
      type: "checkbox",
      options: [
        "Improve grades",
        "Prepare for an exam (Midterms, Finals, GRE, GMAT)",
        "Strengthen understanding of the subject",
        "Get help with homework/assignments",
        "Other",
      ],
    },
    {
      question: "Preferred meeting format?",
      name: "meetingFormat",
      type: "radio",
      options: [
        "In-Person (Purdue Libraries, Classrooms, Dorms)",
        "Online (Zoom, Teams, Discord)",
        "No preference",
      ],
    },
    {
      question: "What times are you available for tutoring?",
      name: "availability",
      type: "checkbox",
      options: [
        "Morning (8 AM - 12 PM)",
        "Afternoon (12 PM - 5 PM)",
        "Evening (5 PM - 10 PM)",
        "Late Night (10 PM - 2 AM)",
      ],
    },
    {
      question:
        "Do you prefer tutors who have taken your specific Purdue course?",
      name: "courseSpecificTutor",
      type: "radio",
      options: [
        "Yes, I want someone who has taken my class at Purdue.",
        "No, as long as they are knowledgeable in the subject.",
      ],
    },
    {
      question: "Would you like tutors who provide structured lesson plans?",
      name: "lessonPlanPreference",
      type: "radio",
      options: [
        "Yes, I prefer structured lessons with practice problems.",
        "No, I prefer open Q&A sessions.",
        "A mix of both.",
      ],
    },
    // --- Additional Questions ---
    {
      question:
        "How do you handle difficult concepts in your coursework?",
      name: "difficultConcepts",
      type: "radio",
      options: [
        "Break them down into smaller parts and study step-by-step.",
        "Discuss them with peers or tutors to gain clarity.",
        "Look for real-world examples to understand better.",
        "Experiment with different approaches until it clicks.",
      ],
    },
    {
      question: "What motivates you to study?",
      name: "studyMotivation",
      type: "radio",
      options: [
        "Achieving high grades and academic success.",
        "Understanding the subject deeply for personal growth.",
        "Applying knowledge to solve real-world problems.",
        "Enjoying the learning process itself.",
      ],
    },
    {
      question: "How do you prefer to receive feedback on your work?",
      name: "feedbackPreference",
      type: "radio",
      options: [
        "Detailed written comments with clear suggestions.",
        "One-on-one discussions to explain improvements.",
        "Visual examples or demonstrations of better approaches.",
        "Immediate feedback during practice sessions.",
      ],
    },
    {
      question: "What type of tutor do you think would help you the most?",
      name: "tutorType",
      type: "radio",
      options: [
        "Someone who explains concepts clearly and patiently.",
        "Someone who challenges me to think critically.",
        "Someone who uses real-world examples to teach.",
        "Someone who encourages me to explore topics independently.",
      ],
    },
  ];

  // State for form data and current step
  const [formData, setFormData] = useState({
    major: "",
    courses: [],
    tutoringPreference: "",
    learningStyle: "",
    budget: "",
    goals: [],
    meetingFormat: "",
    availability: [],
    courseSpecificTutor: "",
    lessonPlanPreference: "",
    // New fields for additional questions:
    difficultConcepts: "",
    studyMotivation: "",
    feedbackPreference: "",
    tutorType: "",
  });
  const [currentStep, setCurrentStep] = useState(0);

  // Hover state for highlighting options on mouse enter/leave
  const [hoveredOption, setHoveredOption] = useState(null);

  useEffect(() => {
    // Reset hovered option whenever we move to a new step
    setHoveredOption(null);
  }, [currentStep]);

  // Handle input changes for both radio and checkbox types
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked
          ? [...prev[name], value]
          : prev[name].filter((item) => item !== value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Validate current step answer before moving to the next step
  const handleNext = (e) => {
    e.preventDefault();
    const fieldName = steps[currentStep].name;
    const value = formData[fieldName];
    const isAnswered = Array.isArray(value) ? value.length > 0 : value !== "";
    if (!isAnswered) {
      alert("Please answer the question before proceeding.");
      return;
    }
    setCurrentStep((prev) => prev + 1);
  };

  // Go to the previous step
  const handlePrevious = (e) => {
    e.preventDefault();
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  // On final submission, log data and redirect to the matched tutors page
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    alert("Form submitted! Check console for details.");
    navigate("/MatchedTutorsPage");
  };

  // Calculate progress based on the current step (1-indexed)
  const progressPercent = ((currentStep + 1) / steps.length) * 100;

  // ----- STYLES -----
  // Global page container (everything except the Navbar)
  const pageContainerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100vw",
    height: "calc(100vh - 60px)", // subtract navbar height if needed
    backgroundColor: "#000",
    fontFamily: "Inter, sans-serif",
    overflow: "hidden", // Disable scrolling on the entire page
    textAlign: "center",
  };

  // Outer container for the entire form (including progress bar)
  const formOuterStyle = {
    width: "100%",
    maxWidth: "600px",
    padding: "20px",
    boxSizing: "border-box",
    margin: "0 auto",
  };

  // Progress bar container
  const progressContainerStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: "9999px",
    height: "8px",
    marginBottom: "30px",
    overflow: "hidden",
  };

  // Progress bar fill
  const progressBarStyle = {
    height: "100%",
    width: `${progressPercent}%`,
    backgroundColor: "#7842E5",
    transition: "width 0.3s ease-in-out",
    borderRadius: "9999px",
  };

  // The “glass-like” container (fixed size)
  const glassContainerStyle = {
    width: "100%",
    height: "510px",
    backgroundColor: "rgba(255, 255, 255, 0.07)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
    borderRadius: "16px",
    marginBottom: "20px",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "30px 20px", // Increased padding to prevent text cutoff
    overflow: "hidden", // Prevent scrolling within the glass container
    animation: "fadeIn 0.5s ease-out", // Added animation
  };

  const getOptionStyle = (optionValue, isChecked) => ({
    display: "block",
    margin: "10px 0",
    padding: "12px 15px",
    borderRadius: "8px",
    backgroundColor:
      hoveredOption === optionValue || isChecked
        ? "#7842E5"
        : "rgba(0,0,0,0.2)",
    color:
      hoveredOption === optionValue || isChecked ? "#fff" : "#ccc",
    cursor: "pointer",
    transition: "background-color 0.2s, color 0.2s",
    textAlign: "center",
  });

  const buttonContainerStyle = {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  };

  const buttonStyle = {
    padding: "10px 20px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#7842E5",
    color: "#fff",
    fontSize: "16px",
  };

  // Global keyframes added for the fade-in animation.
  const globalStyle = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateX(20px); }
      to { opacity: 1; transform: translateX(0); }
    }
  `;

  const renderStep = () => {
    const step = steps[currentStep];
    return (
      <div key={currentStep} style={glassContainerStyle}>
        <h3 style={{ marginBottom: "20px", textAlign: "center" }}>
          {step.question}
        </h3>
        {step.options.map((option) => {
          const isChecked =
            step.type === "radio"
              ? formData[step.name] === option
              : formData[step.name].includes(option);

          return (
            <label
              key={option}
              style={getOptionStyle(option, isChecked)}
              onMouseEnter={() => setHoveredOption(option)}
              onMouseLeave={() => setHoveredOption(null)}
            >
              <input
                type={step.type}
                name={step.name}
                value={option}
                onChange={handleChange}
                required={step.type === "radio"}
                checked={isChecked}
                style={{ display: "none" }}
              />
              {option}
            </label>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <Navbar />
      {/* Global styles to ensure no scrolling */}
      <style>
        {`
          html, body {
            margin: 0;
            padding: 0;
            overflow: hidden;
            width: 100%;
            height: 100%;
            background-color: #000;
          }
          ${globalStyle}
        `}
      </style>
      <div style={pageContainerStyle}>
        <div style={formOuterStyle}>
          {/* Progress Bar */}
          <div style={progressContainerStyle}>
            <div style={progressBarStyle}></div>
          </div>
          {/* The form */}
          <form onSubmit={handleSubmit}>
            <h1 style={{ textAlign: "center", color: "#fff", marginBottom: "20px" }}>
              Student Tutoring Request Form
            </h1>
            {renderStep()}
            {/* Buttons: Back / Next / Submit */}
            <div style={buttonContainerStyle}>
              {currentStep > 0 ? (
                <button type="button" onClick={handlePrevious} style={buttonStyle}>
                  Back
                </button>
              ) : (
                <div />
              )}
              {currentStep < steps.length - 1 ? (
                <button type="button" onClick={handleNext} style={buttonStyle}>
                  Next
                </button>
              ) : (
                <button type="submit" style={buttonStyle}>
                  Submit
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default StudentQuestionPortal;
