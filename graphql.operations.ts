import { gql } from 'apollo-angular';

export const GET_COUNTRIES = gql`
  query getCountries($name: String) {
    countries(filter: { name: { regex: $name } }) {
      name
      emojiU
      continent {
        name
      }
    }
  }
`;

export const GET_COUNTRY = gql`
  query getCountry($code: String!) {
    country(code: $code) {
      capital
      currencies
      continent {
        name
      }
      languages {
        name
      }
    }
  }
`;
