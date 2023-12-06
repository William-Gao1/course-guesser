import axios from "axios";

import { getCourseCode, getCourseFaculty } from "./game";

export const validFaculties = ['CS', 'CO', 'CM', 'PMATH', 'AMATH', 'STAT', 'ACTSC', 'AFM', 'ECON']

export const getCourses = async () => {
  const response = await axios.post('https://uwflow.com/graphql', {
    "query": "{course {code id name description}}"
  })

  const courseData = response.data.data.course

  // Create an object to keep track of name occurrences
  const nameOccurrences = {};

  // Count occurrences of each name
  courseData.forEach(obj => {
      nameOccurrences[obj.name] = (nameOccurrences[obj.name] || 0) + 1;
      obj.number = getCourseCode(obj) || "0"
      obj.number = parseInt(obj.number, 10)
      obj.faculty = getCourseFaculty(obj)
      obj.courseLevel = Math.floor(obj.number / 100);
      obj.courseLevel = obj.courseLevel > 5 ? 5 : obj.courseLevel
  });

  // Filter the array to keep only objects with unique names
  const filteredArray = courseData.filter(obj => {
    if (nameOccurrences[obj.name] !== 1) {
      // not unique name
      return false
    }
    if (obj.number < 100 || obj.number >= 1000) {
      // not valid course code
      return false
    }
    if (!validFaculties.includes(obj.faculty)) {
      return false
    }
    return true
  });

  return filteredArray;
}