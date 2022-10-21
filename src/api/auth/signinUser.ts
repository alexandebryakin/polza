import gql from 'graphql-tag';
import { SigninUserMutation, SigninUserMutationVariables } from '../graphql.types';
import { buildRequest } from '../makeRequest';

export const SIGNIN_USER = gql`
  mutation SigninUser($email: String!, $password: String!) {
    signinUser(email: $email, password: $password) {
      user {
        id
        emails {
          id
          email
        }
      }
      token
      errors
    }
  }
`;

// type ErrorMessage = string;
// type Errors = { [field: string]: ErrorMessage[] };
// export type SigninUserResponse = {
//   data: {
//     signinUser: {
//       user?: {
//         id: UUID;
//         email: string;
//       };
//       errors: Errors;
//       token: string | null;
//     };
//   };
// };

// TODO: replace with `@apollo/client`
export const signinUser = buildRequest<SigninUserMutation, SigninUserMutationVariables>(SIGNIN_USER);
