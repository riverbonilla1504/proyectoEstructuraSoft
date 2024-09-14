import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminLogin: React.FC = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  const navigate = useNavigate();

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const apiUrl = process.env.REACT_APP_API_URL;
    // Enviar los datos de login al backend
    axios.post(`${apiUrl}/login-admin`, values, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        // Suponiendo que la respuesta es exitosa
        console.log('Inicio de sesión exitoso');
        navigate('/adminDashboard'); // Redirigir a adminDashboard
      })
      .catch((err) => {
        console.log('Error al iniciar sesión:', err);
        setErrors((prev) => ({ ...prev, general: 'Error al iniciar sesión. Inténtalo de nuevo.' }));
      });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#0f1010]">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#55ff55]" onClick={() => navigate('/')}>Pixel Roguelike</h1>
          <p className="mt-2 text-sm text-[#aaaaaa]">
            Welcome to the admin login for developers. This login is secret and should be used only by developers.
          </p>
        </div>
        <div className="bg-[#1a1b1c] p-8 rounded-lg shadow-md">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#55ff55]">
                Email (Dev Only)
              </label>
              <input
                id="email"
                name="email"
                type="text"
                autoComplete="email"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-[#55ff55] placeholder-[#aaaaaa] text-[#000000] focus:outline-none focus:ring-[#ff9955] focus:border-[#ff9955] focus:z-10 sm:text-sm"
                placeholder="Enter your email"
                onChange={handleInput}
              />
              {errors.email && <span className="text-red-500">{errors.email}</span>}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#55ff55]">
                Password (Dev Only)
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-[#55ff55] placeholder-[#aaaaaa] text-[#000000] focus:outline-none focus:ring-[#ff9955] focus:border-[#ff9955] focus:z-10 sm:text-sm"
                placeholder="Enter your password"
                onChange={handleInput}
              />
              {errors.password && <span className="text-red-500">{errors.password}</span>}
            </div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-[#ffffff] bg-[#55ff55] hover:bg-[#44dd44] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff9955]"
            >
              Sign in
            </button>
            {errors.general && (
              <div className="text-center text-red-500 mt-4">
                {errors.general}
              </div>
            )}
          </form>
        </div>
        <div className="text-center text-sm text-[#aaaaaa]">
          <Link to="/" className="font-medium text-[#55ff55] hover:text-[#ff9955]">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
