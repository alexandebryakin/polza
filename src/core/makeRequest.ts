import axios from 'axios';
import gql from 'graphql-tag';
import { jwt } from './jwt';

const API_GRPAHQL_URL = `${process.env.REACT_APP_API_GRPAHQL_URL}/graphql`;

const _getOperationName = (query: string): string => {
  try {
    const queryInfo = gql(query);

    // @ts-expect-error
    return queryInfo.definitions[0].name.value || '';
  } catch (e) {
    if (process.env.NODE_ENV === 'production') return '';

    console.warn(
      "_getOperationName: Couldn't extract operation name from query",
      query,
      e
    );
    return '';
  }
};

export const makeRequest = async <ReturnType = any, Vars = {}>(
  query: string,
  variables: Vars
) => {
  const response = await axios.post<ReturnType>(
    API_GRPAHQL_URL,
    {
      query,
      operationName: _getOperationName(query),
      variables,
    },
    {
      headers: {
        Authorization: `Bearer ${jwt.get()}`,
      },
    }
  );

  return response.data;
};
