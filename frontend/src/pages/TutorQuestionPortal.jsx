import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import the hook
import Navbar from "./navbar"; // Adjust the path if necessary

const TutorQuestionPortal = () => {
  const navigate = useNavigate(); // Create a navigate instance

  // Define the steps for the multi-step form for tutors.
  const steps = [
    {
      question: "What subject area do you primarily tutor?",
      name: "subjectArea",
      type: "radio",
      options: [
        "Mathematics",
        "Science (Biology, Chemistry, Physics)",
        "Computer Science",
        "English/Language Arts",
        "Social Sciences",
        "Business, Finance, Economics", 
        "Other",
      ],
    },
    {
      question:
        "Which subjects or topics are you most passionate about teaching? (Select all that apply)",
      name: "passionateSubjects",
      type: "checkbox",
      options: [
        "Math (e.g., Calculus, Algebra)",
        "Science (e.g., Physics, Chemistry)",
        "Engineering (e.g., AAE, ME)",
        "Computer Science (e.g., Programming, Algorithms)",
        "Humanities (e.g., Writing, History)",
        "Test Prep (e.g., SAT, GRE)",
        "Other",
      ],
    },
    {
      question: "Which Purdue courses can you tutor? (Select all that apply)",
      name: "courses",
      type: "checkbox",
      options: [
        "CS 180 (Problem Solving & OOP)",
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
      question: "What is your preferred tutoring method?",
      name: "tutoringMethod",
      type: "radio",
      options: [
        "One-on-One (Personalized sessions)",
        "Small Group (2-5 students)",
        "Large Group (6+ students)",
        "No preference",
      ],
    },
    {
      question: "What is your experience level?",
      name: "experience",
      type: "radio",
      options: [
        "Undergraduate Peer Tutor",
        "TA or Course Assistant",
        "Experienced Private Tutor",
        "Professional Instructor",
      ],
    },
    {
      question: "Preferred tutoring format?",
      name: "meetingFormat",
      type: "radio",
      options: [
        "In-Person (On campus or local venues)",
        "Online (Zoom, Teams, Discord)",
        "Hybrid",
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
      question: "Would you like to offer structured lesson plans?",
      name: "lessonPlanOffer",
      type: "radio",
      options: [
        "Yes, I provide detailed lesson plans.",
        "No, I prefer flexible sessions.",
        "Sometimes, depending on the student.",
      ],
    },
    {
      question: "How do you prefer to explain new concepts to students?",
      name: "explainConcepts",
      type: "radio",
      options: [
        "Use visual aids like diagrams, charts, or videos.",
        "Break concepts into smaller, logical steps.",
        "Relate concepts to real-world examples or applications.",
        "Encourage students to discover answers through guided questions.",
      ],
    },
    {
      question: "What’s your approach to helping a struggling student?",
      name: "approachStrugglingStudent",
      type: "radio",
      options: [
        "Build their confidence by starting with easier problems.",
        "Give the student clarity by trying to explain the content.",
        "Use hands-on activities to make the topic more engaging.",
        "Identify their specific challenges and tailor explanations.",
      ],
    },
    {
      question: "What motivates you to teach?",
      name: "teachMotivation",
      type: "radio",
      options: [
        "The satisfaction of helping others succeed academically.",
        "The joy of seeing someone grasp a concept for personal growth.",
        "The challenge of breaking down complex ideas to solve real-world problems.",
        "The enjoyment of the teaching process itself.",
      ],
    },
    {
      question: "What’s your philosophy on giving feedback?",
      name: "feedbackPhilosophy",
      type: "radio",
      options: [
        "Provide constructive criticism with clear improvement steps.",
        "Focus on positive reinforcement to build confidence.",
        "Use examples to show what good work looks like.",
        "Encourage self-assessment and reflection.",
      ],
    },
    {
      question: "How do you prefer to structure your tutoring sessions?",
      name: "sessionStructure",
      type: "radio",
      options: [
        "Follow a pre-planned agenda with clear objectives.",
        "Encourage open discussions and questions.",
        "Focus on problem-solving and practice exercises.",
        "Adapt based on the student’s needs during the session.",
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
  ];

  // State for form data and current step
  const [formData, setFormData] = useState({
    subjectArea: "",
    courses: [],
    tutoringMethod: "",
    teachingStyle: "",
    experience: "",
    meetingFormat: "",
    availability: [],
    lessonPlanOffer: "",
    explainConcepts: "",
    approachStrugglingStudent: "",
    teachMotivation: "",
    feedbackPhilosophy: "",
    sessionStructure: "",
    studentTypePreference: "",
    passionateSubjects: [],
    budget: "",
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

    // Navigate to the matched tutors page
    navigate("/MatchedStudentPage");
  };

  // Calculate progress based on the current step (1-indexed)
  const progressPercent = ((currentStep + 1) / steps.length) * 100;

  // ----- STYLES -----
  const pageContainerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100vw",
    height: "100vh",
    backgroundColor: "#000",
    fontFamily: "Inter, sans-serif",
    overflow: "hidden", // Disable scrolling on the entire page
  };

  const formOuterStyle = {
    width: "100%",
    maxWidth: "600px",
    padding: "20px",
    boxSizing: "border-box",
  };

  const progressContainerStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: "9999px",
    height: "8px",
    marginBottom: "30px",
    overflow: "hidden",
  };

  const progressBarStyle = {
    height: "100%",
    width: `${progressPercent}%`,
    backgroundColor: "#4caf50",
    transition: "width 0.3s ease-in-out",
    borderRadius: "9999px",
  };

  const glassContainerStyle = {
    width: "100%",
    height: "510px", // Fixed height (increase if necessary)
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
    padding: "20px",
    overflow: "hidden", // Disable scrolling within the glass container
    animation: "fadeIn 0.5s ease-out", // Fade-in animation
    marginLeft: "-20px",
  };

  const getOptionStyle = (optionValue, isChecked) => ({
    display: "block",
    margin: "10px 0",
    padding: "12px 15px",
    borderRadius: "8px",
    backgroundColor:
      hoveredOption === optionValue || isChecked ? "#2196F3" : "rgba(0,0,0,0.2)",
    color: hoveredOption === optionValue || isChecked ? "#fff" : "#ccc",
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
    backgroundColor: "#2196F3",
    color: "#fff",
    fontSize: "16px",
  };

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
          @keyframes fadeIn {
            from { opacity: 0; transform: translateX(20px); }
            to { opacity: 1; transform: translateX(0); }
          }
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
              Tutor Registration Form
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

export default TutorQuestionPortal;