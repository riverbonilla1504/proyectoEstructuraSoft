import React from 'react';
import { useNavigate } from 'react-router-dom';
import pixelBackground from './pixel-background.gif';
import fb_svg from './assets/fb.svg';
import ig_svg from './assets/ig.svg';
import tw_svg from './assets/tw.svg';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-[#0f1010] py-6 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-4xl font-bold text-[#55ff55]" onClick={() => navigate('/')}>Pixel Roguelike</h1>
          <nav className="hidden md:flex space-x-4">
            <button 
              onClick={() => navigate('/about')} 
              className="no-underline text-[#aaaaaa] hover:text-[#55ff55] border rounded-[10px] px-4 py-2">
              About
            </button>
            <button 
              onClick={() => navigate('/features')} 
              className="no-underline text-[#aaaaaa] hover:text-[#55ff55] border rounded-[10px] px-4 py-2">
              Features
            </button>
            <button 
              onClick={() => navigate('/contact')} 
              className="no-underline text-[#aaaaaa] hover:text-[#55ff55] border rounded-[10px] px-4 py-2">
              Contact
            </button>
            <button 
              onClick={() => navigate('/login')} 
              className="no-underline text-[#aaaaaa] hover:text-[#55ff55] border rounded-[10px] px-4 py-2">
              Login
            </button>
          </nav>
        </div>
      </header>
      <main className="flex-1 bg-cover bg-center relative">
        <div className="absolute inset-0">
          <img src={pixelBackground} alt="Background" className="w-full h-full object-cover blur-sm" />
        </div>
        <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative">
          <div className="max-w-md w-full space-y-8">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-[#55ff55]">Welcome to Pixel Roguelike</h2>
              <p className="mt-2 text-sm text-[#aaaaaa]">Explore a 16-bit style SNES roguelike game.</p>
              <div className="mt-6">
                <button 
                  onClick={() => navigate('/signup')} 
                  className="inline-block bg-[#55ff55] text-[#0f1010] px-6 py-3 rounded-[10px] font-medium transition-transform duration-300 ease-in-out transform hover:scale-105">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-[#0f1010] py-6 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
          <p className="text-[#aaaaaa]">&copy; 2024 Pixel Roguelike. All rights reserved.</p>
          <nav className="flex space-x-4">
            <button 
              onClick={() => navigate('/adminDashBoard')} 
              className="text-[#aaaaaa] hover:text-[#55ff55] border rounded-[10px] px-4 py-2">
              DevTools
            </button>
            <button 
              onClick={() => navigate('/privacy')} 
              className="text-[#aaaaaa] hover:text-[#55ff55] border rounded-[10px] px-4 py-2">
              Privacy
            </button>
            <button 
              onClick={() => navigate('/terms')} 
              className="text-[#aaaaaa] hover:text-[#55ff55] border rounded-[10px] px-4 py-2">
              Terms
            </button>
            <button 
              onClick={() => navigate('/support')} 
              className="text-[#aaaaaa] hover:text-[#55ff55] border rounded-[10px] px-4 py-2">
              Support
            </button>
          </nav>
          <div className="mt-4 sm:mt-0">
            <div className="flex space-x-4">
              <a href="/" className="text-[#aaaaaa] hover:text-[#55ff55]"><img src={fb_svg} alt="" style={{ width: '20px', height: '20px' }} /></a>
              <a href="/" className="text-[#aaaaaa] hover:text-[#55ff55]"><img src={ig_svg} alt="" style={{ width: '20px', height: '20px' }} /></a>
              <a href="/" className="text-[#aaaaaa] hover:text-[#55ff55]"><img src={tw_svg} alt="" style={{ width: '20px', height: '20px' }} /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;