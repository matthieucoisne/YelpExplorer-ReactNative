import React from 'react';
import { BusinessDetailsRouteProp } from '../../App';
import { BusinessDetailsView } from './BusinessDetailsView';

export const BusinessDetailsScreen = ({ route }: { route: BusinessDetailsRouteProp }) => {
  const { businessId } = route.params;
  return <BusinessDetailsView businessId={businessId} />;
};
