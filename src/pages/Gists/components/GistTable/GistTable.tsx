import { Avatar, AvatarImage } from '@app/components/Avatar/Avatar';
import React, { FC } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@app/components/Table/Table';

import { Button } from '@app/components/Button/Button';
import GistActionIcons from '@app/components/GistActionIcons';
import { GistTableProps } from './types';
import TimeAgo from '@app/components/TimeAgo';
import { paths } from '@app/routes/Routes.utils';
import { useNavigate } from 'react-router-dom';

const GistTable: FC<GistTableProps> = ({ gists, starredGists }) => {
  const navigate = useNavigate();

  return (
    <Table className="rounded-md border border-border" aria-label="List of Gists">
      <TableHeader className="rounded-md">
        <TableRow className="bg-border">
          <TableHead className="font-bold">Name</TableHead>
          <TableHead>Notebook Name</TableHead>
          <TableHead>Keyword</TableHead>
          <TableHead>Updated</TableHead>
          <TableHead className="text-right" aria-hidden="true" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {gists?.map(gist => (
          <TableRow
            className="cursor-pointer"
            key={gist.id}
            onClick={() => navigate(paths.gistDetails(gist?.id))}
            aria-label={`Gist by ${gist?.owner?.login}`}>
            <TableCell className="flex items-center space-x-2 text-text">
              <Avatar>
                <AvatarImage
                  src={gist?.owner?.avatar_url ?? 'https://randomuser.me/api/portraits/men/45.jpg'}
                  alt={`Avatar of ${gist?.owner?.login}`}
                />
              </Avatar>
              <span>{gist?.owner?.login}</span>
            </TableCell>
            <TableCell className="max-w-[50px] overflow-hidden truncate text-text" aria-label="Notebook Name">
              {gist.description}
            </TableCell>
            <TableCell>
              <Button className="rounded-full px-3 py-1 text-[11px] font-bold" aria-label="Keyword Button">
                Keyword
              </Button>
            </TableCell>
            <TableCell>
              <TimeAgo
                date={gist?.updated_at}
                className="text-sm text-text"
                aria-label={`Updated ${gist?.updated_at}`}
              />
            </TableCell>
            <TableCell>
              <div className="flex flex-row justify-end gap-4 pr-2" aria-label="Gist Actions">
                <GistActionIcons gistId={gist.id ?? ''} isStarred={starredGists?.[gist.id]} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default GistTable;
