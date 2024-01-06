import { Chain } from 'viem';

export const areonNetwork = {
  id: 463,
  name: 'Areon Network Mainnet',
  network: 'areonNetwork',
  nativeCurrency: {
    decimals: 18,
    name: 'Ethereum',
    symbol: 'ETH'
  },
  rpcUrls: {
    public: {
      http: ['https://mainnet-rpc.areon.network']
    },
    default: { http: ['https://mainnet-rpc.areon.network'] }
  },
  blockExplorers: {
    etherscan: { name: 'areonNetwork', url: 'https://areonscan.com/' },
    default: { name: 'areonNetwork', url: 'https://areonscan.com/' }
  },
  contracts: {}
} as const satisfies Chain;
