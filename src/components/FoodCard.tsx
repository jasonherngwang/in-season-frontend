import { Food } from '../types';

export default function FoodCard({ food }: { food: Food }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-lg shadow-md hover:bg-neutral-50">
      <div className="aspect-square">
        <img
          src={food.imageUrl}
          className="h-full w-full object-cover object-center group-hover:opacity-80 sm:h-full sm:w-full"
        />
      </div>
      <div className=" my-2 p-2 text-center">
        <h3 className="text-lg font-medium text-neutral-700">{food.name}</h3>
        <h4 className="italic text-neutral-400">{food.category}</h4>
      </div>
      <div className="mt-auto">
        <a
          href={''}
          className="relative m-2 flex items-center justify-center rounded-sm border border-transparent bg-neutral-100 py-2 px-2 text-sm font-medium text-gray-800 hover:bg-gray-200"
        >
          Add to Basket
        </a>
      </div>
    </div>
  );
}
