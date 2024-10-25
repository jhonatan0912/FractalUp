import { Component, inject, OnInit, signal } from '@angular/core';
import { Country } from '@app/interfaces/country.interface';
import { capitalizeFirstLetter } from '@app/utils/capitalize-first-letter';
import { Apollo } from 'apollo-angular';
import { debounceTime, map } from 'rxjs';
import { GET_COUNTRIES, GET_COUNTRIES_BY_CONTINENTS } from '../../../graphql.operations';
import { SearchbarComponent } from "../ui/searchbar/searchbar.component";
import { CountriesGridComponent } from './countries-grid/countries-grid.component';

@Component({
  selector: 'countries',
  standalone: true,
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css'],
  imports: [ SearchbarComponent, CountriesGridComponent]
})
export class CountriesComponent implements OnInit {

  private readonly apollo = inject(Apollo);

  countries = signal<Country[]>([]);

  ngOnInit(): void {
    this.onGetCountries();
  }

  onGetCountries(name: string = ""): void {
    this.apollo.watchQuery({
      query: GET_COUNTRIES,
      variables: { name: capitalizeFirstLetter(name) },
    })
      .valueChanges
      .pipe(
        debounceTime(300),
        map(({ data, loading, errors }: any) => {
          if (errors) {
            return { countries: [] };
          }
          return data;
        }),
        // switchMap(({ countries }) => {

        //   const countryRequests = countries.map((country: Country) => {
        //     return unsplash.search.getPhotos({ query: country.name })
        //       .then(res => ({
        //         ...country,
        //         image: res.response?.results?.[0]?.urls?.small
        //       }));
        //   });


        //   return from(Promise.all(countryRequests));
        // })
      )
      .subscribe({
        next: (response) => {
          this.countries.set(response.countries);
        },
        error: (error) => {
          console.error('Error en la consulta:', error);
        }
      });
  }

  onFilterByContinents(continent: string[]): void {
    this.apollo.watchQuery({
      query: GET_COUNTRIES_BY_CONTINENTS,
      variables: { categories: continent }
    }).valueChanges
      .subscribe({
        next: (({ data: { countries } }: any) => {
          this.countries.set(countries);
        })
      });
  }
}