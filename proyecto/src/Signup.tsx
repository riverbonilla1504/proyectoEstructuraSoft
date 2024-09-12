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

  // Manejo de cambios en los inputs
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
  };

  // Manejo del submit
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validar los datos ingresados
    const validationErrors = Validation(values);
    setErrors(validationErrors);

    // Verificar si no hay errores antes de enviar los datos
    if (Object.keys(validationErrors).length === 0) {
      console.log('Datos enviados:', values);

      // Utiliza la variable de entorno para la URL de la API
      const apiUrl = process.env.REACT_APP_API_URL;

      // Verificar si el usuario ya existe en la base de datos
      axios.post(`${apiUrl}/check-user`, { email: values.email }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => {
          if (res.data.exists) {
            // Si el usuario ya existe, mostrar un error
            setErrors(prev => ({ ...prev, email: 'El email ya está registrado' }));
          } else {
            // Si no existe, proceder con el registro
            axios.post(`${apiUrl}/signup`, values, {
              headers: {
                'Content-Type': 'application/json'
              }
            })
              .then(res => {
                console.log('Datos enviados:', res.data);
                navigate('/login'); // Redirige al inicio u otra página después del registro exitoso
              })
              .catch(err => {
                console.log('Error al enviar datos:', err);
                setErrors(prev => ({ ...prev, general: 'Error al registrar. Inténtalo de nuevo.' }));
              });
          }
        })
        .catch(err => {
          console.log('Error al verificar el email:', err);
          setErrors(prev => ({ ...prev, general: 'Error al verificar el email. Inténtalo de nuevo.' }));
        });
    } else {
      console.log('Errores de validación presentes:', validationErrors);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#0f1010]">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#55ff55]">Sign Up</h1>
          <p className="mt-2 text-sm text-[#aaaaaa]">
            Regístrate en tu cuenta
          </p>
        </div>
        <div className="bg-[#1a1b1c] p-8 rounded-lg shadow-md">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[#55ff55]">
                Nombre
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-[#55ff55] placeholder-[#aaaaaa] text-[#000000] focus:outline-none focus:ring-[#ff9955] focus:border-[#ff9955] focus:z-10 sm:text-sm"
                placeholder="Introduce tu nombre"
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
                placeholder="Introduce tu email"
                onChange={handleInput}
              />
              {errors.email && <span className='text-danger'>{errors.email}</span>}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#55ff55]">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-[#55ff55] placeholder-[#aaaaaa] text-[#000000] focus:outline-none focus:ring-[#ff9955] focus:border-[#ff9955] focus:z-10 sm:text-sm"
                placeholder="Introduce tu contraseña"
                onChange={handleInput}
              />
              {errors.password && <span className='text-danger'>{errors.password}</span>}
            </div>
            {errors.general && <span className='text-danger'>{errors.general}</span>}
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-[#ffffff] bg-[#55ff55] hover:bg-[#44dd44] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff9955]"
            >
              Registrarse
            </button>
          </form>
        </div>
        <div className="text-center text-sm text-[#aaaaaa]">
          ¿Ya tienes una cuenta?{' '}
          <Link to="/" className="font-medium text-[#55ff55] hover:text-[#ff9955]">
            Inicia sesión
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
