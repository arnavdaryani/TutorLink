import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "./navbar"; // Adjust path if necessary

const StudentQuestionPortal = () => {
  const navigate = useNavigate();
  const { user } = useAuth0();

  // Multi-step form configuration
  const steps = [
    {
      question: "Are you a Purdue student or a high school student?",
      name: "isPurdue",
      type: "radio",
      options: ["Purdue Student", "High School Student"],
    },
    {
      question: "What is your major or intended field of study?",
      name: "major",
      type: "text",
    },
    {
      question: "What is your grade level?",
      name: "gradeLevel",
      type: "radio",
      options: ["High School", "Freshman", "Sophomore", "Junior", "Senior", "Other"],
    },
    {
      question:
        "What Purdue courses do you need tutoring for? (Select all that apply)",
      name: "classesTeaching",
      type: "autocomplete", // Simple text input for courses
      options: [],
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
        "Break learning material into smaller, logical steps.",
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
    {
      question: "How do you handle difficult concepts in your coursework?",
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

  // Form state for the additional fields
  const [formData, setFormData] = useState({
    isPurdue: "",
    major: "",
    gradeLevel: "",
    classesTeaching: [],
    tutoringPreference: "",
    learningStyle: "",
    budget: "",
    goals: [],
    meetingFormat: "",
    availability: [],
    courseSpecificTutor: "",
    lessonPlanPreference: "",
    difficultConcepts: "",
    studyMotivation: "",
    feedbackPreference: "",
    tutorType: "",
  });

  // For the autocomplete step (simple text input for courses)
  const [courseInput, setCourseInput] = useState("");

  // Multi-step form controls
  const [currentStep, setCurrentStep] = useState(0);
  const [hoveredOption, setHoveredOption] = useState(null);

  // Reset hovered option on step change
  useEffect(() => {
    setHoveredOption(null);
  }, [currentStep]);

  // Helper for option styling
  const getOptionStyle = (optionValue, isChecked) => ({
    display: "block",
    margin: "10px 0",
    padding: "12px 15px",
    borderRadius: "8px",
    backgroundColor:
      hoveredOption === optionValue || isChecked ? "#7842E5" : "rgba(0,0,0,0.2)",
    color:
      hoveredOption === optionValue || isChecked ? "#fff" : "#ccc",
    cursor: "pointer",
    transition: "background-color 0.2s, color 0.2s",
    textAlign: "center",
  });

  // General change handler for inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox" && name !== "classesTeaching") {
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

  // Handle adding a course when Enter is pressed in the autocomplete step
  const handleSelectCourse = (course) => {
    if (!formData.classesTeaching.includes(course)) {
      setFormData((prev) => ({
        ...prev,
        classesTeaching: [...prev.classesTeaching, course],
      }));
    }
    setCourseInput("");
  };

  // Navigation for multi-step form
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

  const handlePrevious = (e) => {
    e.preventDefault();
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  // Final submit: combine Auth0 user data with the form data and send to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Combine Auth user data from context with the form data
    const payload = {
      id: user?.sub, // Use Auth0's unique sub as id
      name: user?.name,
      email: user?.email,
      avatarUrl: user?.picture,
      isPurdue: true,

      ...formData,
    };

    try {
      const response = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies if needed
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      console.log("User created/updated:", data);
      // Navigate to next page after submission
      navigate("/MatchedTutorsPage");
    } catch (err) {
      console.error("Error sending user data:", err);
      alert("There was an error saving your data.");
    }
  };

  // Render the current step based on its type
  const renderStep = () => {
    const step = steps[currentStep];
    if (!step) return null;

    // For the "autocomplete" step
    if (step.type === "autocomplete") {
      return (
        <div key={currentStep} style={glassContainerStyle}>
          <h3 style={{ marginBottom: "20px", textAlign: "center" }}>
            {step.question}
          </h3>
          <input
            type="text"
            value={courseInput}
            onChange={(e) => setCourseInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                const trimmedCourse = courseInput.trim();
                if (trimmedCourse !== "" && !formData.classesTeaching.includes(trimmedCourse)) {
                  handleSelectCourse(trimmedCourse);
                }
              }
            }}
            placeholder="Enter a course code (e.g., AAE 20000)"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              marginBottom: "10px",
            }}
          />
          {formData.classesTeaching.length > 0 && (
            <div style={{ textAlign: "left" }}>
              <strong>Selected Courses:</strong>
              <ul>
                {formData.classesTeaching.map((course) => (
                  <li key={course}>{course}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      );
    }

    // For text input steps
    if (step.type === "text") {
      return (
        <div key={currentStep} style={glassContainerStyle}>
          <h3 style={{ marginBottom: "20px", textAlign: "center" }}>
            {step.question}
          </h3>
          <input
            type="text"
            name={step.name}
            value={formData[step.name] || ""}
            onChange={handleChange}
            placeholder="Enter your response"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
            required
          />
        </div>
      );
    }

    // For radio and checkbox steps
    return (
      <div key={currentStep} style={glassContainerStyle}>
        <h3 style={{ marginBottom: "20px", textAlign: "center" }}>
          {step.question}
        </h3>
        {Array.isArray(step.options) &&
          step.options.map((option) => {
            const isChecked =
              step.type === "radio"
                ? formData[step.name] === option
                : (formData[step.name] || []).includes(option);
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

  // Progress bar calculation
  const progressPercent = ((currentStep + 1) / steps.length) * 100;
  const progressBarStyle = {
    height: "100%",
    width: `${progressPercent}%`,
    backgroundColor: "#7842E5",
    transition: "width 0.3s ease-in-out",
    borderRadius: "9999px",
  };

  return (
    <>
      <Navbar />
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
          <div style={progressContainerStyle}>
            <div style={progressBarStyle}></div>
          </div>
          <form onSubmit={handleSubmit}>
            <h1 style={{ textAlign: "center", color: "#fff", marginBottom: "20px" }}>
              Fill out your tutoring preferences
            </h1>
            {renderStep()}
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

// ----- STYLES -----
const pageContainerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100vw",
  height: "calc(100vh - 60px)",
  backgroundColor: "#000",
  fontFamily: "Inter, sans-serif",
  overflow: "hidden",
  textAlign: "center",
};

const formOuterStyle = {
  width: "100%",
  maxWidth: "600px",
  padding: "20px",
  boxSizing: "border-box",
  margin: "0 auto",
};

const progressContainerStyle = {
  backgroundColor: "rgba(255, 255, 255, 0.2)",
  borderRadius: "9999px",
  height: "8px",
  marginBottom: "30px",
  overflow: "hidden",
};

const glassContainerStyle = {
  width: "100%",
  height: "auto",
  minHeight: "510px",
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
  padding: "30px 20px",
  overflow: "hidden",
  animation: "fadeIn 0.5s ease-out",
};

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

const globalStyle = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateX(20px); }
    to { opacity: 1; transform: translateX(0); }
  }
`;

export default StudentQuestionPortal;
