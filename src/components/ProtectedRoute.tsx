import { Navigate, useLocation } from 'react-router-dom';

import { tokenExpired } from '../utils/tokenManagement';

type ProtectedRouteProps = {
  redirectPath?: string;
  children?: any;
};

const ProtectedRoute = ({
  redirectPath = '/login',
  children,
}: ProtectedRouteProps) => {
  const location = useLocation();

  if (tokenExpired()) {
    // Use `state` to remember the route originally requested; redirect after login
    return <Navigate to={redirectPath} replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
