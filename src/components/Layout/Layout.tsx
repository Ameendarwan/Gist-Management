import Header from '@app/components/Header';
import Loader from '../Loader/Loader';
import { Outlet } from 'react-router-dom';
import useAuthListener from '@app/hooks/useAuthListener';
import { useState } from 'react';

const Layout = () => {
  const [search, setSearch] = useState('');

  const { loading } = useAuthListener();

  // Show a full-page loader while authentication status is being checked
  if (loading) return <Loader isFullPageLoader aria-label="Loading content" />;

  return (
    <div className="flex w-full flex-col" aria-label="Application layout">
      {/* Header with search functionality */}
      <Header search={search} onSearchChange={setSearch} />

      {/* Main content section */}
      <main className="w-full px-6 md:px-[118px]" aria-label="Main content">
        <Outlet context={{ search }} />
      </main>
    </div>
  );
};

export default Layout;
