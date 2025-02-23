import axios from 'axios';
import fs from 'fs/promises'; // Import fs module for file handling

// Get list of subjects
export const getSubjects = async () => {
    try {
        const response = await axios.get('https://api.purdue.io/odata/Subjects?$orderby=Abbreviation asc');
        return response.data.value;
    } catch (error) {
        console.error(error);
    }
};

// Get list of classes
export const getClasses = async () => {
    try {
        const response = await axios.get('https://api.purdue.io/odata/Courses?$orderby=Number asc');
        return response.data.value;
    } catch (error) {
        console.error(error);
    }
};

// Merge lists and store unique course numbers
export const getClassesBySubject = async () => {
    const subjects = await getSubjects();
    const classes = await getClasses();

    const classesBySubject = subjects.map(subject => {
        return {
            ...subject,
            classes: [...new Set(
                classes
                    .filter(course => course.SubjectId === subject.Id)
            )]
        };
    });

    try {
        await fs.writeFile('classesBySubject.json', JSON.stringify(classesBySubject, null, 2));
        console.log('Data saved to classesBySubject.json');
    } catch (error) {
        console.error('Error saving data:', error);
    }

    return classesBySubject;
};

getClassesBySubject();