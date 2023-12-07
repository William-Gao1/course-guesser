import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Chip from '@mui/material/Chip';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import FormControl from '@mui/material/FormControl';
import Alert from '@mui/material/Alert';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import departments from './resources/departments.json'
import { Button } from '@mui/material';


function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function HomePage({gameStartCallback}) {
  const theme = useTheme();

  const [selectedDepartments, setSelectedDepartments] = useState([])
  const [error, setError] = useState("")
  const [guessDepartment, setGuessDepartment] = useState(false)

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedDepartments(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleStartGame = () => {
    if (selectedDepartments.length < 2) {
      setError("Must select at least two departments")
    } else {
      setError("")
      gameStartCallback(selectedDepartments, guessDepartment)
    }
  }

  return (
    <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
      <h1 style={{marginBottom: "1em"}}>Select Departments</h1>
      
        <FormControl sx={{ m: 1, width: 300 }} style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
        <InputLabel id="multiple-checkbox-label">Department</InputLabel>
        <Select 
          multiple
          input={<OutlinedInput label="Department"/> }
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          value={selectedDepartments}
          onChange={handleChange}
          style={{minWidth: '20em', marginBottom: "2em"}}
        >
          {departments.map(({code, name}) => (
            <MenuItem
              key={name}
              value={code}
              style={getStyles(name, selectedDepartments, theme)}
            >
              <Checkbox checked={selectedDepartments.indexOf(code) > -1} />
              <ListItemText primary={`${code} - ${name}`} />
              
            </MenuItem>
          ))}
        </Select>
        <div style={{display:"flex", justifyContent: "space-around", width: "100%", marginBottom: "2em"}}>
          <Button variant="outlined" onClick={() => setSelectedDepartments(departments.map(({code}) => code))}>All</Button>
        </div>
        <ToggleButtonGroup
          value={guessDepartment}
          exclusive
          onChange={() => setGuessDepartment(!guessDepartment)}
          aria-label="text alignment"
          style={{marginBottom: "2em"}}
        >
          <ToggleButton value={false} aria-label="left aligned">
            Guess Course Level
          </ToggleButton>
          <ToggleButton value={true} aria-label="centered">
            Guess Department and Course Level
          </ToggleButton>
        </ToggleButtonGroup>
        <Button variant="contained" onClick={handleStartGame} style={{marginBottom: "2em"}}>Start</Button>
        {error ? <Alert severity="error">{error}</Alert> : null}
      </FormControl>
    </div>
  )
}