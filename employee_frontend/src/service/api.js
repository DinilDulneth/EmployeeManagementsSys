import axios from "axios";

const BASE_URL = "http://localhost:5073/api";

export const addEmployee = async (employeeData) => {
  try {
    const response = await axios.post(`${BASE_URL}/Employee`, employeeData);
    return response.data; 
    
  } catch (error) {

    // Error handling
    if (error.response) {
      // If the error comes from the server 
      console.error('Server Error:', error.response.data);
      throw new Error(`Error: ${error.response.data.message || 'Something went wrong'}`);
    } else if (error.request) {
      // If no response was received
      console.error('Network Error:', error.request);
      throw new Error('Network error: Unable to connect to the server');
    } else {
      // If an error occurred setting up the request
      console.error('Request Error:', error.message);
      throw new Error(`Request error: ${error.message}`);
    }
  }
};
