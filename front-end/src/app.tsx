import React, { Reducer, useEffect, useReducer } from 'react';

import type { IChainsDataAction, TChainsDataState } from '@/reducers/chains-data';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Toaster } from '@/components/ui/toaster';

import Footer from './components/footer';
import ThemeProvider from './components/ui/theme/provider';
import EReducerState from './constants/reducer-state';
import EStorageKeys from './constants/storage-keys';
import HomeLayout from './pages/_home/layout';
import HomePage from './pages/_home/page';
import EVMLayout from './pages/evm/layout';
import EVMPage from './pages/evm/page';
import MultiversXLayout from './pages/multiversx/layout';
import MultiversXPage from './pages/multiversx/page';
import { chainsDataInitialState, chainsDataReducer } from './reducers/chains-data';
import { LlmService } from './sdk/llmService.sdk';
import { IChain } from './sdk/src/db-schemas/ChainSchema';

function App() {
  const [chainsDataState, dispatchChainsDataState] = useReducer<
    Reducer<TChainsDataState, IChainsDataAction>
  >(chainsDataReducer, chainsDataInitialState);

  useEffect(() => {
    async function getAllChainsData() {
      dispatchChainsDataState({ state: EReducerState.start, payload: [] });

      try {
        const chainsDataResponse = await LlmService.getAllChains();

        if (chainsDataResponse && Array.isArray(chainsDataResponse)) {
          const mappedChainsData: IChain[] = [];

          for (const data of chainsDataResponse) {
            mappedChainsData.push(data);
          }

          dispatchChainsDataState({ state: EReducerState.success, payload: mappedChainsData });
        }
      } catch (error) {
        if (error instanceof Error) {
          dispatchChainsDataState({ state: EReducerState.error, payload: [] });

          console.error('ERROR GETTING ALL CHAINS DATA', error);
        }
      }
    }

    getAllChainsData();
  }, []);

  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme='dark' storageKey={EStorageKeys.theme}>
        <Routes>
          <Route
            path='/'
            element={
              <EVMLayout>
                <EVMPage chainsDataState={chainsDataState} />
              </EVMLayout>
            }
          />
        </Routes>

        <Footer />

        <Toaster />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
