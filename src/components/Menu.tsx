import { Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import userService from '../services/userService';
import { isLoggedIn, removeUser } from '../utils/tokenManagement';
import { resetStateAction, useStateValue } from '../state';

import clsx from 'clsx';
import { Menu, Transition } from '@headlessui/react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import {
  TrashIcon,
  ShoppingBagIcon,
  RocketLaunchIcon,
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
  PencilIcon,
  PlusCircleIcon,
} from '@heroicons/react/20/solid';

export default function SideMenu() {
  const [{ user }, dispatch] = useStateValue();

  const navigate = useNavigate();

  // Reset all state
  const logout = () => {
    removeUser();
    dispatch(resetStateAction());
    navigate('/');
  };

  const deleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account?')) {
      await userService.deleteUser();
      logout();
    }
  };

  return (
    <Menu as="div" id="menu" className="relative z-10">
      <Menu.Button id="menuButton">
        <Bars3Icon className='text-neutral-300" h-8 w-8' />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Menu.Items className="absolute w-52 origin-top-left rounded-xl bg-white shadow-xl ring-1 ring-neutral-200 focus:outline-none">
          <div>
            {isLoggedIn() && (
              <Menu.Item key="username" as="div">
                <div className="block w-full rounded-t-lg border-b bg-neutral-100 px-4 py-3 font-semibold text-neutral-700 ring-1 ring-neutral-200">
                  {user?.username}
                </div>
              </Menu.Item>
            )}
            <Menu.Item key="basket">
              {({ active }) => (
                <Link
                  to="/basket"
                  className={clsx(
                    'group flex w-full items-center px-4 py-4 text-neutral-700',
                    {
                      'text-green-600': active,
                    }
                  )}
                >
                  <ShoppingBagIcon className="mr-2 h-5 w-5 text-neutral-400 group-hover:text-green-600" />
                  Basket
                </Link>
              )}
            </Menu.Item>
            {isLoggedIn() && (
              <Menu.Item key="addfood">
                {({ active }) => (
                  <Link
                    to="/foods/add"
                    className={clsx(
                      'group flex w-full items-center px-4 py-4 text-neutral-700',
                      {
                        'text-green-600': active,
                      }
                    )}
                  >
                    <PlusCircleIcon className="mr-2 h-5 w-5 text-neutral-400 group-hover:text-green-600" />
                    Add Food
                  </Link>
                )}
              </Menu.Item>
            )}
            <Menu.Item key="plans" as={Fragment}>
              {({ active }) => (
                <Link
                  to="/plans"
                  className={clsx(
                    'group flex w-full items-center px-4 py-4 text-neutral-700',
                    {
                      'text-green-600': active,
                    }
                  )}
                >
                  <RocketLaunchIcon className="mr-2 h-5 w-5 text-neutral-400 group-hover:text-green-600" />
                  Plans
                </Link>
              )}
            </Menu.Item>
            <Menu.Item key="logout" as={Fragment}>
              {({ active }) =>
                isLoggedIn() ? (
                  <Link
                    to="/"
                    onClick={logout}
                    className={clsx(
                      'group flex w-full items-center border-t border-t-neutral-200 px-4 py-4 text-neutral-700',
                      {
                        'text-green-600': active,
                      }
                    )}
                  >
                    <ArrowLeftOnRectangleIcon className="mr-2 h-5 w-5 text-neutral-400 group-hover:text-green-600" />
                    Logout
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/signup"
                      className={clsx(
                        'group flex w-full items-center border-t border-t-neutral-200 px-4 py-4 text-neutral-700',
                        {
                          'text-green-600': active,
                        }
                      )}
                    >
                      <PencilIcon className="mr-2 h-5 w-5 text-neutral-400 group-hover:text-green-600" />
                      Sign Up
                    </Link>
                    <Link
                      to="/login"
                      className={clsx(
                        'group flex w-full items-center px-4 py-4 text-neutral-700',
                        {
                          'text-green-600': active,
                        }
                      )}
                    >
                      <ArrowRightOnRectangleIcon className="mr-2 h-5 w-5 text-neutral-400 group-hover:text-green-600" />
                      Login
                    </Link>
                  </>
                )
              }
            </Menu.Item>
            {isLoggedIn() && (
              <Menu.Item key={'delete'} as={Fragment}>
                {({ active }) => (
                  <button
                    onClick={deleteAccount}
                    className={clsx(
                      'group flex w-full items-center px-4 py-4 text-neutral-700',
                      {
                        'text-red-600': active,
                      }
                    )}
                  >
                    <TrashIcon className="mr-2 h-5 w-5 text-neutral-400 group-hover:text-red-600" />
                    Delete Account
                  </button>
                )}
              </Menu.Item>
            )}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
