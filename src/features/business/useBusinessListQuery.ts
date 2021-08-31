import {useQuery} from '@apollo/client';
import {useEffect, useState} from 'react';
import {businessListQuery} from '../../data/graphql/BusinessListQuery';
import BusinessDataModel from '../../data/model/BusinessDataModel';
import BusinessDomainModel from '../../domain/model/BusinessDomainModel';

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
