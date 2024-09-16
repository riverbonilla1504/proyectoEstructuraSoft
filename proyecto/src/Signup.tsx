import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import Validation from './SignupValidation';
import axios from 'axios';

const Signup: React.FC = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  interface Errors {
    email?: string;
    password?: string;
    name?: string;
    general?: string;
  }

  const [errors, setErrors] = useState<Errors>({});

  // Handle input changes
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
  };

  // Handle form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validate input data
    const validationErrors = Validation(values);
    setErrors(validationErrors);

    // Check if there are no validation errors before sending data
    if (Object.keys(validationErrors).length === 0) {
      console.log('Data submitted:', values);

      // Use environment variable for API URL
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001'; // API URL

      // Check if the user already exists in the database
      axios.post(`${apiUrl}/check-user`, { email: values.email }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => {
          if (res.data.exists) {
            // If the user already exists, show an error
            setErrors(prev => ({ ...prev, email: 'The email is already registered' }));
          } else {
            // If the user does not exist, proceed with registration
            axios.post(`${apiUrl}/signup`, values, {
              headers: {
                'Content-Type': 'application/json'
              }
            })
              .then(res => {
                console.log('Data submitted:', res.data);
                navigate('/login'); // Redirect to login or another page after successful registration
              })
              .catch(err => {
                console.log('Error submitting data:', err);
                setErrors(prev => ({ ...prev, general: 'Error registering. Please try again.' }));
              });
          }
        })
        .catch(err => {
          console.log('Error checking email:', err);
          setErrors(prev => ({ ...prev, general: 'Error checking email. Please try again.' }));
        });
    } else {
      console.log('Validation errors present:', validationErrors);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#0f1010]">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#55ff55]"onClick={() => navigate('/')}>Pixel Roguelike</h1>
            <p className="mt-2 text-sm text-[#aaaaaa]">
            Sign up for your account
            </p>
        </div>
        <div className="bg-[#1a1b1c] p-8 rounded-lg shadow-md">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[#55ff55]">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-[#55ff55] placeholder-[#aaaaaa] text-[#000000] focus:outline-none focus:ring-[#ff9955] focus:border-[#ff9955] focus:z-10 sm:text-sm"
                placeholder="Enter your name"
                onChange={handleInput}
              />
              {errors.name && <span className='text-danger'>{errors.name}</span>}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#55ff55]">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-[#55ff55] placeholder-[#aaaaaa] text-[#000000] focus:outline-none focus:ring-[#ff9955] focus:border-[#ff9955] focus:z-10 sm:text-sm"
                placeholder="Enter your email"
                onChange={handleInput}
              />
              {errors.email && <span className='text-danger'>{errors.email}</span>}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#55ff55]">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-[#55ff55] placeholder-[#aaaaaa] text-[#000000] focus:outline-none focus:ring-[#ff9955] focus:border-[#ff9955] focus:z-10 sm:text-sm"
                placeholder="Enter your password"
                onChange={handleInput}
              />
              {errors.password && <span className='text-danger'>{errors.password}</span>}
            </div>
            {errors.general && <span className='text-danger'>{errors.general}</span>}
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-[#ffffff] bg-[#55ff55] hover:bg-[#44dd44] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff9955]"
            >
              Sign up
            </button>
          </form>
        </div>
        <div className="text-center text-sm text-[#aaaaaa]">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-[#55ff55] hover:text-[#ff9955]">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
