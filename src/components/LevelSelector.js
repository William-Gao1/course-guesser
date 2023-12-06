import { useState } from "react";

import { validFaculties } from "../services/get_courses";
export default function LevelSelector({selectCallback}) {
  const [level, setLevel] = useState(1)
  const [faculty, setFaculty] = useState(validFaculties[0])
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
        <select onChange={(facultyChange) => setFaculty(facultyChange.target.value)}>
          {validFaculties.map((faculty) => <option key={faculty} value={faculty}>{faculty}</option>)}
        </select>
        <button onClick={() => selectCallback(level, faculty)}>Submit</button>
      </div>
      
    </div>
  );
  
}

