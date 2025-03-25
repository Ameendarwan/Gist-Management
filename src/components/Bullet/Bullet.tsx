import { FC, HTMLAttributes, ReactNode } from 'react';

interface BulletProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  disabled?: boolean;
}

const Bullet: FC<BulletProps> = ({ children, ...props }) => {
  return (
    <div
      {...props}
      className={`min-h-[24px] min-w-[24px] rounded-full bg-primary text-[11px] ${props.className} hover:bg-hover flex aspect-square items-center justify-center ${props.disabled && '!cursor-not-allowed opacity-50'}`}
      style={{ userSelect: 'none' }}>
      {children}
    </div>
  );
};

export default Bullet;
