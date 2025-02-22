import { useState, useEffect } from "react";
import { fetchCourses } from "../utils/api";

const CourseDropdown = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");

  useEffect(() => {
    const loadCourses = async () => {
      const courseList = await fetchCourses();
      setCourses(courseList);
    };
    loadCourses();
  }, []);

  return (
    <div>
      <label htmlFor="course">Select a Course:</label>
      <select
        id="course"
        value={selectedCourse}
        onChange={(e) => setSelectedCourse(e.target.value)}
      >
        <option value="">-- Select a Course --</option>
        {courses.map((course) => (
          <option key={course.Id} value={course.Number}>
            {course.Number} - {course.Title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CourseDropdown;
