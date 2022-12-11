import InSeasonLogo from '../icons/InSeasonLogo';
import { Bars3Icon, ShoppingBagIcon } from '@heroicons/react/24/outline';

export default function Header() {
  return (
    <header className="py-8">
      <nav>
        <ul className="flex items-center justify-between">
          <li>
            <Bars3Icon className='text-neutral-300" h-6 w-6' />
          </li>
          <li>
            <InSeasonLogo />
          </li>
          <li>
            <ShoppingBagIcon className='text-neutral-300" h-6 w-6' />
          </li>
        </ul>
      </nav>
    </header>
  );
}
