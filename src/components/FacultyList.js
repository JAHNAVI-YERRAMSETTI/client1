import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FacultyList.css';

function FacultyList() {
  const [faculty, setFaculty] = useState([]);
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [position, setPosition] = useState('');
  const [editingId, setEditingId] = useState(null);

  const API_URL = `http://localhost:5000/api/faculty`;

  useEffect(() => {
    fetchFaculty();
  }, []);

  const fetchFaculty = async () => {
    try {
      const response = await axios.get(API_URL);
      setFaculty(response.data);
      console.log("Fetched faculty data:", response.data);
    } catch (error) {
      console.error("Error fetching faculty:", error);
    }
  };

  const saveFaculty = async () => {
    try {
      const facultyData = { name, department, position };
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, facultyData);
        setEditingId(null);
      } else {
        await axios.post(API_URL, facultyData);
      }
      setName(''); setDepartment(''); setPosition('');
      await fetchFaculty();
      console.log("Faculty saved:", facultyData);
    } catch (error) {
      console.error("Error saving faculty:", error);
    }
  };

  const deleteFaculty = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchFaculty();
    } catch (error) {
      console.error("Error deleting faculty:", error);
    }
  };

  const editFaculty = (facultyMember) => {
    setEditingId(facultyMember._id);
    setName(facultyMember.name);
    setDepartment(facultyMember.department);
    setPosition(facultyMember.position);
  };

  return (
    <div className="faculty-list">
      <h2>Faculty List</h2>
      <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input placeholder="Department" value={department} onChange={(e) => setDepartment(e.target.value)} />
      <input placeholder="Position" value={position} onChange={(e) => setPosition(e.target.value)} />
      <button onClick={saveFaculty}>{editingId ? "Update Faculty" : "Add Faculty"}</button>
      
      <ul>
        {faculty.map(facultyMember => (
          <li key={facultyMember._id} className="faculty-card">
            {facultyMember.name} - Department: {facultyMember.department}, Position: {facultyMember.position}
            <button onClick={() => editFaculty(facultyMember)}>Edit</button>
            <button onClick={() => deleteFaculty(facultyMember._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FacultyList;
