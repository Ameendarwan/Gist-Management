import React, { FC } from 'react';

import PulseLoader from 'react-spinners/PulseLoader';
import RotateLoader from 'react-spinners/RotateLoader';

interface LoaderProps {
  type?: 'rotate' | 'pulse';
  color?: string;
  size?: number;
  isFullPageLoader?: boolean;
}

const loaderMap: Record<string, FC<{ color?: string; size?: number }>> = {
  rotate: RotateLoader,
  pulse: PulseLoader,
};

const Loader: FC<LoaderProps> = ({ type = 'pulse', color = '#003B44', size = 20, isFullPageLoader }) => {
  const SelectedLoader = loaderMap[type];

  if (isFullPageLoader)
    return (
      <div className="flex h-[80vh] w-full items-center justify-center">
        <SelectedLoader color={color} size={size} />
      </div>
    );
  return <SelectedLoader color={color} size={size} />;
};

export default Loader;
