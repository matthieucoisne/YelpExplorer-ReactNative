import {useQuery} from '@apollo/client';
import {useEffect, useReducer} from 'react';
import {
  BusinessDetailsGraphQLModel,
  BusinessGraphQLModel,
} from '../../../data/graphql/model/BusinessGraphQLModel';
import {businessDetailsQuery} from '../../../data/graphql/query/BusinessDetailsQuery';
import * as BusinessDetailsMapper from './BusinessDetailsMapper';
import {BusinessDetailsUiModel} from './BusinessDetailsUiModel';

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
  business: BusinessGraphQLModel;
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
      return {...state, isLoading: true};
    case ActionType.SUCCESS:
      return {
        ...state,
        isLoading: false,
        business: BusinessDetailsMapper.toUiModel(action.business),
      };
    case ActionType.ERROR:
      return {...state, isLoading: false, error: action.error};
  }
};

export const useBusinessDetails = (businessId: string): UseBusinessDetailsHook => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {data, loading, error} = useQuery<BusinessDetailsGraphQLModel>(
    businessDetailsQuery,
    {
      variables: {
        id: businessId,
      },
    },
  );

  useEffect(() => {
    if (loading) {
      dispatch({type: ActionType.LOADING});
    } else if (error !== undefined) {
      dispatch({type: ActionType.ERROR, error: Error(`Error: ${error}`)});
    } else {
      dispatch({type: ActionType.SUCCESS, business: data!.business});
    }
  }, [data, loading, error]);

  return {state};
};
