import { Navigate } from 'react-router-dom';

interface Props {
  component: JSX.Element;
}

const ProtectedRoute = ({ component }: Props) => {
  const token = localStorage.getItem('adminToken');
  return token ? component : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
