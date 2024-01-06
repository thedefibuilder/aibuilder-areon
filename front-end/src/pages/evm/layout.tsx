import React, { PropsWithChildren } from 'react';

import Main from '@/components/main';
import Navbar from '@/components/navbar';

import EVMDAppProvider from './wrappers/dapp-provider';

interface IEVMLayout extends PropsWithChildren {}

export default function EVMLayout({ children }: IEVMLayout) {
  return (
    <EVMDAppProvider>
      <Navbar walletButton={<w3m-button />} />

      <Main>{children}</Main>
    </EVMDAppProvider>
  );
}
