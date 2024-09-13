import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import Validation from '../../SignupValidation';
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
<div className="container">
      <div className="form-container">
        <div className="header-text">
          <h1 className="header-title">Sign Up</h1>
          <p className="header-subtitle">
            Regístrate en tu cuenta
          </p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="label">
              Nombre
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="input"
              placeholder="Introduce tu nombre"
              onChange={handleInput}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>
          <div>
            <label htmlFor="email" className="label">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="input"
              placeholder="Introduce tu email"
              onChange={handleInput}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
          <div>
            <label htmlFor="password" className="label">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="input"
              placeholder="Introduce tu contraseña"
              onChange={handleInput}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>
          {errors.general && <span className="error-message">{errors.general}</span>}
          <button
            type="submit"
            className="submit-button"
          >
            Registrarse
          </button>
        </form>
        <div className="text-center text-sm text-[#aaaaaa]">
          ¿Ya tienes una cuenta?{' '}
          <Link to="/login" className="link">
            Inicia sesión
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;