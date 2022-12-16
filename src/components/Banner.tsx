import { Link } from 'react-router-dom';
import { isLoggedIn } from '../utils/tokenManagement';
import { ArrowRightIcon } from '@heroicons/react/20/solid';

export default function Banner() {
  return (
    <div className="mx-auto mb-6 flex w-full max-w-3xl items-center justify-center rounded-xl border border-neutral-200 py-3 px-4 shadow-lg sm:mb-14">
      <p className="text-neutral-500">
        Sign up for{' '}
        <span className="font-medium text-violet-700">Heirloom</span> to create
        custom foods and save your basket.
      </p>
      <Link
        to="/plans"
        className="ml-6 flex items-center rounded-full bg-violet-700 px-3 py-1 text-sm text-white hover:bg-violet-600"
      >
        <div className="tracking-wider">View plans</div>
        <ArrowRightIcon className="ml-1 h-5 w-5 flex-shrink-0 text-white" />
      </Link>
    </div>
  );
}
