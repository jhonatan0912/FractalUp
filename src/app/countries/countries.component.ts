import { Component, inject, OnInit, signal } from '@angular/core';
import { SearchbarComponent } from "../ui/searchbar/searchbar.component";
import { CountriesGridComponent } from './countries-grid/countries-grid.component';
import { Apollo } from 'apollo-angular';
import { GET_COUNTRIES } from '../../../graphql.operations';
import { from, map, switchMap } from 'rxjs';
import { unsplash } from '@app/utils/unsplash.config';
import { Country } from '@app/interfaces/country.interface';

@Component({
  selector: 'countries',
  standalone: true,
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css'],
  imports: [SearchbarComponent, CountriesGridComponent]
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
      variables: { name },
    })
      .valueChanges
      .pipe(
        map(({ data, loading, errors }: any) => {
          if (errors) {
            console.error(errors);
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

  onFilter(term: string): void {
    this.countries.set(this.countries().filter(c => c.name.toLowerCase().includes(term.toLowerCase())));
  }

}