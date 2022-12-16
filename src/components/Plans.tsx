import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

const plans = [
  {
    name: 'Organic',
    description: 'A great way to start eating with the seasons',
    benefits: [
      'View foods in season for Southern California',
      "Create a shopping basket for trips to the farmer's market",
      'Look at nice watercolor images of food',
    ],
    emphasize: false,
    imageUrl: 'images/apricot.webp',
    price: 'FREE',
    extra: '',
  },
  {
    name: 'Heirloom',
    description:
      'The best way to try out this CRUD app made during Capstone Prep',
    benefits: [
      'Create, edit, and delete your own custom foods',
      'Edit details and seasonality',
      'Upload images to AWS S3',
      'Store data in a MongoDB document database',
      'Experience low latency from the AWS Cloudfront CDN',
      'Automatic Docker container scaling by AWS ECS',
    ],
    emphasize: true,
    imageUrl: 'images/fig.webp',
    price: 'ALWAYS FREE',
    extra: '',
  },
  {
    name: 'Decadence',
    description:
      'For the most dedicated connoisseurs of exotic fruits and delicacies',
    benefits: [
      'Personal chef and nutritionist services',
      "Private limo to the farmer's market",
      'Exclusive members-only fruit and wine tastings',
      'Complimentary shipments of Kauai Sugarloaf Pineapple',
    ],
    emphasize: false,
    imageUrl: 'images/dragonfruit.webp',
    price: 'BY INVITATION ONLY',
    extra:
      'To request an invitation, complete Launch School Core with top marks.',
  },
];

export default function Plans() {
  return (
    <div className="mx-auto mt-6 flex flex-col items-center md:mt-20">
      <h2 className="text-2xl font-bold text-neutral-700 md:text-3xl">
        Plans and Pricing
      </h2>
      <div className="mt-8 lg:mt-32 lg:grid lg:grid-cols-3 lg:gap-x-8">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={clsx(
              'relative mt-20 flex flex-col rounded-xl border border-neutral-200 p-7 shadow',
              {
                'border-2 border-violet-500 shadow-xl shadow-violet-600/50 lg:mt-0':
                  plan.emphasize,
                'last:mt-28 lg:mt-10 lg:h-5/6 last:lg:mt-10': !plan.emphasize,
              }
            )}
          >
            <img
              className={clsx(
                'absolute top-0 aspect-square h-40 w-40 -translate-y-16 transform sm:h-48 sm:w-48',
                {
                  'lg:h-56 lg:w-56': plan.emphasize,
                }
              )}
              src={plan.imageUrl}
            />
            <h3
              className={clsx(
                'mt-20 text-3xl font-bold text-neutral-600 sm:mt-28 sm:text-4xl',
                {
                  'text-violet-900 sm:text-5xl lg:mt-36': plan.emphasize,
                }
              )}
            >
              {plan.name}
            </h3>
            <h4
              className={clsx(
                'mt-4 text-xl font-bold tracking-wide text-amber-500 sm:text-2xl',
                { 'text-rose-500': plan.name === 'Decadence' }
              )}
            >
              {plan.price}
            </h4>
            <p className="mt-4 text-lg">{plan.description}</p>
            <ul className="mt-2">
              {plan.benefits.map((benefit) => (
                <li key={benefit} className="mt-4 flex">
                  <CheckCircleIcon className="h-8 w-8 flex-shrink-0 stroke-green-600" />
                  <span className="ml-3 mt-1 text-gray-500">{benefit}</span>
                </li>
              ))}
            </ul>
            {plan.emphasize && (
              <Link
                to="/signup"
                className="mt-8 flex w-full justify-center rounded-md border-transparent bg-violet-700 py-3 px-4 font-medium tracking-wider text-white hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-offset-2 active:bg-violet-800"
                type="submit"
              >
                Sign Up
              </Link>
            )}
            {plan.extra && (
              <p className="mt-6 text-neutral-300">{plan.extra}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
