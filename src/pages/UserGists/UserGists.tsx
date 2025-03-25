import React, { FC, useState } from 'react';
import { useGetStarredGistsQuery, useGetUserGistsQuery } from '@app/store/apis/gist';

import Bullet from '@app/components/Bullet';
import { Button } from '@app/components/Button/Button';
import CustomPagination from '@app/components/CustomPagination';
import GistItem from '@app/components/GistItem';
import Loader from '@app/components/Loader/Loader';
import { UserGistsProps } from './types';

const UserGists: FC<UserGistsProps> = ({ title, isStarred }) => {
  const [page, setPage] = useState(1);

  const { data: gists, isLoading } = isStarred
    ? useGetStarredGistsQuery({ page, perPage: 2 })
    : useGetUserGistsQuery({ page, perPage: 2 });

  const totalPages = 14;

  const handleOpenGitHubProfile = () => {
    window.open(`https://github.com/${gists?.[0]?.owner?.login}`, '_blank');
  };

  if (isLoading) return <Loader isFullPageLoader />;

  return (
    <div className="flex flex-col">
      <div className="flex w-full flex-col gap-6 md:flex-row md:gap-12">
        {!isStarred && (
          <div className="flex flex-col gap-4">
            <img src={gists?.[0]?.owner?.avatar_url ?? ''} alt="photo" className="rounded-full" />
            <h2 className="self-center text-[25px] text-text">{gists?.[0]?.owner?.login ?? ''}</h2>
            <Button onClick={handleOpenGitHubProfile}>View GitHub Profile</Button>
          </div>
        )}
        <div className="flex w-full flex-col gap-3">
          <div className="flex flex-row items-center gap-2">
            <h2 className="text-[25px] text-text">{title}</h2>
            <Bullet className="text-white">{gists?.length ?? 0}</Bullet>
          </div>

          <div className="flex w-full flex-col gap-3">
            {gists?.map(gist => <GistItem key={gist?.id} gist={gist} />)}
          </div>
        </div>
      </div>

      <div className={`mt-3 flex h-[52px] w-full items-center bg-white pr-4`}>
        <CustomPagination
          totalPages={totalPages}
          page={page}
          onPageChange={setPage}
          className="flex items-center justify-end gap-2 text-text"
        />
      </div>
    </div>
  );
};

export default UserGists;
