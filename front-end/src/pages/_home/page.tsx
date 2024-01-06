import React from 'react';

import ethereumLogo from '@/assets/images/ethereum-logo.png';
import multiversxLogo from '@/assets/images/multiversx-logo.png';
import SectionContainer from '@/components/sections/container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import EEVMRoutesName from '@/constants/evm-routes-name';
import EMultiversXRoutesName from '@/constants/multiversx-routes-name';

const chains = [
  {
    name: 'EVM Compatible',
    logo: ethereumLogo,
    href: EEVMRoutesName.root
  }
  // {
  //   name: 'MultiversX',
  //   logo: multiversxLogo,
  //   href: EMultiversXRoutesName.root
  // }
];

export default function HomePage() {
  return (
    <div className='flex h-full w-full max-w-[1140px] flex-col'>
      <SectionContainer className='flex flex-col items-center justify-center gap-5 p-5 backdrop-blur-md'>
        <h1 className='text-center text-xl md:text-3xl'>
          Select the chain you want to deploy DeFi applications on
        </h1>

        <div className='flex w-full flex-col gap-5 md:flex-row'>
          {chains.map((chain, index) => (
            <a
              key={`${chain.name.toLowerCase()}-${index}`}
              href={chain.href}
              className='w-full md:w-1/2'
            >
              <Card>
                <CardHeader className='text-center'>
                  <CardTitle>{chain.name}</CardTitle>
                </CardHeader>
                <CardContent className='flex justify-center'>
                  <div className='h-2w-24 flex w-24 items-center justify-center rounded-full'>
                    <img alt={`${chain.name}'s logo`} src={chain.logo} />
                  </div>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </SectionContainer>
    </div>
  );
}
