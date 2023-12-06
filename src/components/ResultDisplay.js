
export default function ResultDisplay({course, selected, nextRoundCallback}) {

  const isCorrect = parseInt(selected.level, 10) === course.courseLevel && selected.faculty === course.faculty
  return (
    <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start"}}>
      <h2 style={{textAlign: "center"}}>{isCorrect ? 'Correct' : 'Wrong'}</h2>
      <p style={{textAlign: "center"}}>{course.code.toUpperCase()}</p>
      <p style={{textAlign: "center"}}>{course.description}</p>
      <button onClick={() => nextRoundCallback(isCorrect)}>Next</button>
    </div>
  );
  
}

