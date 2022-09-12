import axios, { AxiosRequestHeaders } from 'axios';
import { DocumentNode } from 'graphql';
import { jwt } from './jwt';

const API_GRPAHQL_URL = `${process.env.REACT_APP_API_GRPAHQL_URL}/graphql`;

const _getOperationName = (query: DocumentNode): string => {
  try {
    // @ts-expect-error
    return query.definitions[0].name.value || '';
  } catch (e) {
    if (process.env.NODE_ENV === 'production') return '';

    console.warn("_getOperationName: Couldn't extract operation name from query", query, e);
    return '';
  }
};

export type AxiosResponseWrapper<T> = { data: T };

export const makeRequest = async <ReturnType = any, Vars = {}>(
  query: DocumentNode,
  variables: Vars,
  options: Options = {}
) => {
  const data = {
    query: query.loc?.source.body,
    operationName: _getOperationName(query),
    variables,
  };

  const headers: AxiosRequestHeaders = {
    Authorization: `Bearer ${jwt.get()}`,
    ...options.headers,
  };

  const response = await axios.post<AxiosResponseWrapper<ReturnType>>(API_GRPAHQL_URL, data, { headers });

  return response.data;
};

type Options = {
  headers?: AxiosRequestHeaders;
};
export const buildRequest = <ReturnType, Vars>(query: DocumentNode, options: Options = {}) => {
  return async ({ variables }: { variables: Vars }) => await makeRequest<ReturnType>(query, variables || {}, options);
};
