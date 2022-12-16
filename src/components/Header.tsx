import { Link } from 'react-router-dom';
import { useStateValue } from '../state';

import Menu from './Menu';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';

export default function Header() {
  const [{ basket }, dispatch] = useStateValue();
  const numItemsInBasket = basket.length;

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
            <Link to="/basket">
              <div className="group flex transform items-center rounded-full border px-2 py-1 hover:border-green-600 hover:bg-green-600  sm:px-3">
                <div className="hidden text-sm font-bold text-neutral-700 group-hover:text-white sm:block">
                  {numItemsInBasket}
                </div>
                <ShoppingBagIcon className='text-neutral-300" h-6 w-6 group-hover:text-white sm:ml-2' />
              </div>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
