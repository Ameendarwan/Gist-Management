import { IconProps, icons } from '@app/components/SVGIcon/SVGIcon.utils';

import { FC } from 'react';

const SVGIcon: FC<IconProps> = ({ onClick, icon, width, height, color, className, stroke, strokeWidth, title }) => {
  const IconComponent = icons[icon];
  return IconComponent ? (
    <span onClick={onClick}>{IconComponent({ width, height, color, className, stroke, strokeWidth, title })}</span>
  ) : null;
};

export default SVGIcon;
