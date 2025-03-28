import { Routes as DOMRoutes, Route } from 'react-router-dom';

import CreateGist from '@app/pages/CreateGist';
import GistDetails from '@app/pages/GistDetails';
import Gists from '@app/pages/Gists';
import Layout from '../components/Layout';
import NotFound from '@app/pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import UserGists from '@app/pages/UserGists';
import { paths } from './Routes.utils';

const Routes = () => (
  <DOMRoutes>
    <Route element={<Layout />}>
      <Route path={paths.home} element={<Gists />} />
      <Route path={`${paths.gist}/:id`} element={<GistDetails />} />
      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path={paths.createGist} element={<CreateGist />} />
        <Route path={paths.userGists} element={<UserGists title="All Gists" />} />
        <Route path={paths.starredGists} element={<UserGists title="Starred Gists" isStarred />} />
      </Route>
    </Route>
    <Route path="*" element={<NotFound />} />
  </DOMRoutes>
);

export default Routes;
