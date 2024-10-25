import { gql } from 'apollo-angular';

export const GET_COUNTRIES = gql`
  query getCountries($name: String) {
    countries(filter: { name: { regex: $name } }) {
      name
      emojiU
      continent {
        name
        code
      }
    }
  }
`;

export const GET_COUNTRIES_BY_CONTINENTS = gql`
  query getCountriesByCategories($categories: [String!]) {
    countries(filter: { continent: { in: $categories } }) {
      name
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
        code
      }
      languages {
        name
      }
    }
  }
`;

export const GET_CONTINENTS = gql`
  query {
    continents {
      name
      code
    }
  }
`;
