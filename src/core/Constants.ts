export const URL_REST = 'https://api.yelp.com/v3';
export const URL_GRAPHQL = 'https://api.yelp.com/v3/graphql';

export enum DataLayer {
  REST,
  GRAPHQL,
}
export const DATA_LAYER: DataLayer = DataLayer.GRAPHQL; // Change the data layer for the one you want to use

const getHeaders = () => {
  const appConfig = require('../../config/app_config.json');
  return {
    Authorization: `Bearer ${appConfig.api_key}`,
    'content-type': 'application/json',
    'accept-language': 'en_US',
  };
};
export const HEADERS = getHeaders();

export const DAYS = new Map<number, string>([
  [0, 'Monday'],
  [1, 'Tuesday'],
  [2, 'Wednesday'],
  [3, 'Thursday'],
  [4, 'Friday'],
  [5, 'Saturday'],
  [6, 'Sunday'],
]); // TODO i18n
