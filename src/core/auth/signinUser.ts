import { buildRequest } from '../makeRequest';

export const SIGNIN_USER = `
  mutation SigninUser($email: String!, $password: String!){
    signinUser(email: $email, password: $password) {
      user {
        id
        email
      }
      token
      errors
    }
  }
`;

export type SigninCredentialsVariables = {
  email: string;
  password: string;
};

type ErrorMessage = string;
type Errors = { [field: string]: ErrorMessage[] };
export type SigninUserResponse = {
  data: {
    signinUser: {
      user?: {
        id: UUID;
        email: string;
      };
      errors: Errors;
      token: string | null;
    };
  };
};

export const signinUser = buildRequest<
  SigninUserResponse,
  SigninCredentialsVariables
>(SIGNIN_USER);
