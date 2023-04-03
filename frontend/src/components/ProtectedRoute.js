import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const ProtectedRoute = ({ element: Component, ...props }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!props.isLoggedIn) {
      navigate('/signin', { replace: true });
    }
  }, [props.isLoggedIn]);

  return (
    <Component {...props} />
  )
};

export default ProtectedRoute;