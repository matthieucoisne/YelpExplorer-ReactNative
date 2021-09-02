import {useQuery} from '@apollo/client';
import {useEffect, useState} from 'react';
import {businessListQuery} from '../../data/graphql/BusinessListQuery';
import BusinessDataModel from '../../data/model/BusinessDataModel';
import BusinessDomainModel from '../model/BusinessDomainModel';

// TODO: should we create an interface? how?
// interface ?? {
//   useBusinessListQuery (): {};
// }

// Custom hook that is only responsible for calling another hook whose responsibilty
// is to get/persist the data from the internet and transforming it into something domain related.
// I believe it's like a usecase, and useQuery is like a repository. <- I need to double check on this

const useBusinessListQuery = (
  term: String,
  location: String,
  sortBy: String,
  limit: number,
) => {
  const [businessList, setBusinessList] = useState([]);
  const {data, loading, error} = useQuery(businessListQuery, {
    variables: {
      term,
      location,
      sortBy,
      limit,
    },
  });

  useEffect(() => {
    setBusinessList(
      data?.search.business.map((business: BusinessDataModel) => {
        // can/should we extract the mapping logic here into some other file for more clarity?
        const businessDomainModel: BusinessDomainModel = {
          id: business.id,
          name: business.name,
          photo: business.photos[0],
        };
        return businessDomainModel;
      }) ?? [],
    );
  }, [data]);

  return {businessList, loading, error};
};

export default useBusinessListQuery;
