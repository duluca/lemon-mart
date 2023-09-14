import { importProvidersFrom, makeEnvironmentProviders } from '@angular/core'
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core'
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular'
import { HttpLink } from 'apollo-angular/http'
import { environment } from 'src/environments/environment'

const uri = `${environment.baseUrl}/graphql`
export function createApollo(httpLink: HttpLink): ApolloClientOptions<unknown> {
  return {
    link: httpLink.create({ uri }),
    cache: new InMemoryCache(),
  }
}

export function provideGraphQL() {
  return makeEnvironmentProviders([
    importProvidersFrom(ApolloModule),
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ])
}
