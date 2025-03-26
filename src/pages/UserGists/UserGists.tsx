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

  // Fetch starred gists or user gists based on `isStarred` flag
  const { data: gists, isLoading } = isStarred
    ? useGetStarredGistsQuery({ page, perPage: 2 })
    : useGetUserGistsQuery({ page, perPage: 2 });

  const totalPages = 14; // Hardcoded total pages (could be dynamic in a real scenario)

  // Open the GitHub profile of the gist owner in a new tab
  const handleOpenGitHubProfile = () => {
    window.open(`https://github.com/${gists?.[0]?.owner?.login}`, '_blank');
  };

  // Show loader while fetching gists
  if (isLoading) return <Loader isFullPageLoader aria-label="Loading gists" />;

  return (
    <div className="flex flex-col" aria-label="User Gists Section">
      <div className="flex w-full flex-col gap-6 md:flex-row md:gap-12">
        {/* User Profile Section (Only visible if not viewing starred gists) */}
        {!isStarred && (
          <div className="flex flex-col gap-4" aria-label="User Profile">
            {/* User Avatar */}
            <img
              src={gists?.[0]?.owner?.avatar_url ?? ''}
              alt="User avatar"
              className="rounded-full"
              aria-label="User Avatar"
            />
            {/* GitHub Username */}
            <h2 className="self-center text-[25px] text-text" aria-label="Username">
              {gists?.[0]?.owner?.login ?? ''}
            </h2>
            {/* View GitHub Profile Button */}
            <Button onClick={handleOpenGitHubProfile} aria-label="View GitHub Profile Button">
              View GitHub Profile
            </Button>
          </div>
        )}

        {/* Gist List Section */}
        <div className="flex w-full flex-col gap-3" aria-label="Gist List">
          {/* Section Title with Gist Count */}
          <div className="flex flex-row items-center gap-2" aria-label="Gist Title Section">
            <h2 className="text-[25px] text-text" aria-label="Gist Title">
              {title}
            </h2>
            <Bullet className="text-white" aria-label="Gist Count">
              {gists?.length ?? 0}
            </Bullet>
          </div>

          {/* List of Gists */}
          <div className="flex w-full flex-col gap-3" aria-label="Gist Items">
            {gists?.map(gist => <GistItem key={gist?.id} gist={gist} aria-label="Gist Item" isStarred={isStarred} />)}
          </div>
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="mt-3 flex h-[52px] w-full items-center bg-white pr-4" aria-label="Pagination Section">
        <CustomPagination
          totalPages={totalPages}
          page={page}
          onPageChange={setPage}
          className="flex items-center justify-end gap-2 text-text"
          aria-label="Pagination Controls"
        />
      </div>
    </div>
  );
};

export default UserGists;
