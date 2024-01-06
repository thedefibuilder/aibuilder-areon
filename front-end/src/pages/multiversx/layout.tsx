import React, { PropsWithChildren, Suspense } from 'react';

import {
  NotificationModal,
  SignTransactionsModals,
  TransactionsToastList
} from '@multiversx/sdk-dapp/UI';

import Main from '@/components/main';
import Navbar from '@/components/navbar';
import { Skeleton } from '@/components/ui/skeleton';

import MultiversXWalletButton from './_components/wallet-button';
import MultiversXAuthWrapper from './wrappers/auth-wrapper';
import MultiversXDAppProvider from './wrappers/dapp-provider';

interface IMultiversXLayout extends PropsWithChildren {}

export default function MultiversXLayout({ children }: IMultiversXLayout) {
  return (
    <Suspense fallback={<Skeleton className='h-full w-full' />}>
      <MultiversXDAppProvider>
        <MultiversXAuthWrapper>
          <Navbar
            walletButton={
              <Suspense fallback={<Skeleton className='h-full w-10' />}>
                <MultiversXWalletButton />
              </Suspense>
            }
          />

          <Main>{children}</Main>

          {/* MultiversX UI elements */}
          <TransactionsToastList className='!text-secondary-foreground [&>div>button]:!text-secondary-foreground [&>div>div>div>div>div>button]:!text-secondary-foreground [&>div]:!bg-secondary' />
          <NotificationModal />
          <SignTransactionsModals className='!text-secondary-foreground [&>div]:border-border [&>div]:bg-secondary' />
        </MultiversXAuthWrapper>
      </MultiversXDAppProvider>
    </Suspense>
  );
}
