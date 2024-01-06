import React, { useState } from 'react';

import { useLocation } from 'react-router-dom';

import EEVMRoutesName from '@/constants/evm-routes-name';
import EMultiversXRoutesName from '@/constants/multiversx-routes-name';
import ERoutesName from '@/constants/routes-name';
import { cn } from '@/lib/utils';

import defiBuilderLogo from '../assets/images/defi-builder-logo.png';
import Anchor from './anchor';

interface INavbar {
  walletButton?: React.ReactNode;
}

const menuLinks = [
  {
    name: 'Home',
    path: ERoutesName.home
  }
  // {
  //   name: 'EVM',
  //   path: EEVMRoutesName.root
  // }
  // {
  //   name: 'MultiversX',
  //   path: EMultiversXRoutesName.root
  // }
];

export default function Navbar({ walletButton }: INavbar) {
  const { pathname: currentPath } = useLocation();

  const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);

  return (
    <header className='fixed z-10 flex w-full items-center justify-center border-b border-border bg-background backdrop-blur-lg'>
      <nav className='flex w-full max-w-[1320px] items-center justify-between p-3 sm:p-5'>
        <img src={defiBuilderLogo} alt="DeFi Builder's logo" className='mr-[2px] h-4 sm:h-6' />

        <div className='flex items-center gap-x-5'>
          {menuLinks.map((link, index) => (
            <Anchor
              key={`${link.name.toLowerCase()}-${index}`}
              href={link.path}
              target='_self'
              className={cn('hidden md:flex', { 'text-[#8AEBFC]': currentPath === link.path })}
            >
              {link.name}
            </Anchor>
          ))}
          <div className={isMobileMenuActive ? 'menu_ic' : 'cancel_ic'}>
            <button
              onClick={() => setIsMobileMenuActive((previousState) => !previousState)}
              className='flex w-[30px] items-center justify-center rounded-lg bg-gradient-to-b from-gradient to-gradient-foreground sm:w-[40px] md:hidden'
            >
              <img src='/img/menu.svg' alt='' className='menu h-[30px] w-6 sm:h-9' />
              <img src='/img/cancel.svg' alt='' className='cancel h-[30px] w-6 sm:h-9' />
            </button>

            <div
              className={
                isMobileMenuActive
                  ? 'add fixed left-0  top-[66px] z-10 flex h-[220px] w-[100%] flex-col items-center gap-y-5 bg-card pt-6 duration-300 ease-out sm:top-[80px]'
                  : 'remove fixed left-0  top-[-220px] z-10 flex h-[220px] w-[100%] flex-col items-center gap-y-5 bg-card pt-6 duration-300 ease-out'
              }
            >
              {menuLinks.map((link, index) => (
                <Anchor
                  key={`${link.name.toLowerCase()}-${index}`}
                  href={link.path}
                  target='_self'
                  className={currentPath === link.path ? 'text-[#8AEBFC]' : ''}
                >
                  {link.name}
                </Anchor>
              ))}
            </div>
          </div>
          {walletButton}
        </div>
      </nav>
    </header>
  );
}
