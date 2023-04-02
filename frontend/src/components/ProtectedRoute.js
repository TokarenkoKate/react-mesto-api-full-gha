import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, ...props }) => {
  const navigate = useNavigate();
  return (
    props.isLoggedIn ? <Component {...props} /> : navigate('/signin', { replace: true })
  )
};

export default ProtectedRoute;