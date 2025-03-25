import Header from '@app/components/Header';
import Loader from '../Loader/Loader';
import { Outlet } from 'react-router-dom';
import useAuthListener from '@app/hooks/useAuthListener';
import { useState } from 'react';

const Layout = () => {
  const [search, setSearch] = useState('');

  const { loading } = useAuthListener();

  if (loading) return <Loader isFullPageLoader />;

  return (
    <div className="flex w-full flex-col">
      <Header search={search} onSearchChange={setSearch} />
      <main className="w-full px-6 md:px-[118px]">
        <Outlet context={{ search }} />
      </main>
    </div>
  );
};

export default Layout;
