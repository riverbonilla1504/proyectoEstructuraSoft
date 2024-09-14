import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function UserDashboard() {
  interface User {
    name: string;
    email: string;
  }

  const [user, setUser] = useState<User | null>(null); // Mantiene el usuario actual
  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios.get(`${apiUrl}/user`);
        setUser(response.data); // Obtiene la información del usuario
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
    fetchUser();
  }, [apiUrl]);

  const handleDownloadRequest = () => {
    // Lógica para manejar la descarga del juego
    console.log("Iniciando la descarga del juego...");
    // Aquí podrías agregar el enlace o la funcionalidad de descarga
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#1f1f1f]">
      <header className="bg-[#0f1010] py-6 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-4xl font-bold text-[#55ff55]" onClick={() => navigate('/')}>
            Pixel Roguelike
          </h1>
          <button onClick={() => navigate('/')} className="text-[#aaaaaa] hover:text-[#55ff55]">
            Sign out
          </button>
        </div>
      </header>

      <main className="flex-1 bg-[#1f1f1f] py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          {user ? (
            <div>
              <h2 className="text-3xl font-bold text-[#55ff55] mb-8">
                ¡Felicidades, {user.name}!
              </h2>
              <p className="text-[#aaaaaa] mb-8">
                Bienvenido a la beta de Pixel Roguelike. ¡Esperamos que disfrutes el juego!
              </p>
              <p className="text-[#aaaaaa] mb-8">
                A continuación, puedes descargar el juego y empezar tu aventura en este increíble mundo retro.
              </p>
              <button
                onClick={handleDownloadRequest}
                className="bg-[#55ff55] text-black py-2 px-4 rounded-md hover:bg-[#44dd44]"
              >
                Descargar juego
              </button>
            </div>
          ) : (
            <p className="text-[#aaaaaa]">Cargando información del usuario...</p>
          )}
        </div>
      </main>
    </div>
  );
}
