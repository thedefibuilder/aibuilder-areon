import React, { PropsWithChildren } from 'react';

import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react';
import { WagmiConfig } from 'wagmi';
import { arbitrum, bsc, gnosis, linea, mainnet, polygon, polygonZkEvm, zkSync } from 'wagmi/chains';

import { lightLink } from '@/chains/light-link';
import { modeNetwork } from '@/chains/mode-network';

interface IEVMDAppProvider extends PropsWithChildren {}

const chains = [
  arbitrum,
  bsc,
  mainnet,
  gnosis,
  lightLink,
  linea,
  modeNetwork,
  polygon,
  polygonZkEvm,
  zkSync
];
const projectId = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID || '';
const metadata = {
  name: 'DeFi Builder',
  description: 'DeFi Builder',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/142919060']
};

const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

createWeb3Modal({ wagmiConfig, projectId, chains });

export default function EVMDAppProvider({ children }: IEVMDAppProvider) {
  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>;
}
