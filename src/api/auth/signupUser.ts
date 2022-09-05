import gql from 'graphql-tag';
import {
  SignupUserMutation,
  SignupUserMutationVariables,
} from '../graphql.types';
import { buildRequest } from '../makeRequest';

const SIGNUP_USER = gql`
  mutation SignupUser($email: String!, $password: String!) {
    signupUser(email: $email, password: $password) {
      user {
        id
        email
      }
      token
      errors
    }
  }
`;

// type ErrorMessage = string;
// type Errors = { [field: string]: ErrorMessage[] };
// export type SignupUserResponse = {
//   data: {
//     signupUser: {
//       user?: {
//         id: UUID;
//         email: string;
//       };
//       token: string | null;
//       errors: Errors;
//     };
//   };
// };

export const signupUser = buildRequest<
  SignupUserMutation,
  SignupUserMutationVariables
>(SIGNUP_USER);
