import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Stack class to manage download URLs
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
  const [user, setUser] = useState<{ name?: string; email?: string }>({});
  const [downloading, setDownloading] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001'; // API URL
  const navigate = useNavigate();

  // Handle user sign out
  const handleSignOut = () => {
    navigate('/');
  };

  // Handle download request
  const handleDownloadRequest = () => {
    const newStack = new Stack<string>();
    newStack.push(`${apiUrl}/download`); // Add the download URL to the stack
    setDownloadStack(newStack);
    processDownload(newStack); // Process the download
  };

  // Process the download from the stack
  const processDownload = async (stack: Stack<string>) => {
    if (!stack.isEmpty()) {
      setDownloading(true);
      const downloadUrl = stack.pop(); // Get the most recent download (last in)
      if (downloadUrl) {
        try {
          // Simulate a download or use a method to download the file.
          window.location.href = downloadUrl;
          console.log(`Starting download from: ${downloadUrl}`);
        } catch (error) {
          console.error('Download error:', error);
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
          <h2 className="text-3xl font-bold text-[#55ff55] mb-8">Congratulations!</h2>
          <p className="text-[#aaaaaa] mb-8">
            You have been accepted into the beta of our game Pixel Roguelike. Explore dungeons and fight monsters!
          </p>
          <button
            onClick={handleDownloadRequest}
            className={`px-6 py-3 rounded-md bg-[#55ff55] text-[#1f1f1f] font-bold transition-colors duration-300 ${downloading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#44dd44]'}`}
            disabled={downloading}
          >
            {downloading ? 'Downloading...' : 'Download Game'}
          </button>
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
