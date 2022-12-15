import gql from 'graphql-tag';

export const CHANGE_CURRENT_USER_PASSWORD = gql`
  mutation ChangeCurrentUserPassword($oldPassword: String!, $newPassword: String!, $newPasswordConfirmation: String!) {
    changeCurrentUserPassword(
      oldPassword: $oldPassword
      newPassword: $newPassword
      newPasswordConfirmation: $newPasswordConfirmation
    ) {
      status
      errors
    }
  }
`;
