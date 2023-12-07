import { useState } from "react";

export default function LevelSelector({selectCallback, departments, guessDepartment}) {
  const [level, setLevel] = useState(1)
  const [faculty, setFaculty] = useState(departments[0])
  // Array of button labels from 1 to 5
  const buttonLabels = [1, 2, 3, 4, 5];

  return (
    <div style={{}}>
      <h2>Guess Course Level and Faculty</h2>
      {/* Map through the array of button labels to create buttons */}
      <div style={{display: "flex", justifyContent: "space-evenly"}}>
        <select onChange={(levelChange) => setLevel(levelChange.target.value)}>
          {buttonLabels.map((level) => <option key={level} value={level}>{level}</option>)}
        </select>
        {
          guessDepartment ? (
            <select onChange={(facultyChange) => setFaculty(facultyChange.target.value)}>
              {departments.map((faculty) => <option key={faculty} value={faculty}>{faculty}</option>)}
            </select>
          ) : null
        }
        
        <button onClick={() => selectCallback(level, faculty)}>Submit</button>
      </div>
      
    </div>
  );
  
}

