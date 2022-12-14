import { Navigate } from 'react-router-dom';
import { User } from '../types';

type ProtectedRouteProps = {
  user: User;
  children: any;
};

const ProtectedRoute = ({ user, children }: ProtectedRouteProps) => {
  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
