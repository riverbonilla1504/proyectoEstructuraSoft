import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Validation from './LoginValidation';
const Login: React.FC = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  interface Errors {
    email?: string;
    password?: string;
  }

  const [errors, setErrors] = useState<Errors>({});
  const handleInput = (event: any) => {
    setValues(prev => ({...prev, [event.target.name]: event.target.value}));
  }
  const handleSubmit = (event: any) => {
    event.preventDefault();
    setValues(Validation(values));
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#0f1010]">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#55ff55]">Pixel Roguelike</h1>
          <p className="mt-2 text-sm text-[#aaaaaa]">
            Welcome to the beta of our 16-bit style SNES roguelike game.
          </p>
        </div>
        <div className="bg-[#1a1b1c] p-8 rounded-lg shadow-md">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-[#55ff55]">
                Email
              </label>
              <div className="mt-1">
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
                {errors.email && <span className='text-danger'>{errors.email}</span>}
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#55ff55]">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-[#55ff55] placeholder-[#aaaaaa] text-[#000000] focus:outline-none focus:ring-[#ff9955] focus:border-[#ff9955] focus:z-10 sm:text-sm"
                  placeholder="Enter your password"
                />
                {errors.password && <span className='text-danger'>{errors.password}</span>}
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-[#ffffff] bg-[#55ff55] hover:bg-[#44dd44] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff9955]"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
        <div className="text-center text-sm text-[#aaaaaa]">
          Don't have an account?{" "}
          <Link to="/signup" className="font-medium text-[#55ff55] hover:text-[#ff9955]">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
