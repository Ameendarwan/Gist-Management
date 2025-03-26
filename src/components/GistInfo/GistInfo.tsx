import { Avatar, AvatarImage } from '../Avatar/Avatar';
import React, { FC } from 'react';

import { GistInfoProps } from './types';
import TimeAgo from '../TimeAgo';

const GistInfo: FC<GistInfoProps> = ({ gist }) => {
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
      <div className="flex flex-col">
        {/* Gist Owner Name */}
        <span className="text-sm font-semibold text-primary" aria-label="Gist owner username">
          {gist?.owner?.login}
        </span>

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
  );
};

export default GistInfo;
