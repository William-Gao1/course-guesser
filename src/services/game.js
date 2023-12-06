export const getRandomCourse = (courses) => {
  return courses[Math.floor(Math.random()*courses.length)]
}

export const getCourseFaculty = (course) => {
  const matchResult = course.code.match(/^[^\d]*/);

  if (!matchResult) {
    // No match found, return an empty string or handle accordingly
    return '';
  }

  // Extract the matched characters
  const charactersBeforeFirstDigit = matchResult[0];

  return charactersBeforeFirstDigit.toUpperCase();
}

export const getCourseCode = (course) => {
  // Use a regular expression to find all sequences of digits
  const numbers = course.code.match(/\d+/g);

  if (!numbers) {
    // No numbers found in the string
    return null;
  }

  // Find the longest number among the matched sequences
  const longestNumber = numbers.reduce((longest, current) => {
    return current.length > longest.length ? current : longest;
  }, '');

  return longestNumber;
  
}