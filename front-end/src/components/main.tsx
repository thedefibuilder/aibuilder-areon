import React, { PropsWithChildren } from 'react';

import mainBG from '@/assets/images/main-bg.svg';
import { cn } from '@/lib/utils';

interface IMain extends PropsWithChildren, React.HTMLAttributes<HTMLDivElement> {}

export default function Main({ children, className, ...properties }: IMain) {
  return (
    <main
      className={cn(
        'flex h-full w-full justify-center px-0.5 pb-12 pt-28 sm:pb-20 sm:pt-40',
        className
      )}
      style={{
        background: `url(${mainBG}) no-repeat center top`
      }}
      {...properties}
    >
      {children}
    </main>
  );
}
