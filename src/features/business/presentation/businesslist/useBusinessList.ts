import { useEffect, useReducer } from 'react';
import { useBusinessListQuery } from '../../domain/hook/useBusinessListQuery';
import { BusinessDomainModel } from '../../domain/model/BusinessDomainModel';
import { BusinessUiModel, toUiModels } from './BusinessListUiModel';

export interface UseBusinessListHook {
  state: State;
}

interface State {
  isLoading: boolean;
  businesses: BusinessUiModel[];
  error?: Error;
}

const initialState: State = {
  isLoading: true,
  businesses: [],
};

enum ActionType {
  SUCCESS = 'BUSINESSLIST/SUCCESS',
  LOADING = 'BUSINESSLIST/LOADING',
  ERROR = 'BUSINESSLIST/ERROR',
}

interface BusinessListSuccess {
  type: ActionType.SUCCESS;
  businesses: BusinessDomainModel[];
}

interface BusinessListLoading {
  type: ActionType.LOADING;
}

interface BusinessListError {
  type: ActionType.ERROR;
  error: Error;
}

type Action = BusinessListLoading | BusinessListSuccess | BusinessListError;

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.LOADING:
      return { ...state, isLoading: true };
    case ActionType.SUCCESS:
      return {
        ...state,
        isLoading: false,
        businesses: toUiModels(action.businesses),
      };
    case ActionType.ERROR:
      return { ...state, isLoading: false, error: action.error };
  }
};

export const useBusinessList = (
  term: String,
  location: String,
  sortBy: String,
  limit: number,
): UseBusinessListHook => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { businesses, loading, error } = useBusinessListQuery(term, location, sortBy, limit);

  useEffect(() => {
    if (loading) {
      dispatch({ type: ActionType.LOADING });
    } else if (error !== undefined) {
      dispatch({ type: ActionType.ERROR, error: Error(`Error: ${error}`) });
    } else {
      dispatch({ type: ActionType.SUCCESS, businesses: businesses });
    }
  }, [businesses, loading, error]);

  return { state };
};
