import {useEffect, useReducer} from 'react';
import BusinessDomainModel from '../../domain/model/BusinessDomainModel';
import useBusinessListQuery from '../../domain/hook/useBusinessListQuery';

// This is a where we handle user actions and call our domain custom hooks to perform CRUD operations
// Once we get the data (domain-transformed) back, we can generate a new state that could be consumed by a view
// This file does not care about who is calling it, it's completelly decoupled from the view

export interface BusinessUiModel {
  id: string;
  name: string;
  photo: string;
}

interface State {
  isLoading: boolean;
  businessList: BusinessUiModel[];
  error?: Error;
}

const initialState: State = {
  isLoading: true,
  businessList: [],
};

type Action =
  | {type: 'loading'}
  | {type: 'success'; businessUiList: BusinessUiModel[]}
  | {type: 'error'; error: Error};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'loading':
      return {...state, isLoading: true};
    case 'success':
      return {
        ...state,
        isLoading: false,
        businessList: action.businessUiList,
      };
    case 'error':
      return {...state, isLoading: false, error: action.error};
    default:
      throw new Error();
  }
};

export const useBusinessList = (
  term: String,
  location: String,
  sortBy: String,
  limit: number,
) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {businessList, loading, error} = useBusinessListQuery(
    term,
    location,
    sortBy,
    limit,
  );

  useEffect(() => {
    const businessUiList: BusinessUiModel[] =
      // can/should we extract the mapping logic here into some other file for more clarity?
      businessList.map((businessDomainModel: BusinessDomainModel) => {
        const businessUiModel: BusinessUiModel = {
          id: businessDomainModel.id,
          name: businessDomainModel.name,
          photo: businessDomainModel.photo,
        };
        return businessUiModel;
      }) ?? [];
    dispatch({type: 'success', businessUiList});
  }, [businessList, loading, error]);

  return state;
};
