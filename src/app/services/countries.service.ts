import { inject, Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_COUNTRIES } from '../../../graphql.operations';
import { capitalizeFirstLetter } from '@app/utils/capitalize-first-letter';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private readonly apollo = inject(Apollo);


  getCountries(name: string = "") {
    return this.apollo.watchQuery({
      query: GET_COUNTRIES,
      variables: { name: capitalizeFirstLetter(name) }
    });

  }
}
