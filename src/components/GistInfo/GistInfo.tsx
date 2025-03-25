import { Avatar, AvatarImage } from '../Avatar/Avatar';
import React, { FC } from 'react';

import { GistInfoProps } from './types';
import TimeAgo from '../TimeAgo';

const GistInfo: FC<GistInfoProps> = ({ gist }) => {
  return (
    <div className="flex flex-row gap-3">
      <Avatar>
        <AvatarImage
          src={gist?.owner?.avatar_url ?? 'https://randomuser.me/api/portraits/men/45.jpg'}
          alt={gist?.owner?.login}
        />
      </Avatar>
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-primary">{gist?.owner?.login}</span>
        <TimeAgo date={gist?.updated_at ?? ''} className="text-[11px] text-secondaryText" />
        <span className="line-clamp-1 w-full text-[11px] text-secondaryText">
          {gist?.description || 'No description available'}
        </span>
      </div>
    </div>
  );
};

export default GistInfo;
