import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import StudentList from './components/StudentList';
import FacultyList from './components/FacultyList';
import DataUpload from './components/DataUpload';

function App() {
  return (
    <Router>
      <div>
        <h1>Student Management System</h1>
        <NavBar />
        <Routes>
          <Route path="/student" element={<StudentList />} />
          <Route path="/faculty" element={<FacultyList />} />
          <Route path="/upload" element={<DataUpload />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
