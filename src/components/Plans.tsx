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
  },
  {
    name: 'Decadence',
    description:
      'For the most dedicated lovers of exotic fruits and delicacies',
    benefits: [
      'Personal chef and nutritionist services',
      "Private limo to the farmer's market",
      'Exclusive members-only fruit and wine tastings',
      'Complimentary shipments of Kauai Sugarloaf Pineapple',
    ],
    emphasize: false,
    imageUrl: 'images/dragonfruit.webp',
    price: 'BY INVITATION ONLY',
  },
];

export default function Signup() {
  return (
    <div className="mt-24 lg:mt-40 lg:grid lg:grid-cols-3 lg:gap-x-10">
      {plans.map((plan) => (
        <div
          key={plan.name}
          className={clsx(
            'relative mt-20 flex flex-col rounded-xl border border-neutral-200 p-7 shadow lg:mt-0',
            {
              'border-2 border-violet-500 shadow-violet-700': plan.emphasize,
            }
          )}
        >
          <img
            className="absolute top-0 aspect-square h-48 w-48 -translate-y-16 transform"
            src={plan.imageUrl}
          />
          <h3 className="mt-28 text-4xl font-bold text-neutral-600">
            {plan.name}
          </h3>
          <h4
            className={clsx(
              'mt-4 text-2xl font-bold tracking-wide text-amber-500',
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
        </div>
      ))}
    </div>
  );
}
