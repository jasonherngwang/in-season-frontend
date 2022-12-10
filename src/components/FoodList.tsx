import FoodCard from './FoodCard';

const foods = [
  {
    id: '1',
    name: 'Green Cabbage',
    category: 'vegetable',
    months: [1, 2, 3],
    description: 'A humble green cabbage',
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: '2',
    name: 'Carrot',
    category: 'vegetable',
    months: [3, 4, 5],
    description: 'A humble orange carrot',
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: '3',
    name: 'Watermelon',
    category: 'fruit',
    months: [11, 12, 1],
    description: 'A humble watermelon',
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: '4',
    name: 'Apricot',
    category: 'fruit',
    months: [1, 2, 3],
    description: 'A humble apricot',
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: '5',
    name: 'Beet',
    category: 'vegetable',
    months: [3, 4, 5],
    description: 'A humble beet',
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: '6',
    name: 'Rosemary',
    category: 'other',
    months: [11, 12, 1],
    description: 'A humble rosemary herb',
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: '7',
    name: 'Green Cabbage',
    category: 'vegetable',
    months: [1, 2, 3],
    description: 'A humble green cabbage',
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: '8',
    name: 'A Really Long Name',
    category: 'vegetable',
    months: [3, 4, 5],
    description: 'A humble orange carrot',
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: '9',
    name: 'Watermelon',
    category: 'fruit',
    months: [11, 12, 1],
    description: 'A humble watermelon',
    imageUrl: 'https://via.placeholder.com/150',
  },
];

export default function Foods() {
  return (
    <div className="grid grid-cols-2 gap-y-5 gap-x-5 sm:grid-cols-4 sm:gap-y-7 sm:gap-x-7 lg:grid-cols-6">
      {foods.map((food) => (
        <FoodCard key={food.id} food={food} />
      ))}
    </div>
  );
}
