import EReducerState from '@/constants/reducer-state';
import { IChain } from '@/sdk/src/db-schemas/ChainSchema';

const chainsDataInitialState = {
  isLoading: false,
  isError: false,
  chainsData: [] as IChain[]
};

type TChainsDataState = typeof chainsDataInitialState;

interface IChainsDataAction {
  state: EReducerState;
  payload: IChain[];
}

function chainsDataReducer(state: TChainsDataState, action: IChainsDataAction) {
  switch (action.state) {
    case EReducerState.start: {
      return {
        isLoading: true,
        isError: false,
        chainsData: [] as IChain[]
      };
    }
    case EReducerState.success: {
      return {
        ...state,
        isLoading: false,
        chainsData: action.payload
      };
    }
    case EReducerState.error: {
      return {
        isLoading: false,
        isError: true,
        chainsData: [] as IChain[]
      };
    }
    default: {
      return state;
    }
  }
}

export type { TChainsDataState, IChainsDataAction };
export { chainsDataInitialState, chainsDataReducer };
