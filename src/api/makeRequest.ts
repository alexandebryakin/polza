import axios from 'axios';
import { DocumentNode } from 'graphql';
import { jwt } from './jwt';

const API_GRPAHQL_URL = `${process.env.REACT_APP_API_GRPAHQL_URL}/graphql`;

const _getOperationName = (query: DocumentNode): string => {
  try {
    // @ts-expect-error
    return query.definitions[0].name.value || '';
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

export type AxiosResponseWrapper<T> = { data: T };

export const makeRequest = async <ReturnType = any, Vars = {}>(
  query: DocumentNode,
  variables: Vars
) => {
  console.log('query.loc?.source', query.loc?.source.body);
  const response = await axios.post<AxiosResponseWrapper<ReturnType>>(
    API_GRPAHQL_URL,
    {
      query: query.loc?.source.body,
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

export const buildRequest = <ReturnType, Vars>(query: DocumentNode) => {
  return async ({ variables }: { variables: Vars }) =>
    await makeRequest<ReturnType>(query, variables || {});
};
