import React, { useEffect, useState } from 'react';

import { useSwitchNetwork } from 'wagmi';

import AuditSection from '@/components/sections/audit';
import ChainSelectorSection from '@/components/sections/chain-selector';
import SmartContractCodeViewer from '@/components/sections/smart-contract-code-viewer';
import SmartContractCustomisationsSection from '@/components/sections/smart-contract-customisations';
import { Skeleton } from '@/components/ui/skeleton';
import { TChainsDataState } from '@/reducers/chains-data';
import { IChain } from '@/sdk/src/db-schemas/ChainSchema';
import useSelectedChainStore from '@/store/selected-chain';
import useSCIterStore from '@/store/smart-contract-iter';

interface IEVMPage {
  chainsDataState: TChainsDataState;
}

export default function EVMPage({ chainsDataState }: IEVMPage) {
  const {
    isLoading: isChainsDataLoading,
    isError: isChainsDataError,
    chainsData
  } = chainsDataState;

  const { switchNetwork } = useSwitchNetwork();

  const compileSC = useSCIterStore((store) => store.compileSC);
  const auditSC = useSCIterStore((store) => store.auditSC);
  const setSelectedChain = useSelectedChainStore((store) => store.setSelectedChain);

  const [evmChains, setEVMChains] = useState<IChain[]>();

  useEffect(() => {
    setSelectedChain('Arbitrum');
  }, [setSelectedChain]);

  useEffect(() => {
    if (!isChainsDataLoading && !isChainsDataError && chainsData) {
      const temporaryEVMChains = chainsData
        .filter((data) => data.chainName !== 'MultiversX')
        .sort((a, b) => a.chainName.localeCompare(b.chainName));

      setEVMChains(temporaryEVMChains);
    }
  }, [isChainsDataLoading, isChainsDataError, chainsData]);

  function onChangeSelectedChain(chain: string) {
    const chainId = evmChains?.find((data) => data.chainName === chain)?.chainId;

    if (chainId && switchNetwork) {
      switchNetwork(chainId);
    }

    setSelectedChain(chain);
  }

  return (
    <div className='flex h-full w-full max-w-[1140px] flex-col'>
      {isChainsDataLoading ? (
        <Skeleton className='h-44 w-full rounded-md' />
      ) : (
        <ChainSelectorSection
          chainsData={evmChains}
          onChangeSelectedChain={onChangeSelectedChain}
        />
      )}

      <SmartContractCustomisationsSection chainsData={chainsData} />

      {compileSC.isSuccess && auditSC.isSuccess ? (
        <>
          <AuditSection />
          <SmartContractCodeViewer chainsData={chainsData} smartContractCode={compileSC.code} />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
