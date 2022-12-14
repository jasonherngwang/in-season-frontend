import { useState } from 'react';
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
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const login = async (e: React.FormEvent) => {
    e.preventDefault();

    // const user = await handleLogin(username, password);
    // if (user) {
    //   navigate('/');
    // } else {
    //   setError('Incorrect username and/or password.');
    // }
  };

  return (
    <>
      {/* Plans and Pricing */}
      <div className="mt-40 lg:grid lg:grid-cols-3 lg:gap-x-10">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="border-neutral-20 relative mt-20 flex flex-col rounded-xl border p-8 shadow lg:mt-0"
          >
            <img
              className="absolute top-0 aspect-square h-48 w-48 -translate-y-16 transform"
              src={plan.imageUrl}
            />
            <h3 className="mt-28 text-4xl font-bold text-neutral-600">
              {plan.name}
            </h3>
            <h4 className="mt-4 text-2xl font-bold tracking-wide text-amber-500">
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
          </div>
        ))}
      </div>
      {/* Signup Form */}
      <div className="mx-auto mt-8 w-full max-w-2xl rounded-md bg-neutral-50 px-4 pt-4 pb-5 shadow-lg">
        <form onSubmit={login} className="flex gap-x-8">
          <div className="flex-1">
            <label
              htmlFor="username"
              className="block text-lg font-medium text-neutral-500"
            >
              Username
            </label>
            <div className="mt-2 basis-1/2">
              <input
                type="text"
                name="username"
                id="username"
                value={username}
                required
                className="block w-full appearance-none rounded-md border-neutral-300 shadow-sm focus:border-green-600 focus:ring-green-600"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          <div className="flex-1">
            <label
              htmlFor="password"
              className="block text-lg font-medium text-neutral-500"
            >
              Password
            </label>
            <div className="mt-2 basis-1/2">
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                required
                className="block w-full appearance-none rounded-md border-neutral-300 shadow-sm focus:border-green-600 focus:ring-green-600 sm:max-w-sm"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          {/* {error && (
            <div className="mt-4">
              <p className="text-red-500">{error}</p>
            </div>
          )}
          <div className="mt-8">
            <button
              className="flex w-full justify-center rounded-md border-transparent bg-green-600 py-3 px-4 font-medium uppercase tracking-wider text-white hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 active:bg-green-700"
              type="submit"
            >
              Login
            </button>
          </div> */}
        </form>
      </div>
    </>
  );
}
