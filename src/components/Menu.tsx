import { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { getUser, removeToken } from '../utils/tokenManagement';
import { setUserAction, useStateValue } from '../state';

import clsx from 'clsx';
import { Menu, Transition } from '@headlessui/react';
import { Bars3Icon } from '@heroicons/react/24/outline';

const links = [
  { href: '/basket', label: 'Basket' },
  { href: '/account', label: 'My Account' },
  { href: '/plans', label: 'Plans' },
];

export default function SideMenu() {
  const [, dispatch] = useStateValue();

  const logout = () => {
    removeToken();
    dispatch(setUserAction(null));
  };

  return (
    <Menu as="div" className="relative">
      <Menu.Button>
        <Bars3Icon className='text-neutral-300" h-6 w-6 sm:h-8 sm:w-8' />
      </Menu.Button>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Menu.Items className="absolute w-40 origin-top-left rounded-md border border-neutral-200 bg-white pt-2 pb-1 shadow-xl focus:outline-none">
          {links.map((link) => (
            <Menu.Item key={link.href} as={Fragment}>
              {({ active }) => (
                <Link
                  to={link.href}
                  className={clsx('block bg-white px-4 py-3 text-neutral-700', {
                    'text-green-600': active,
                  })}
                >
                  {link.label}
                </Link>
              )}
            </Menu.Item>
          ))}
          <Menu.Item key={'/logout'} as={Fragment}>
            {({ active }) =>
              getUser() ? (
                <Link
                  to="/"
                  onClick={logout}
                  className={clsx('block bg-white px-4 py-3 text-neutral-700', {
                    'text-green-600': active,
                  })}
                >
                  Logout
                </Link>
              ) : (
                <Link
                  to="/login"
                  className={clsx('block bg-white px-4 py-3 text-neutral-700', {
                    'text-green-600': active,
                  })}
                >
                  Login
                </Link>
              )
            }
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
