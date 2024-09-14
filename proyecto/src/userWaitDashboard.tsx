import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import fb_svg from './assets/fb.svg';
import ig_svg from './assets/ig.svg';
import tw_svg from './assets/tw.svg';

export default function UserDashboard() {
  const [user, setUser] = useState<{ name?: string; email?: string; betaccess?: boolean }>({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios.get(`${apiUrl}/user-profile`); // Ruta para obtener perfil del usuario
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [apiUrl]);

  const handleSignOut = () => {
    // Implement sign out logic here (e.g., clear tokens, etc.)
    navigate('/');
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen text-white">Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#1f1f1f]">
      <header className="bg-[#0f1010] py-6 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-4xl font-bold text-[#55ff55]" onClick={() => navigate('/')}>Pixel Roguelike</h1>
          <nav className="hidden md:flex space-x-4">
            <a href="#" className="no-underline text-[#aaaaaa] hover:text-[#55ff55]">About</a>
            <a href="#" className="no-underline text-[#aaaaaa] hover:text-[#55ff55]">Contact</a>
            <div className="relative">
              <button onClick={handleSignOut} className="text-[#aaaaaa] hover:text-[#55ff55] flex items-center">
                Sign out
              </button>
            </div>
          </nav>
        </div>
      </header>
      <main className="flex-1 bg-[#1f1f1f] py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center">
          {user.betaccess === false ? (
            <>
              <h2 className="text-3xl font-bold text-[#55ff55] mb-8">Beta Access Not Granted</h2>
              <p className="text-[#aaaaaa] mb-8">You are currently on the waitlist. Please check back later to see if you have been granted access to the beta.</p>
            </>
          ) : (
            <h2 className="text-3xl font-bold text-[#55ff55] mb-8">Welcome to the Beta!</h2>
          )}
        </div>
      </main>
      <footer className="bg-[#0f1010] py-6 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
          <p className="text-[#aaaaaa]">&copy; 2024 Pixel Roguelike. All rights reserved.</p>
          <nav className="flex space-x-4">
            <button onClick={() => navigate('/')} className="text-[#aaaaaa] hover:text-[#55ff55]">Home</button>
            <button onClick={() => navigate('/privacy')} className="text-[#aaaaaa] hover:text-[#55ff55]">Privacy</button>
            <button onClick={() => navigate('/terms')} className="text-[#aaaaaa] hover:text-[#55ff55]">Terms</button>
            <button onClick={() => navigate('/support')} className="text-[#aaaaaa] hover:text-[#55ff55]">Support</button>
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
}
