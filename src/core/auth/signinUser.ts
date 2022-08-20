import { makeRequest } from '../makeRequest';

// TODO: move to createUser.ts
const CREATE_USER = `
  mutation CreateUser($email: String!, $password: String!){
    createUser(email: $email, password: $password) {
      user {
        id
        email
      }
      errors
    }
  }
`;

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

export type CredentialsVariables = {
  email: string;
  password: string;
};

type ErrorMessage = string;
type Errors = { [field: string]: ErrorMessage[] };
export type CreateUserResponse = {
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

export const signinUser = async ({
  variables,
}: {
  variables: CredentialsVariables;
}) => {
  return await makeRequest<CreateUserResponse>(SIGNIN_USER, variables || {});
};

// export const createUser = defineRequest<ReturnType>(CREATE_USER)
