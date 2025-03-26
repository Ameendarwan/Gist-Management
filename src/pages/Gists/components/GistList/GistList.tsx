import { FC, useMemo, useState } from 'react';

import CustomPagination from '@app/components/CustomPagination';
import GistItem from '../../../../components/GistItem';
import { GistListProps } from './types';
import GistTable from '../GistTable';
import Loader from '@app/components/Loader/Loader';
import { useGetPublicGistsQuery } from '@app/store/apis/gist';
import { useOutletContext } from 'react-router-dom';

const GistList: FC<GistListProps> = ({ isGrid }) => {
  const { search } = useOutletContext<{ search: string }>();

  const [page, setPage] = useState(1);
  const [starredGists] = useState<{ [key: string]: boolean }>({});

  const { data: gists, isLoading, isError } = useGetPublicGistsQuery({ page, perPage: isGrid ? 6 : 10 });

  const totalPages = 14;

  const filteredGists = useMemo(
    () => gists?.filter(gist => gist?.description?.toLowerCase().includes(search?.toLowerCase())),
    [gists, search]
  );

  if (isLoading) return <Loader isFullPageLoader />;
  if (isError) return <p className="text-center text-destructive">Error loading gists.</p>;
  return (
    <div className="flex w-full flex-col">
      {/* List View */}
      {!isGrid ? (
        <GistTable gists={filteredGists ?? []} starredGists={starredGists ?? {}} />
      ) : (
        <div className="grid-col-1 grid gap-4 md:grid-cols-3">
          {/* Grid View */}
          {filteredGists?.map(gist => <GistItem gist={gist} isStarred={starredGists[gist.id]} />)}
        </div>
      )}

      {/* Pagination */}
      <div
        className={`flex h-[52px] w-full items-center rounded-bl-md rounded-br-md ${isGrid ? 'mt-3 bg-white' : 'bg-border'} pr-4`}>
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

export default GistList;
