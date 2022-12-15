import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useStateValue, setUserAction } from '../state';

import loginService from '../services/loginService';
import { setToken } from '../utils/tokenManagement';

export default function Login() {
  const [, dispatch] = useStateValue();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const signup = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const registeredUser = await loginService.signup({ username, password });
      if (registeredUser) {
        const loggedInUser = await loginService.login({ username, password });
        setToken(loggedInUser);
        dispatch(setUserAction(loggedInUser));
        navigate('/');
      } else {
        setError('Invalid username and/or password.');
      }
    } catch (error) {
      if (error instanceof Error) {
        setError('Username already exists');
      }
      return null;
    }
  };

  return (
    <div className="mx-auto mt-6 flex max-w-md flex-col items-center md:mt-20">
      <h2 className="text-2xl font-bold text-neutral-700 md:text-3xl">
        Sign Up
      </h2>
      {/* Card */}
      <div className="mt-8 w-full rounded-md bg-neutral-50 px-8 pt-8 pb-10 shadow-lg">
        <form onSubmit={signup}>
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
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
