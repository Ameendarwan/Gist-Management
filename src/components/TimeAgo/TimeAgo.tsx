import { FC } from 'react';
import { formatDistanceToNow } from 'date-fns';

export interface TimeAgoProps {
  date: Date | string | number;
  className?: string;
}

const TimeAgo: FC<TimeAgoProps> = ({ date, className }) => {
  const formattedDate = formatDistanceToNow(new Date(date), { addSuffix: true });

  return <span className={className}>{formattedDate}</span>;
};

export default TimeAgo;
