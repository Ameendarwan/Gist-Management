import React, { FC } from 'react';

import { GistActionIconsProps } from './types';
import SVGIcon from '../SVGIcon';
import { useGistActions } from '@app/hooks/useGistActions';

const GistActionIcons: FC<GistActionIconsProps> = ({ gistId, isStarred }) => {
  const { handleStarGist, handleForkGist } = useGistActions();
  return (
    <>
      <div
        onClick={ev => {
          ev.stopPropagation();
          handleForkGist(gistId ?? '');
        }}
        role="button"
        tabIndex={0}
        aria-label="Fork this gist"
        onKeyDown={ev => {
          if (ev.key === 'Enter' || ev.key === ' ') {
            ev.stopPropagation();
            handleForkGist(gistId ?? '');
          }
        }}>
        <SVGIcon icon="fork" className="cursor-pointer" title="Fork" />
      </div>
      <div
        onClick={ev => {
          ev.stopPropagation();
          handleStarGist(gistId ?? '');
        }}
        role="button"
        tabIndex={0}
        aria-label={isStarred ? 'Unstar this gist' : 'Star this gist'}
        onKeyDown={ev => {
          if (ev.key === 'Enter' || ev.key === ' ') {
            ev.stopPropagation();
            handleStarGist(gistId ?? '');
          }
        }}>
        <SVGIcon icon={isStarred ? 'filledStar' : 'star'} title="Star" />
      </div>
    </>
  );
};

export default GistActionIcons;
