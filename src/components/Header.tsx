import { Link } from 'react-router-dom';

import Menu from './Menu';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';

export default function Header({ handleLogout }: { handleLogout: () => void }) {
  return (
    <header className="py-8">
      <nav>
        <ul className="flex items-center">
          <li className="flex-1">
            <Menu handleLogout={handleLogout} />
          </li>
          <li className="flex flex-1 flex-shrink-0 justify-center">
            <Link to="/">
              <img
                src="/logo.png"
                className="w-[180px] min-w-[180px] sm:w-[225px]"
              />
            </Link>
          </li>
          <li className="flex flex-1 justify-end">
            <Link to="/basket">
              <div className="group flex transform items-center rounded-full border px-2 py-1 hover:border-green-600 hover:bg-green-600 sm:px-3">
                <div className="hidden text-sm font-bold text-neutral-700 group-hover:text-white sm:block">
                  42
                </div>
                <ShoppingBagIcon className='text-neutral-300" h-6 w-6 group-hover:text-white  sm:ml-2' />
              </div>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
