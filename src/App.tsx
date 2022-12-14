import { useEffect } from 'react';
import { useStateValue, setFoodsAction } from './state';
import { Routes, Route, useMatch, useLocation } from 'react-router-dom';

import foodService from './services/foodService';

import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import Filters from './components/Filters';
import FoodList from './components/FoodList';
import EditFood from './components/EditFood';
import Login from './components/Login';
import Signup from './components/Signup';
import Plans from './components/Plans';

export default function App() {
  const [, dispatch] = useStateValue();
  const location = useLocation();

  const match = useMatch('/foods/:id/edit');
  const foodId = match ? match.params.id : null;

  // Fetch all food data on mount
  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const foods = await foodService.getAll();
        dispatch(setFoodsAction(foods));
      } catch (error) {
        console.error(error);
      }
    };
    void fetchFoods();
  }, [dispatch, location]);

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
      <Header />

      <Routes>
        <Route
          path="/foods/:id/edit"
          element={
            <ProtectedRoute>
              <EditFood foodId={foodId} action="edit" />
            </ProtectedRoute>
          }
        />

        <Route
          path="/foods/add"
          element={
            <ProtectedRoute>
              <EditFood foodId={''} action="add" />
            </ProtectedRoute>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          index
          path="/"
          element={
            <>
              <Filters />
              <FoodList />
            </>
          }
        />

        <Route path="/plans" element={<Plans />} />
      </Routes>
    </div>
  );
}
