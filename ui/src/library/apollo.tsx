"use client";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

export const apolloClient = new ApolloClient({
  uri: "http://localhost:8000/graphql",
  cache: new InMemoryCache(),
});

export { ApolloProvider };
