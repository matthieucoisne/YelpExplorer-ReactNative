import {gql} from '@apollo/client';

export const businessListQuery = gql`
  query BusinessList(
    $term: String
    $location: String!
    $sortBy: String
    $limit: Int
  ) {
    search(term: $term, location: $location, sort_by: $sortBy, limit: $limit) {
      total
      business {
        id
        name
        photos
        rating
        review_count
        location {
          address1
          city
        }
        price
        categories {
          title
        }
      }
    }
  }
`;
