import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Clase de Cola
class Queue<T> {
  private items: T[] = [];

  enqueue(item: T) {
    this.items.push(item);
  }

  dequeue(): T | undefined {
    return this.items.shift();
  }

  peek(): T | undefined {
    return this.items[0];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  getAll(): T[] {
    return [...this.items];
  }
}

export default function Component() {
  interface User {
    name: string;
    email: string;
    betaccess: boolean; // Corregido el nombre del campo
  }

  const [usersQueue, setUsersQueue] = useState<Queue<User>>(new Queue<User>());
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get<User[]>(`${apiUrl}/users`); // Agregado tipo explícito
        // Verifica los datos que recibes en la respuesta
        console.log('Usuarios recibidos:', response.data);

        // Crea una nueva cola e inserta los usuarios que no tienen betaaccess
        const queue = new Queue<User>();
        response.data.filter((user: User) => !user.betaccess).forEach(user => queue.enqueue(user));

        console.log('Usuarios en cola:', queue.getAll());

        setUsersQueue(queue);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }
    fetchUsers();
  }, [apiUrl]);

  const handleAccept = async (email: string) => {
    try {
      await axios.post(`${apiUrl}/accept-user`, { email });

      // Crea una nueva cola y transfiere los elementos que no sean el usuario aceptado
      const newQueue = new Queue<User>();
      while (!usersQueue.isEmpty()) {
        const user = usersQueue.dequeue();
        if (user && user.email !== email) {
          newQueue.enqueue(user);
        }
      }

      setUsersQueue(newQueue);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#1f1f1f]">
      <header className="bg-[#0f1010] py-6 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-4xl font-bold text-[#55ff55]">Pixel Roguelike</h1>
          <nav className="hidden md:flex space-x-4">
            <a href="#" className="text-[#aaaaaa] hover:text-[#55ff55]">About</a>
            <a href="#" className="text-[#aaaaaa] hover:text-[#55ff55]">Features</a>
            <a href="#" className="text-[#aaaaaa] hover:text-[#55ff55]">Contact</a>
            <div className="relative">
              <button className="text-[#aaaaaa] hover:text-[#55ff55] flex items-center">
                Session
                <ChevronDownIcon className="h-4 w-4 ml-1" />
              </button>
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
                <div className="py-1">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">Profile</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">Settings</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">Sign out</a>
                </div>
              </div>
            </div>
          </nav>
          <div className="md:hidden">
            <button className="text-[#aaaaaa] hover:text-[#55ff55]">
              <MenuIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>
      <main className="flex-1 bg-[#1f1f1f] py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-[#55ff55] mb-8">User Management</h2>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-[#0f1010] text-[#55ff55]">
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Email</th>
                  <th className="px-4 py-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {usersQueue.getAll().map(user => (
                  <tr key={user.email} className="border-b border-[#aaaaaa] text-[#aaaaaa]">
                    <td className="px-4 py-3">{user.name}</td>
                    <td className="px-4 py-3">{user.email}</td>
                    <td className="px-4 py-3">
                      {!user.betaccess ? (
                        <button className="px-4 py-2 rounded-md hover:bg-[#55ff55] hover:text-[#1f1f1f]" onClick={() => handleAccept(user.email)}>
                          Accept
                        </button>
                      ) : (
                        <span>Accepted</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <footer className="bg-[#0f1010] py-6 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto flex items-center justify-between">
          <p className="text-[#aaaaaa]">&copy; 2024 Pixel Roguelike. All rights reserved.</p>
          <nav className="hidden md:flex space-x-4">
            <a href="#" className="text-[#aaaaaa] hover:text-[#55ff55]">Privacy</a>
            <a href="#" className="text-[#aaaaaa] hover:text-[#55ff55]">Terms</a>
            <a href="#" className="text-[#aaaaaa] hover:text-[#55ff55]">Support</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}

function ChevronDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
