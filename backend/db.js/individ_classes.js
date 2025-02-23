import { readFile, writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// Get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function flattenCourses() {
  // Define file paths
  const inputFilePath = path.join(__dirname, "classesBySubject.json");
  const outputFilePath = path.join(__dirname, "individualClasses.json");

  try {
    // Read the input JSON file
    const data = await readFile(inputFilePath, "utf8");
    const subjects = JSON.parse(data);

    // Flatten the courses into strings like "AAE 20000", "AAE 20300", etc.
    const courseList = Array.isArray(subjects)
      ? subjects.reduce((acc, subject) => {
          if (subject.classes && Array.isArray(subject.classes)) {
            const courses = subject.classes.map(
              (course) => `${subject.Abbreviation} ${course.Number}`
            );
            return acc.concat(courses);
          }
          return acc;
        }, [])
      : [];

    // Write the flattened array to the output file with pretty formatting
    await writeFile(outputFilePath, JSON.stringify(courseList, null, 2));
    console.log(`Output file created successfully at: ${outputFilePath}`);
  } catch (error) {
    console.error("Error processing files:", error);
  }
}

flattenCourses();
