import { useEffect } from 'react';
import { useStateValue, setFoodsAction, setUserAction } from './state';
import { Routes, Route, Outlet, useMatch, useLocation } from 'react-router-dom';

// Services
import foodService from './services/foodService';
import loginService from './services/loginService';
import { setToken, removeToken } from './utils/tokenManagement';

// Components
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import Filters from './components/Filters';
import FoodList from './components/FoodList';
import EditFood from './components/EditFood';
import Login from './components/Login';
import Plans from './components/Plans';

export default function App() {
  const [, dispatch] = useStateValue();
  const location = useLocation();

  const handleLogin = async (username: string, password: string) => {
    try {
      const loggedInUser = await loginService.login({ username, password });
      setToken(loggedInUser);
      dispatch(setUserAction(loggedInUser));
      return loggedInUser;
    } catch (error) {
      return null;
    }
  };

  const handleLogout = () => {
    removeToken();
    dispatch(setUserAction(null));
  };

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
      <Header handleLogout={handleLogout} />

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

        <Route path="/login" element={<Login handleLogin={handleLogin} />} />
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
