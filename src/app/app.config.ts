import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient } from '@angular/common/http';
import { ApolloClientOptions, ApolloLink, InMemoryCache } from '@apollo/client/core';
import { Apollo, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { endpoint } from '../../graphql.config';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink): ApolloClientOptions<unknown> => ({
        link: ApolloLink.from([httpLink.create({ uri: endpoint })]),
        cache: new InMemoryCache()
      }),
      deps: [HttpLink]
    },
    Apollo
  ]
};
