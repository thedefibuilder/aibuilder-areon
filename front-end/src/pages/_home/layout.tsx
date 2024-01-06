import React, { PropsWithChildren } from 'react';

import Main from '@/components/main';
import Navbar from '@/components/navbar';

interface IHomeLayout extends PropsWithChildren {}

export default function HomeLayout({ children }: IHomeLayout) {
  return (
    <>
      <Navbar />

      <Main>{children}</Main>
    </>
  );
}
