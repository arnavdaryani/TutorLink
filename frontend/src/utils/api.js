export const fetchCourses = async () => {
    try {
      const response = await fetch("https://api.purdue.io/odata/Courses");
      const data = await response.json();
      return data.value; // Purdue API returns course data inside `value`
    } catch (error) {
      console.error("Error fetching courses:", error);
      return [];
    }
  };
  