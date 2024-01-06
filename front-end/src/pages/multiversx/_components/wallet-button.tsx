import React from 'react';

import { useGetIsLoggedIn } from '@multiversx/sdk-dapp/hooks';
import { useLocation } from 'react-router-dom';

import MultiversXAccountDetails from './account-details';
import MultiversXConnectWallet from './connect-wallet';

export default function MultiversXWalletButton() {
  const { pathname: currentPath } = useLocation();

  const isMultiversXUserAuthenticated = useGetIsLoggedIn();

  if (currentPath === '/multiversx') {
    if (isMultiversXUserAuthenticated) {
      return <MultiversXAccountDetails />;
    }

    return <MultiversXConnectWallet />;
  }

  // eslint-disable-next-line unicorn/no-null
  return null;
}
