/* eslint-disable react/jsx-no-undef */
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CrteateEmplyee from './pages/Create Employee'; // Optional: separate Employee List page
import EmployeeList from './pages/Employee List';
import EmployeeEdit from './pages/Employee Edit';
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />           {/* Login page */}
                <Route path="/dashboard" element={<Dashboard />} /> {/* Dashboard */}
                <Route path="/createEmployee" element={<CrteateEmplyee />} /> {/* Create Emplouee */}
                <Route path="/Emplyoyee" element={<EmployeeList />} /> 
                <Route path="/EmployeeEdit" element={<EmployeeEdit/>} />
            </Routes>
        </Router>
    );
}

export default App;
