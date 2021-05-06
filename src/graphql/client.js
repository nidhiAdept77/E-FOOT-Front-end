import {
  ApolloClient, ApolloLink, HttpLink, InMemoryCache, split
} from 'apollo-boost'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import { CONSTANTS } from '../utils/CONSTANTS'
import { getAccessToken } from '../utils/'


const httpUrl = `${CONSTANTS.BACKEND_BASE_URL}/graphql`
const wsUrl = `${CONSTANTS.BACKEND_WS_URL}/graphql`

const httpLink = ApolloLink.from([
  new ApolloLink((operation, forward) => {
    const token = getAccessToken()
    if (token) {
      operation.setContext({headers: {authorization: `Bearer ${token}`}})
    }
    return forward(operation)
  }),
  new HttpLink({uri: httpUrl})
])

const wsLink = new WebSocketLink({ uri:wsUrl, 
  options: { 
    connectionParams: () =>  ({ 
      accessToken:getAccessToken() 
    }),
  lazy: true,
  reconnect: true
}})

const isSubscription = (operation) => {
  const defination = getMainDefinition(operation.query)
  return defination.kind === "OperationDefinition" && defination.operation === 'subscription'
}

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: split(isSubscription, wsLink, httpLink),
  defaultOptions: { query: { fetchPolicy: 'no-cache' } }
})

export default client
