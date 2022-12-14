import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { Token } from '../utils/tokenManagement';

type LoginProps = {
  handleLogin: (username: string, password: string) => Promise<Token>;
};

export default function Login({ handleLogin }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  // If successful, redirect to home page. Else, display error message
  const login = async (e: React.FormEvent) => {
    e.preventDefault();

    const user = await handleLogin(username, password);
    if (user) {
      // Redirect user to the route originally requested
      const origin = location.state?.from?.pathname || '/';
      navigate(origin);
    } else {
      setError('Incorrect username and/or password.');
    }
  };

  return (
    <div className="mx-auto mt-6 flex max-w-md flex-col items-center md:mt-20">
      <h2 className="text-2xl font-bold text-neutral-700 md:text-3xl">Login</h2>
      {/* Card */}
      <div className="mt-8 w-full rounded-md bg-neutral-50 px-8 pt-8 pb-10 shadow-lg">
        <form onSubmit={login}>
          <div>
            <label
              htmlFor="username"
              className="block text-lg font-medium text-neutral-500"
            >
              Username
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="username"
                id="username"
                value={username}
                required
                className="block w-full appearance-none rounded-md border-neutral-300 shadow-sm focus:border-green-600 focus:ring-green-600 sm:max-w-sm"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-4">
            <label
              htmlFor="password"
              className="block text-lg font-medium text-neutral-500"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                required
                className="block w-full appearance-none rounded-md border-neutral-300 shadow-sm focus:border-green-600 focus:ring-green-600 sm:max-w-sm"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          {error && (
            <div className="mt-4">
              <p className="text-red-500">{error}</p>
            </div>
          )}
          <div className="mt-8">
            <button
              className="flex w-full justify-center rounded-md border-transparent bg-green-600 py-3 px-4 font-medium tracking-wider text-white hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 active:bg-green-700"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
