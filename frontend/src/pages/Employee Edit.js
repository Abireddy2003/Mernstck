import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EmployeeEdit.css";

const EmployeeEdit = ({ employeeId }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNo: "",
    designation: "",
    gender: "",
    courses: [],
    image: null,
  });
  const [error, setError] = useState("");
  const [isDuplicateEmail, setIsDuplicateEmail] = useState(false);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/employees/${employeeId}`
        );
        setFormData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEmployeeData();
  }, [employeeId]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateMobile = (mobileNo) => {
    const mobileRegex = /^\d+$/;
    return mobileRegex.test(mobileNo);
  };

  const checkDuplicateEmail = async (email) => {
    // Dummy check for email duplication; replace with actual API call if needed
    const response = await axios.get("http://localhost:5000/api/employees");
    const isDuplicate = response.data.some(
      (emp) => emp.email === email && emp.id !== employeeId
    );
    setIsDuplicateEmail(isDuplicate);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    if (name === "email") {
      checkDuplicateEmail(value);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      setFormData((prevData) => ({ ...prevData, image: file }));
      setError("");
    } else {
      setError("Only JPG or PNG files are allowed.");
    }
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => {
      const updatedCourses = checked
        ? [...prevData.courses, value]
        : prevData.courses.filter((course) => course !== value);
      return { ...prevData, courses: updatedCourses };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.mobileNo ||
      !formData.designation ||
      !formData.gender
    ) {
      setError("All fields are required.");
      return;
    }
    if (!validateEmail(formData.email)) {
      setError("Invalid email format.");
      return;
    }
    if (!validateMobile(formData.mobileNo)) {
      setError("Mobile number should be numeric.");
      return;
    }
    if (isDuplicateEmail) {
      setError("Email is already in use.");
      return;
    }

    // Submit form data (image handling needs backend support)
    const updatedData = new FormData();
    updatedData.append("name", formData.name);
    updatedData.append("email", formData.email);
    updatedData.append("mobileNo", formData.mobileNo);
    updatedData.append("designation", formData.designation);
    updatedData.append("gender", formData.gender);
    updatedData.append("courses", formData.courses);
    if (formData.image) updatedData.append("image", formData.image);

    try {
      await axios.put(
        `http://localhost:5000/api/employees/${employeeId}`,
        updatedData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert("Employee updated successfully.");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="employee-edit-container">
      <h2>Edit Employee</h2>
      <form onSubmit={handleSubmit} className="employee-edit-form">
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {isDuplicateEmail && (
            <span className="error">Email is already in use.</span>
          )}
        </div>
        <div>
          <label>Mobile No:</label>
          <input
            type="text"
            name="mobileNo"
            value={formData.mobileNo}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Designation:</label>
          <select
            name="designation"
            value={formData.designation}
            onChange={handleInputChange}
          >
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
        </div>
        <div>
          <label>Gender:</label>
          <input
            type="radio"
            name="gender"
            value="M"
            checked={formData.gender === "M"}
            onChange={handleInputChange}
          />{" "}
          Male
          <input
            type="radio"
            name="gender"
            value="F"
            checked={formData.gender === "F"}
            onChange={handleInputChange}
          />{" "}
          Female
        </div>
        <div>
          <label>Course:</label>
          <input
            type="checkbox"
            name="course"
            value="MCA"
            checked={formData.courses.includes("MCA")}
            onChange={handleCheckboxChange}
          />{" "}
          MCA
          <input
            type="checkbox"
            name="course"
            value="BCA"
            checked={formData.courses.includes("BCA")}
            onChange={handleCheckboxChange}
          />{" "}
          BCA
          <input
            type="checkbox"
            name="course"
            value="BSC"
            checked={formData.courses.includes("BSC")}
            onChange={handleCheckboxChange}
          />{" "}
          BSC
        </div>
        <div>
          <label>Image Upload:</label>
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/jpeg, image/png"
          />
          {error && <span className="error">{error}</span>}
        </div>
        <button type="submit">Update</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default EmployeeEdit;
