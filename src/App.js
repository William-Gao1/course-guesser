import './App.css';
import { useState, useEffect } from 'react'
import GamePage from './pages/GamePage';
import HomePage from './pages/HomePage';
import { getCourses } from './services/get_courses';

function App() {
  const [courses, setCourses] = useState([])
  const [selectedDepartments, setSelectedDepartments] = useState([])
  const [guessDepartment, setGuessDepartment] = useState(false)

  const gameStartCallback = (departments, guessDepartment) => {
    setSelectedDepartments(departments)
    setGuessDepartment(guessDepartment)
    console.log(guessDepartment)
    setCourses(courses.filter((course) => {
      return departments.includes(course.faculty)
    }))
  }

  useEffect(() => {
    getCourses().then((data) => {
      setCourses(data)
    })
  }, [])

  if (courses.length === 0) {
    return <p>Loading...</p>
  }

  return selectedDepartments.length > 0 ?  <GamePage courses={courses} departments={selectedDepartments} guessDepartment={guessDepartment} /> : <HomePage gameStartCallback={gameStartCallback}/>
}

export default App;
