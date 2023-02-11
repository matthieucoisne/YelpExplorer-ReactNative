import {useQuery} from '@apollo/client';
import {useEffect, useReducer} from 'react';
import {
  BusinessGraphQLModel,
  BusinessListGraphQLModel,
} from '../../../data/graphql/model/BusinessGraphQLModel';
import {businessListQuery} from '../../../data/graphql/query/BusinessListQuery';
import * as BusinessListMapper from './BusinessListMapper';
import {BusinessListUiModel} from './BusinessListUiModel';

export interface UseBusinessListHook {
  state: State;
}

interface State {
  isLoading: boolean;
  businesses: BusinessListUiModel;
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
  businesses: BusinessGraphQLModel[];
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
      return {...state, isLoading: true};
    case ActionType.SUCCESS:
      return {
        ...state,
        isLoading: false,
        businesses: BusinessListMapper.toUiModels(action.businesses),
      };
    case ActionType.ERROR:
      return {...state, isLoading: false, error: action.error};
  }
};

export const useBusinessList = (
  term: string,
  location: string,
  sortBy: string,
  limit: number,
): UseBusinessListHook => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {data, loading, error} = useQuery<BusinessListGraphQLModel>(businessListQuery, {
    variables: {
      term,
      location,
      sortBy,
      limit,
    },
  });

  useEffect(() => {
    if (loading) {
      dispatch({type: ActionType.LOADING});
    } else if (error !== undefined) {
      dispatch({type: ActionType.ERROR, error: Error(`Error: ${error}`)});
    } else {
      dispatch({type: ActionType.SUCCESS, businesses: data?.search?.business ?? []});
    }
  }, [data, loading, error]);

  return {state};
};
