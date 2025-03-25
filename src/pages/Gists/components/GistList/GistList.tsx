import { Avatar, AvatarImage } from '@app/components/Avatar/Avatar';
import { FC, useMemo, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@app/components/Table/Table';
import { useNavigate, useOutletContext } from 'react-router-dom';

import { Button } from '@app/components/Button/Button';
import CustomPagination from '@app/components/CustomPagination';
import GistItem from '../../../../components/GistItem';
import { GistListProps } from './types';
import Loader from '@app/components/Loader/Loader';
import SVGIcon from '@app/components/SVGIcon';
import TimeAgo from '@app/components/TimeAgo';
import { paths } from '@app/routes/Routes.utils';
import { useGetPublicGistsQuery } from '@app/store/apis/gist';

const GistList: FC<GistListProps> = ({ isGrid }) => {
  const navigate = useNavigate();

  const { search } = useOutletContext<{ search: string }>();

  const [page, setPage] = useState(1);

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
      {!isGrid ? (
        <Table className="border border-border">
          <TableHeader>
            <TableRow className="bg-border">
              <TableHead className="font-bold">Name</TableHead>
              <TableHead>Notebook Name</TableHead>
              <TableHead>Keyword</TableHead>
              <TableHead>Updated</TableHead>
              <TableHead className="text-right" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredGists?.map(gist => (
              <TableRow className="cursor-pointer" key={gist.id} onClick={() => navigate(paths.gistDetails(gist?.id))}>
                <TableCell className="flex items-center space-x-2 text-text">
                  <Avatar>
                    <AvatarImage
                      src={gist?.owner?.avatar_url ?? 'https://randomuser.me/api/portraits/men/45.jpg'}
                      alt={gist?.owner?.login}
                    />
                  </Avatar>
                  <span>{gist?.owner?.login}</span>
                </TableCell>
                <TableCell className="max-w-[50px] overflow-hidden truncate">{gist.description}</TableCell>
                <TableCell>
                  <Button className="rounded-full px-3 py-1">Keyword</Button>
                </TableCell>
                <TableCell>
                  <TimeAgo date={gist?.updated_at} className="text-sm text-text" />
                </TableCell>
                <TableCell>
                  <div className="flex flex-row justify-end gap-4">
                    <SVGIcon icon="fork" className="cursor-pointer" title="Fork" />
                    <SVGIcon icon="star" className="cursor-pointer" title="Star" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="grid-col-1 grid gap-4 md:grid-cols-3">
          {filteredGists?.map(gist => <GistItem gist={gist} />)}
        </div>
      )}

      {/* Pagination */}
      <div className={`mt-3 flex h-[52px] w-full items-center ${isGrid ? 'bg-white' : 'bg-border'} pr-4`}>
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
