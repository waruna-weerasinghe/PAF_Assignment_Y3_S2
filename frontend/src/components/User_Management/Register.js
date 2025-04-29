import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [user, setUser] = useState({
    id: '',
    name: '',
    telephone: '',
    password: '',
    email: '',
    address: '',
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8081/addUser', user);
      alert('User registered successfully!');
      setUser({ id: '', name: '', telephone: '', password: '', email: '', address: '' });
    } catch (error) {
      console.error(error);
      alert('Registration failed.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg space-y-6">
        <h2 className="text-3xl font-bold text-center text-blue-700">User Registration</h2>

        {Object.entries(user).map(([key, value]) => (
          <div key={key} className="flex flex-col">
            <label htmlFor={key} className="mb-1 text-sm font-semibold text-gray-600">
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </label>
            <input
              type={key === 'password' ? 'password' : 'text'}
              name={key}
              id={key}
              value={value}
              onChange={handleChange}
              placeholder={`Enter ${key}`}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
