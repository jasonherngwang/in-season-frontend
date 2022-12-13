import { useEffect, useState } from 'react';
import { useStateValue, setFoodsAction, setUserAction } from './state';
import {
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
  useMatch,
} from 'react-router-dom';

// Services
import foodService from './services/foodService';
import loginService from './services/loginService';
import { setToken, removeToken, Token } from './utils/tokenManagement';

// Components
import Header from './components/Header';
import Filters from './components/Filters';
import FoodList from './components/FoodList';
import EditFood from './components/EditFood';
import Login from './components/Login';

export default function App() {
  const [, dispatch] = useStateValue();

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
  }, [dispatch]);

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
      <Header handleLogout={handleLogout} />
      <Routes>
        <Route
          path="/foods/:id/edit"
          element={<EditFood foodId={foodId} action="edit" />}
        />
        <Route
          path="/foods/add"
          element={<EditFood foodId={''} action="add" />}
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
      </Routes>
    </div>
  );
}
