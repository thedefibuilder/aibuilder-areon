/* eslint-disable unicorn/no-nested-ternary */

import React, { useEffect, useState } from 'react';

import { useGetActiveTransactionsStatus, useGetIsLoggedIn } from '@multiversx/sdk-dapp/hooks';

import ChainSelectorSection from '@/components/sections/chain-selector';
import SectionContainer from '@/components/sections/container';
import SmartContractTemplates from '@/components/sections/smart-contract-customisations/smart-contract-templates';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import ISmartContractTemplate from '@/interfaces/smart-contract-template';
import { TChainsDataState } from '@/reducers/chains-data';
import { LlmService } from '@/sdk/llmService.sdk';
import { IChain } from '@/sdk/src/db-schemas/ChainSchema';
import useSelectedChainStore from '@/store/selected-chain';
import useSCCustomisationsStore from '@/store/smart-contract-customisations';

import MultiversXIssueTokenForm from './_components/issue-token-form';
import { STTokenSchema } from './zod-schemas/token';

interface IMultiversXPage {
  chainsDataState: TChainsDataState;
}

const scTemplates: ISmartContractTemplate[] = [
  {
    name: 'Token',
    isActive: true
  },
  {
    name: 'NFT',
    isActive: true
  },
  {
    name: 'Staking',
    isActive: false
  },
  {
    name: 'Farm',
    isActive: false
  },
  {
    name: 'Marketplace',
    isActive: false
  },
  {
    name: 'Launchpad',
    isActive: false
  }
];

export default function MultiversXPage({ chainsDataState }: IMultiversXPage) {
  const {
    isLoading: isChainsDataLoading,
    isError: isChainsDataError,
    chainsData
  } = chainsDataState;

  const [multiversxChain, setMultiversXChain] = useState<IChain[]>();

  const selectedChain = useSelectedChainStore((store) => store.selectedChain);
  const setSelectedChain = useSelectedChainStore((store) => store.setSelectedChain);

  const scTemplate = useSCCustomisationsStore((store) => store.scCustomisations.template);
  const scDescription = useSCCustomisationsStore((store) => store.scCustomisations.description);
  const setSCDescription = useSCCustomisationsStore((store) => store.setSCDescription);

  const [isGeneratingToken, setIsGeneratingToken] = useState(false);
  const [generationResponse, setGenerationResponse] = useState<STTokenSchema>();

  const isMultiversXUserAuthenticated = useGetIsLoggedIn();
  const { success: isMultiversXTransactionSuccess } = useGetActiveTransactionsStatus();

  useEffect(() => {
    setSelectedChain('MultiversX');
  }, [setSelectedChain]);

  useEffect(() => {
    if (!isChainsDataLoading && !isChainsDataError && chainsData) {
      const temporaryEVMChains = chainsData.filter((data) => data.chainName === 'MultiversX');

      setMultiversXChain(temporaryEVMChains);
    }
  }, [isChainsDataLoading, isChainsDataError, chainsData]);

  useEffect(() => {
    if (isMultiversXTransactionSuccess) {
      // eslint-disable-next-line unicorn/no-useless-undefined
      setGenerationResponse(undefined);
    }
  }, [isMultiversXTransactionSuccess]);

  async function generateMultiversXNativeToken() {
    if (isMultiversXUserAuthenticated) {
      setIsGeneratingToken(true);
      const tokenGeneratorResponse = await LlmService.callMVXTokenGeneratorLLM(
        scDescription,
        'fungible'
      );

      if (
        tokenGeneratorResponse &&
        'mintAmount' in tokenGeneratorResponse &&
        'decimals' in tokenGeneratorResponse
      ) {
        setGenerationResponse({
          name: tokenGeneratorResponse.name,
          ticker: tokenGeneratorResponse.ticker,
          mintAmount: tokenGeneratorResponse.mintAmount,
          decimals: tokenGeneratorResponse.decimals,
          canFreeze: tokenGeneratorResponse.canFreeze,
          canWipe: tokenGeneratorResponse.canWipe,
          canPause: tokenGeneratorResponse.canPause,
          canChangeOwner: tokenGeneratorResponse.canChangeOwner,
          canUpgrade: tokenGeneratorResponse.canUpgrade,
          canAddSpecialRoles: tokenGeneratorResponse.canAddSpecialRoles
        });
      }

      setIsGeneratingToken(false);

      console.log('tokenGeneratorResponse', tokenGeneratorResponse);
    }
  }

  return (
    <div className='flex w-full max-w-[1140px] flex-col'>
      {isChainsDataLoading ? (
        <Skeleton className='h-44 w-full rounded-md' />
      ) : (
        <ChainSelectorSection chainsData={multiversxChain} />
      )}

      <SectionContainer className='flex flex-col  items-start justify-between p-5 px-10 py-12 backdrop-blur-md md:px-10 md:py-12'>
        <SmartContractTemplates
          docLink={multiversxChain ? multiversxChain[0].docURL : ''}
          scTemplates={scTemplates}
        />

        <div className='flex w-full flex-col items-start'>
          <div className='mb-6 mt-9 sm:mb-9 sm:mt-12'>
            <h2 className='text-lg font-semibold text-title sm:text-2xl'>Describe Customisation</h2>
            <h3 className='text-base font-medium text-subtitle sm:text-lg'>
              Choose customization to add into your {selectedChain} {scTemplate}
            </h3>
          </div>

          <Textarea
            value={scDescription}
            placeholder='Insert token name, supply and others customisations'
            className='h-60 w-full resize-none rounded-3xl p-5'
            onChange={(event) => setSCDescription(event.target.value)}
          />

          {generationResponse ? (
            <MultiversXIssueTokenForm tokenProperties={generationResponse} />
          ) : (
            <Button
              className='mb-5 mt-7 bg-gradient-to-b from-gradient to-gradient-foreground px-5 py-[16px] text-base text-black sm:h-[auto] md:mb-0 md:px-5 md:py-[18px]'
              disabled={!isMultiversXUserAuthenticated || isGeneratingToken}
              onClick={generateMultiversXNativeToken}
            >
              {isMultiversXUserAuthenticated
                ? isGeneratingToken
                  ? `Generating ${scTemplate}`
                  : `Generate ${scTemplate}`
                : 'Connect Wallet'}
            </Button>
          )}
        </div>
      </SectionContainer>
    </div>
  );
}
