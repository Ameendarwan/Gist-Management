import * as React from 'react';

import { cn } from '@app/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  startIcon?: React.ReactElement;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, startIcon: StartIcon, ...props }, ref) => {
    return (
      <div className="relative flex items-center">
        <span className="absolute left-[10px] top-[13px] h-5 w-5 text-muted-foreground">{StartIcon}</span>
        <input
          type={type}
          className={cn(
            'flex h-10 w-full rounded-md border border-muted bg-background px-3 py-2 text-base !outline-none ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            StartIcon ? 'pl-[34px]' : '',
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
