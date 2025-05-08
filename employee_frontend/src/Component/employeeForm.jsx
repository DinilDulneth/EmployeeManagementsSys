import React, { useState } from "react";
import { addEmployee } from "../service/api";

const EmployeeForm = () => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    salary: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        
      console.log("Form Data:", formData); 
      const response = await addEmployee(formData); 
      console.log("API Response:", response); 
      alert("Employee added successfully!");

    } catch (error) {
      console.error("Error adding employee:", error); // Log the error details
      if (error.response) {

        
        alert(
          `Failed to add employee: ${error.response.data.message || "Server error"}`
        );
      } else if (error.request) {

        
        alert("Failed to add employee: No response from server.");
      } else {

        
        alert(`Failed to add employee: ${error.message}`);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>ID:</label>
        <input
          type="text"
          name="id"
          value={formData.id}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Phone:</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Salary:</label>
        <input
          type="number"
          name="salary"
          value={formData.salary}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default EmployeeForm;
