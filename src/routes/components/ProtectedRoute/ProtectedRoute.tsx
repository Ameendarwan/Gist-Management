import { Navigate, Outlet } from 'react-router-dom';

import Loader from '@app/components/Loader/Loader';
import { paths } from '@app/routes/Routes.utils';
import useAuthListener from '@app/hooks/useAuthListener';

const ProtectedRoute = () => {
  const { user, loading } = useAuthListener();

  if (loading) return <Loader isFullPageLoader />;

  return user ? <Outlet /> : <Navigate to={paths.home} replace />;
};

export default ProtectedRoute;
