import { createUploadLink } from 'apollo-upload-client';

import { ApolloClient, ApolloLink, concat, InMemoryCache } from '@apollo/client';
import { jwt } from '../jwt';

const link = createUploadLink({
  uri: process.env.REACT_APP_API_GRPAHQL_URL + '/graphql',
});

const JWTAuthMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: jwt.get(),
    },
  }));

  return forward(operation);
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(JWTAuthMiddleware, link),
});

export default client;
