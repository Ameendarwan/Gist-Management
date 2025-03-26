import React, { FC } from 'react';

import { Button } from '../Button/Button';
import { GistActionIconsProps } from './types';
import SVGIcon from '../SVGIcon';
import useAuthListener from '@app/hooks/useAuthListener';
import { useGistActions } from '@app/hooks/useGistActions';

const GistActionIcons: FC<GistActionIconsProps> = ({ gistId, isStarred }) => {
  const { user } = useAuthListener();
  const { handleStarGist, handleForkGist } = useGistActions();
  return (
    <>
      <Button
        disabled={!user}
        className="m-0 max-h-max max-w-max bg-transparent p-0 hover:bg-transparent"
        onClick={ev => {
          ev.stopPropagation();
          handleForkGist(gistId ?? '');
        }}
        aria-label="Fork this gist">
        <SVGIcon icon="fork" className="cursor-pointer" title="Fork" />
      </Button>
      <Button
        disabled={!user}
        className="m-0 max-h-max max-w-max bg-transparent p-0 hover:bg-transparent"
        onClick={ev => {
          ev.stopPropagation();
          handleStarGist(gistId ?? '');
        }}
        aria-label={isStarred ? 'Unstar this gist' : 'Star this gist'}>
        <SVGIcon icon={isStarred ? 'filledStar' : 'star'} title="Star" />
      </Button>
    </>
  );
};

export default GistActionIcons;
