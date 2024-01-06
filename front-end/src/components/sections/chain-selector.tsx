import React, { useEffect, useState } from 'react';

import ArrowLeft from '@/assets/images/arrow-left.svg';
import stepBackground from '@/assets/images/step.svg';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { IChain } from '@/sdk/src/db-schemas/ChainSchema';
import useSelectedChainStore from '@/store/selected-chain';

import Image from '../image';
import { Button } from '../ui/button';
import SectionContainer from './container';

interface IChainSelectorSection {
  chainsData: IChain[] | undefined;
  onChangeSelectedChain?(value: string): void;
}

export default function ChainSelectorSection({
  chainsData,
  onChangeSelectedChain
}: IChainSelectorSection) {
  const selectedChain = useSelectedChainStore((store) => store.selectedChain);

  const [selectedChainIndex, setSelectedChainIndex] = useState(0);

  useEffect(() => {
    let chainIndex = 0;

    if (chainsData) {
      const _chainIndex = chainsData.findIndex((data) => data.chainName === selectedChain);
      chainIndex = _chainIndex === -1 ? 0 : _chainIndex;
    }

    setSelectedChainIndex(chainIndex);
  }, [chainsData, selectedChain]);

  if (!chainsData) {
    // eslint-disable-next-line unicorn/no-null
    return null;
  }

  return (
    <SectionContainer
      className='mb-7 flex flex-col items-start justify-between p-5 backdrop-blur-md sm:mb-9 sm:flex-col md:flex-row md:items-center md:px-10 md:py-12 lg:px-10 lg:py-12'
      style={{
        background: `url(${stepBackground}) no-repeat`,
        backgroundSize: 'contain'
      }}
    >
      <div className='flex flex-col'>
        <Button className=' mb-1 h-auto w-fit bg-transparent p-0 text-[16px] font-normal text-text500 hover:bg-transparent'>
          <img src={ArrowLeft} alt='' className='h-18 m-w-18 mr-2' />
          Back
        </Button>

        <h2 className='mb-2 text-[26px] font-semibold md:text-4xl'>
          {selectedChain === '' ? chainsData[selectedChainIndex]?.chainName : selectedChain} AI
          Builder
        </h2>
        <h3 className='text-base  font-medium text-text500 sm:text-lg'>
          Generate your custom DeFi application for{' '}
          {selectedChain === '' ? chainsData[selectedChainIndex]?.chainName : selectedChain}
        </h3>
      </div>

      <div className='mt-4 flex flex-col items-center gap-x-2.5 sm:flex-row md:mt-0'>
        <>
          <p className='text-lg'>Select target chain</p>
          <Select defaultValue={selectedChain} onValueChange={onChangeSelectedChain}>
            <SelectTrigger className='w-40 border-border-foreground border-border500'>
              <SelectValue
                placeholder={
                  <div className='flex items-center gap-x-2.5'>
                    <Image
                      src={chainsData[selectedChainIndex]?.chainLogoURL}
                      alt={`${chainsData[selectedChainIndex]?.chainName} logo`}
                      className='h-5 w-5'
                    />
                    {selectedChain === ''
                      ? chainsData[selectedChainIndex]?.chainName
                      : selectedChain}
                  </div>
                }
              />
            </SelectTrigger>
            <SelectContent>
              {chainsData?.map((data, index) => (
                <SelectItem
                  key={`${data.chainName}-${index}`}
                  value={data.chainName}
                  className='pl-2'
                >
                  <div className='flex items-center gap-x-2.5'>
                    <Image
                      src={data.chainLogoURL}
                      alt={`${data.chainName}'s logo`}
                      className='h-5 w-5'
                    />
                    {data.chainName}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </>
      </div>
    </SectionContainer>
  );
}
