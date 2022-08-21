import { buildRequest } from '../makeRequest';

const SIGNUP_USER = `
  mutation SignupUser($email: String!, $password: String!){
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

export type SignupCredentialsVariables = {
  email: string;
  password: string;
};

type ErrorMessage = string;
type Errors = { [field: string]: ErrorMessage[] };
export type SignupUserResponse = {
  data: {
    signupUser: {
      user?: {
        id: UUID;
        email: string;
      };
      token: string | null;
      errors: Errors;
    };
  };
};

export const signupUser = buildRequest<
  SignupUserResponse,
  SignupCredentialsVariables
>(SIGNUP_USER);
