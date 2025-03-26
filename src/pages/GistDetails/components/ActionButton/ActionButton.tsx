import React, { FC } from 'react';

import { ActionButtonProps } from './types';
import { Button } from '@app/components/Button/Button';
import SVGIcon from '@app/components/SVGIcon';

const ActionButton: FC<ActionButtonProps> = ({ title, count, isDisabled, handleClick }) => {
  return (
    <Button
      disabled={isDisabled}
      className="m-0 flex h-10 cursor-pointer flex-row items-center gap-0 rounded-md border border-primary bg-white p-0 hover:bg-transparent"
      onClick={handleClick}
      aria-label={`${title} button, count: ${count}`}>
      <div className="flex h-full flex-row items-center gap-2 !bg-primary px-4" aria-label={`${title} icon and label`}>
        <SVGIcon icon="fork" className="cursor-pointer" title={title} color="fill-white" />
        <span className="text-sm font-semibold text-white">{title}</span>
      </div>
      <span className="px-4 text-sm font-semibold text-primary" aria-label={`${title} count`}>
        {count ?? 0}
      </span>
    </Button>
  );
};

export default ActionButton;
