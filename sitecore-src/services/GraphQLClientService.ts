import { GraphQLRequestClient } from '@sitecore-jss/sitecore-jss-nextjs';
import config from '../temp/config';

export const graphQLClient = new GraphQLRequestClient(config.graphQLEndpoint, { apiKey: config.sitecoreApiKey });