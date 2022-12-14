import { useEffect, useState } from 'react';
import { useStateValue, setFoodsAction, setUserAction } from './state';
import {
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
  useMatch,
  useLocation,
} from 'react-router-dom';

// Services
import foodService from './services/foodService';
import loginService from './services/loginService';
import { setToken, removeToken, Token, getUser } from './utils/tokenManagement';

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

  const handleLogin = async (
    username: string,
    password: string
  ): Promise<Token> => {
    try {
      const loggedInUser = await loginService.login({ username, password });
      setToken(loggedInUser);
      dispatch(setUserAction(loggedInUser));
      console.log('Logged in as ' + username);
      return loggedInUser;
    } catch (error) {
      console.error('Incorrect credentials', error);
      return null;
    }
  };

  const handleLogout = () => {
    removeToken();
    dispatch(setUserAction(null));
    console.log('Logged out');
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
            <ProtectedRoute user={getUser()}>
              <EditFood foodId={foodId} action="edit" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/foods/add"
          element={
            <ProtectedRoute user={getUser()}>
              <EditFood foodId={''} action="add" />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login handleLogin={handleLogin} />} />
        <Route
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
