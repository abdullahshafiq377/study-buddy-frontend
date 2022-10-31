import './App.css';
import NavBar from './components/common/navbar';
import  React  from 'react';
import PrimaryButton from './components/common/primaryButton';
import AttendanceToggle from './components/attendanceToggle';
import InputField from './components/common/inputField';

function App() {
  return (
    <React.Fragment>
    <NavBar/>
    <AttendanceToggle/>
    <InputField/>
    </React.Fragment>
  );
}

export default App;
