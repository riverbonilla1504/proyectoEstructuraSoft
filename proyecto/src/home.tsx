import React from 'react';
import { useNavigate } from 'react-router-dom';
import pixelBackground from './pixel-background.jpg';

// Define una interfaz para las props si es necesario en el futuro
interface ComponentProps {}

const Component: React.FC<ComponentProps> = () => {
  const navigate = useNavigate(); // Hook para manejar la navegación

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-[#0f1010] py-6 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-4xl font-bold text-[#55ff55]">Pixel Roguelike</h1>
          <nav className="hidden md:flex space-x-4">
            <button onClick={() => navigate('/about')} className="text-[#aaaaaa] hover:text-[#55ff55]">
              About
            </button>
            <button onClick={() => navigate('/features')} className="text-[#aaaaaa] hover:text-[#55ff55]">
              Features
            </button>
            <button onClick={() => navigate('/contact')} className="text-[#aaaaaa] hover:text-[#55ff55]">
              Contact
            </button>
            <button onClick={() => navigate('/login')} className="text-[#aaaaaa] hover:text-[#55ff55]">
              Login
            </button>
          </nav>
          <div className="md:hidden">
            <button className="text-[#aaaaaa] hover:text-[#55ff55]">
              {/* Botón para menú móvil */}
            </button>
          </div>
        </div>
      </header>
      <main className="flex-1 bg-cover bg-center" style={{ backgroundImage: `url(${pixelBackground})` }}>
        <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
          <div className="max-w-md w-full space-y-8">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-[#55ff55]">Welcome to Pixel Roguelike</h2>
              <p className="mt-2 text-sm text-[#aaaaaa]">Explore a 16-bit style SNES roguelike game.</p>
              <div className="mt-6">
                <button
                  onClick={() => navigate('/signup')}
                  className="inline-block bg-[#55ff55] text-[#0f1010] px-6 py-3 rounded-md font-medium hover:bg-[#44dd44]"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-[#0f1010] py-6 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto flex items-center justify-between">
          <p className="text-[#aaaaaa]">&copy; 2024 Pixel Roguelike. All rights reserved.</p>
          <nav className="hidden md:flex space-x-4">
            <button onClick={() => navigate('/adminDashboard')} className="text-[#aaaaaa] hover:text-[#55ff55]">
              dev tools
            </button>
            <button onClick={() => navigate('/terms')} className="text-[#aaaaaa] hover:text-[#55ff55]">
              Terms
            </button>
            <button onClick={() => navigate('/support')} className="text-[#aaaaaa] hover:text-[#55ff55]">
              Support
            </button>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default Component;
