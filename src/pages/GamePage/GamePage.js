import { useState, useEffect } from 'react';

import { getRandomCourse } from '../../services/game';
import LevelSelector from '../../components/LevelSelector';
import ResultDisplay from '../../components/ResultDisplay';

export const GamePage = ({courses, departments, guessDepartment}) => {
  const [numCorrect, setNumCorrect] = useState(0)
  const [numIncorrect, setNumIncorrect] = useState(0)
  const [currentCourse, setCurrentCourse] = useState({})
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    setCurrentCourse(getRandomCourse(courses))
  }, [courses])

  const nextRoundCallback = (isCorrect) => {
    if (isCorrect) {
      setNumCorrect(numCorrect + 1)
    } else {
      setNumIncorrect(numIncorrect + 1)
    }
    setCurrentCourse(getRandomCourse(courses))
    setSelected(null)
  }

  return (
    <>
      <div>
        Correct: {numCorrect}
      </div>
      <div>
        Incorrect: {numIncorrect}
      </div>
      <div style={{display: "flex", flexDirection: "column", alignItems: 'center'}}>
      
      <h1>Course Name:</h1>
      
      <div>
        {currentCourse.name}
      </div>
      
      {selected ? <ResultDisplay course={currentCourse} selected={selected} nextRoundCallback={nextRoundCallback} /> : <LevelSelector guessDepartment={guessDepartment} departments={departments} selectCallback={(level, faculty) => setSelected({level: level, faculty: faculty})}/>}

      </div>
    </>
  )
}