import { gql } from '@apollo/client';

export const businessDetailsQuery = gql`
  query BusinessDetails($id: String!) {
    business(id: $id) {
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
      display_phone
      hours {
        open {
          day
          start
          end
        }
      }
      reviews {
        user {
          name
          image_url
        }
        text
        rating
        time_created
      }
    }
  }
`;
