import {useEffect, useReducer} from 'react';
import {getBusinessDetailsUseCase} from '../../../../core/Inject';
import {Business} from '../../domain/model/Business';
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
  business: Business;
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

  useEffect(() => {
    const getBusinessDetails = async () => {
      try {
        const business = await getBusinessDetailsUseCase.execute(businessId);
        dispatch({type: ActionType.SUCCESS, business: business});
      } catch (error) {
        dispatch({type: ActionType.ERROR, error: Error(`Error: ${error}`)});
      }
    };
    getBusinessDetails();
  }, [businessId]);

  return {state};
};
