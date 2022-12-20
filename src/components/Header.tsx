import { Link } from 'react-router-dom';

import Menu from './Menu';
import { PlusIcon } from '@heroicons/react/24/outline';

export default function Header() {
  return (
    <header className="py-6 sm:py-8">
      <nav>
        <ul className="flex items-center">
          <li className="flex flex-1 items-center">
            <Menu />
          </li>
          <li className="flex flex-1 flex-shrink-0 justify-center">
            <Link to="/">
              <img
                src="/logo.png"
                className="w-[180px] min-w-[180px] pb-1 sm:w-[225px]"
              />
            </Link>
          </li>
          <li className="flex flex-1 justify-end pb-1">
            <Link to="/foods/add">
              <div className="shadow=md group flex items-center rounded-full bg-green-600 p-2 hover:scale-105 sm:px-2">
                <PlusIcon className="h-5 w-5 stroke-2 text-white group-hover:text-white" />
                <span className="mx-1 hidden whitespace-nowrap text-sm font-medium text-white sm:block">
                  Add Food
                </span>
              </div>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
