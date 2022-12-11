import FoodCard from './FoodCard';

export default function FoodListSection({ foods }: { foods: Food[] }) {
  return (
    <div>
      {foods.length > 0 ? (
        <div className="mt-10 grid grid-cols-2 gap-y-5 gap-x-5 sm:grid-cols-4 sm:gap-y-7 sm:gap-x-7 lg:grid-cols-6">
          {foods.map((food) => (
            <FoodCard key={food.id} food={food} />
          ))}
        </div>
      ) : (
        <div className="text-center">
          <h2 className="mt-8 text-2xl text-neutral-400">
            No foods were found
          </h2>
        </div>
      )}
    </div>
  );
}
