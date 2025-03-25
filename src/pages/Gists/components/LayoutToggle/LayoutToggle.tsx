import { Button } from '@app/components/Button/Button';
import { FC } from 'react';
import { LayoutToggleProps } from './types';
import SVGIcon from '@app/components/SVGIcon';

const LayoutToggle: FC<LayoutToggleProps> = ({ isGrid, setIsGrid }) => {
  return (
    <div className="flex items-center">
      <Button
        title="Grid"
        variant="ghost"
        onClick={() => setIsGrid(true)}
        className={`${isGrid ? '!bg-border' : '!bg-white'} h-[36px] rounded-none rounded-bl-md rounded-tl-md border border-r border-border px-[11px]`}>
        <SVGIcon icon="grid" color={isGrid ? 'fill-primary' : 'fill-lightText'} />
      </Button>
      <Button
        title="List"
        variant="ghost"
        onClick={() => setIsGrid(false)}
        className={`${!isGrid ? '!bg-border' : '!bg-white'} h-[36px] rounded-none rounded-br-md rounded-tr-md border border-r border-border px-[11px] py-[14px]`}>
        <SVGIcon icon="list" color={!isGrid ? 'fill-primary' : '!fill-lightText'} />
      </Button>
    </div>
  );
};

export default LayoutToggle;
