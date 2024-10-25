import { Component, inject, OnInit, signal } from '@angular/core';
import { Country } from '@app/interfaces/country.interface';
import { capitalizeFirstLetter } from '@app/utils/capitalize-first-letter';
import { Apollo } from 'apollo-angular';
import { debounceTime, map } from 'rxjs';
import { GET_COUNTRIES, GET_COUNTRIES_BY_CONTINENTS } from '../../../graphql.operations';
import { SearchbarComponent } from "../ui/searchbar/searchbar.component";
import { CountriesGridComponent } from './countries-grid/countries-grid.component';
import { ImagesService } from '@app/services/images.service';
import { ModalComponent } from "../ui/modal/modal.component";

@Component({
  selector: 'countries',
  standalone: true,
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css'],
  imports: [SearchbarComponent, CountriesGridComponent, ModalComponent]
})
export class CountriesComponent implements OnInit {

  private readonly apollo = inject(Apollo);
  private readonly imagesService = inject(ImagesService);

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
      )
      .subscribe({
        next: (response) => {
          this.countries.set(response.countries);
          // this.onPushByChunks(response.countries);
        },
        error: (error) => {
          console.error('Error en la consulta:', error);
        }
      });
  }

  onPushByChunks(countries: Country[]): void {
    const totalCountries = countries.length;

    const pushCountriesWithDelay = (index: number) => {
      if (index < totalCountries) {
        const countryChunk = countries.slice(index, index + 20);
        this.countries.set([...this.countries(), ...countryChunk]);


        setTimeout(() => {
          pushCountriesWithDelay(index + 20);
        }, 1500);
      }
    };

    pushCountriesWithDelay(0);
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