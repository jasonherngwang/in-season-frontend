import { useEffect } from 'react';
import {
  useStateValue,
  setFoodsAction,
  setBasketAction,
  setUserAction,
} from './state';
import {
  Routes,
  Route,
  Navigate,
  useMatch,
  useLocation,
} from 'react-router-dom';

import userService from './services/userService';
import { isLoggedIn } from './utils/tokenManagement';

import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import Banner from './components/Banner';
import Filters from './components/Filters';
import FoodList from './components/FoodList';
import EditFood from './components/EditFood';
import Basket from './components/Basket';
import Login from './components/Login';
import Signup from './components/Signup';
import Plans from './components/Plans';

export default function App() {
  const [, dispatch] = useStateValue();
  const location = useLocation();

  const match = useMatch('/foods/:id/edit');
  const foodId = match ? (match.params.id as string) : '';

  // Fetch all food data on mount, and when navigating back to main screen
  useEffect(() => {
    const fetchFoods = async () => {
      try {
        if (isLoggedIn()) {
          const userData = await userService.getUserData();
          dispatch(setFoodsAction(userData.foods));
          dispatch(setBasketAction(userData.basket));
          dispatch(setUserAction({ username: userData.username }));
        } else {
          const userData = await userService.getTrialUserData();
          dispatch(setFoodsAction(userData.foods));
        }
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
              {!isLoggedIn() && <Banner />}
              <Filters />
              <FoodList />
            </>
          }
        />

        <Route
          path="/basket"
          element={
            <>
              {!isLoggedIn() && <Banner />}
              <Basket />
            </>
          }
        />
        <Route path="/plans" element={<Plans />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}
