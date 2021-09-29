import { useEffect, useReducer } from 'react';
import { useBusinessDetailsQuery } from '../../domain/hook/useBusinessDetailsQuery';
import { BusinessDomainModel } from '../../domain/model/BusinessDomainModel';
import { BusinessDetailsUiModel, toUiModel } from './BusinessDetailsUiModel';

export interface UseBusinessDetailsHook {
  state: State;
}

interface State {
  isLoading: boolean;
  business?: BusinessDetailsUiModel;
  error?: Error;
}

const initialState: State = {
  isLoading: true,
};

enum ActionType {
  SUCCESS = 'BUSINESSDETAILS/SUCCESS',
  LOADING = 'BUSINESSDETAILS/LOADING',
  ERROR = 'BUSINESSDETAILS/ERROR',
}

interface BusinessDetailsSuccess {
  type: ActionType.SUCCESS;
  business: BusinessDomainModel;
}

interface BusinessDetailsLoading {
  type: ActionType.LOADING;
}

interface BusinessDetailsError {
  type: ActionType.ERROR;
  error: Error;
}

type Action = BusinessDetailsLoading | BusinessDetailsSuccess | BusinessDetailsError;

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.LOADING:
      return { ...state, isLoading: true };
    case ActionType.SUCCESS:
      return {
        ...state,
        isLoading: false,
        business: toUiModel(action.business),
      };
    case ActionType.ERROR:
      return { ...state, isLoading: false, error: action.error };
  }
};

export const useBusinessDetails = (businessId: String): UseBusinessDetailsHook => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { business, loading, error } = useBusinessDetailsQuery(businessId);

  useEffect(() => {
    if (loading) {
      dispatch({ type: ActionType.LOADING });
    } else if (error !== undefined) {
      dispatch({ type: ActionType.ERROR, error: Error(`Error: ${error}`) });
    } else {
      dispatch({ type: ActionType.SUCCESS, business: business! });
    }
  }, [business, loading, error]);

  return { state };
};
