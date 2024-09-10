import React from 'react';
import { Link } from 'react-router-dom';
const Login: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#0f1010]">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#55ff55]">Sign up</h1>
          <p className="mt-2 text-sm text-[#aaaaaa]">
            pls sign up
          </p>
        </div>
        <div className="bg-[#1a1b1c] p-8 rounded-lg shadow-md">
          <form className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-[#55ff55]">
                Username
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-[#55ff55] placeholder-[#aaaaaa] text-[#000000] focus:outline-none focus:ring-[#ff9955] focus:border-[#ff9955] focus:z-10 sm:text-sm"
                  placeholder="Enter your username"
                />
              </div>
            </div>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-[#55ff55]">
                Email
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-[#55ff55] placeholder-[#aaaaaa] text-[#000000] focus:outline-none focus:ring-[#ff9955] focus:border-[#ff9955] focus:z-10 sm:text-sm"
                  placeholder="Enter your email"
                />
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
