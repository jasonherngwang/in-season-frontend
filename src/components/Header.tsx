import { Link } from 'react-router-dom';
import InSeasonLogo from '../icons/InSeasonLogo';
import { Bars3Icon, ShoppingBagIcon } from '@heroicons/react/24/outline';

export default function Header({ handleLogout }: { handleLogout: () => void }) {
  return (
    <header className="py-8">
      <nav>
        <ul className="flex items-center justify-between">
          <li>
            <Bars3Icon className='text-neutral-300" h-6 w-6' />
          </li>
          <li>
            <Link to="/">
              <InSeasonLogo />
            </Link>
          </li>
          <li>
            <div className="flex gap-4">
              <div className="flex items-center rounded-md bg-neutral-100 py-2 px-3">
                <Link to="/" onClick={handleLogout}>
                  <span className="text-sm font-medium tracking-wider">
                    LOGOUT
                  </span>
                </Link>
              </div>
              <div className="flex items-center rounded-md bg-neutral-100 py-2 px-3">
                <Link to="/login">
                  <span className="text-sm font-medium tracking-wider">
                    LOGIN
                  </span>
                </Link>
              </div>
              <div className="rounded-md bg-neutral-100 py-2 px-3">
                <Link to="/basket">
                  <div className="flex items-center">
                    <ShoppingBagIcon className='text-neutral-300" h-6 w-6' />
                    <span className="ml-2 text-sm font-medium tracking-wider">
                      BASKET
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
}
