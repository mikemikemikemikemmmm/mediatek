import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ApolloProvider, InMemoryCache, ApolloClient } from '@apollo/client';
import { GRAPHQL_URL } from './const';
import { ErrorBoundary } from './components/ErrorBoundary';
const client = new ApolloClient({
  uri: GRAPHQL_URL,
  cache: new InMemoryCache(),
});
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </ErrorBoundary>
  </React.StrictMode>,
)
