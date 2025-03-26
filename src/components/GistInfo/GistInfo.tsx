import { Avatar, AvatarImage } from '../Avatar/Avatar';
import React, { FC } from 'react';

import { GistInfoProps } from './types';
import TimeAgo from '../TimeAgo';

const GistInfo: FC<GistInfoProps> = ({ gist }) => {
  const firstFileName = Object.keys(gist?.files ?? {})?.[0] ?? '';
  return (
    <div className="flex flex-row gap-3" aria-label="Gist information">
      {/* User Avatar */}
      <Avatar>
        <AvatarImage
          src={gist?.owner?.avatar_url ?? 'https://randomuser.me/api/portraits/men/45.jpg'}
          alt={gist?.owner?.login || 'GitHub user'}
          aria-label="Gist owner avatar"
        />
      </Avatar>

      {/* Gist Details */}
      <div className="flex flex-col gap-1">
        {/* Gist Owner Name */}
        <span className="flex flex-wrap text-wrap text-sm text-primary" aria-label="Gist owner username">
          {gist?.owner?.login} /
          <span className="w-[150px] overflow-hidden truncate text-ellipsis whitespace-nowrap pl-1 font-semibold">
            {firstFileName}
          </span>
        </span>
        <div className="flex flex-col">
          {/* Last Updated Time */}
          <TimeAgo
            date={gist?.updated_at ?? ''}
            className="text-[11px] text-secondaryText"
            aria-label="Gist last updated time"
          />

          {/* Gist Description */}
          <span className="line-clamp-1 w-full text-[11px] text-secondaryText" aria-label="Gist description">
            {gist?.description || 'No description available'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default GistInfo;
