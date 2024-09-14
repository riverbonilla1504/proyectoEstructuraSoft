import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

class Stack<T> {
  private items: T[] = [];

  push(item: T) {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  getAll(): T[] {
    return [...this.items];
  }
}

export default function UserDashboard() {
  const [downloadStack, setDownloadStack] = useState<Stack<string>>(new Stack<string>());
  const [user, setUser] = useState<{ name?: string; email?: string; betaccess?: boolean }>({});
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  const handleSignOut = () => {
    navigate('/');
  };

  const handleDownloadRequest = () => {
    const newStack = new Stack<string>();
    newStack.push(`${apiUrl}/download`); // Añadir la URL de descarga a la pila
    setDownloadStack(newStack);
    processDownload(newStack); // Procesar la descarga
  };

  const processDownload = async (stack: Stack<string>) => {
    if (!stack.isEmpty()) {
      setDownloading(true);
      const downloadUrl = stack.pop(); // Obtener la descarga más reciente (última en entrar)
      if (downloadUrl) {
        try {
          // Simular una descarga o usar un método para descargar el archivo.
          window.location.href = downloadUrl;
          console.log(`Iniciando descarga desde: ${downloadUrl}`);
        } catch (error) {
          console.error('Error en la descarga:', error);
        } finally {
          setDownloading(false);
        }
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#1f1f1f]">
      <header className="bg-[#0f1010] py-6 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-4xl font-bold text-[#55ff55]" onClick={() => navigate('/')}>Pixel Roguelike</h1>
          <button onClick={handleSignOut} className="text-[#aaaaaa] hover:text-[#55ff55]">
            Sign out
          </button>
        </div>
      </header>
      <main className="flex-1 bg-[#1f1f1f] py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center">
          {user.betaccess ? (
            <>
              <h2 className="text-3xl font-bold text-[#55ff55] mb-8">¡Felicidades!</h2>
              <p className="text-[#aaaaaa] mb-8">Has sido aceptado a la beta de nuestro juego Pixel Roguelike. ¡Explora mazmorras y combate monstruos!</p>
              <button
                onClick={handleDownloadRequest}
                className={`px-6 py-3 rounded-md bg-[#55ff55] text-[#1f1f1f] font-bold transition-colors duration-300 ${downloading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#44dd44]'}`}
                disabled={downloading}
              >
                {downloading ? 'Downloading...' : 'Download Game'}
              </button>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold text-[#55ff55] mb-8">Beta Access Not Granted</h2>
              <p className="text-[#aaaaaa] mb-8">You are currently on the waitlist. Please check back later to see if you have been granted access to the beta.</p>
            </>
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
        </div>
      </footer>
    </div>
  );
}
