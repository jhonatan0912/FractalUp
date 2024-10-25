import { Component, inject, input, signal } from '@angular/core';
import { Country } from '@app/interfaces/country.interface';
import { FormatArrayAsString } from '@app/pipes/formatLanguages.pipe';
import { unsplash } from '@app/utils/unsplash.config';
import { Apollo } from 'apollo-angular';
import { GET_COUNTRY } from '../../../../graphql.operations';
import { ModalComponent } from "../../ui/modal/modal.component";
import { CountryCardComponent } from './country-card/country-card.component';

@Component({
  selector: 'countries-grid',
  standalone: true,
  templateUrl: './countries-grid.component.html',
  styleUrls: ['./countries-grid.component.css'],
  imports: [CountryCardComponent, ModalComponent, FormatArrayAsString]
})
export class CountriesGridComponent {

  private readonly apollo = inject(Apollo);

  countries = input<Country[]>();

  country = signal<Partial<Country> | undefined>(undefined);
  isModalOpened = signal<boolean>(false);
  busy = signal<boolean>(false);

  onSelectCountry(country: Country): void {
    this.busy.set(true);
    this.country.set(undefined);
    this.isModalOpened.set(true);
    this.onGetCountry(country.code);
  }

  onGetCountry(countryCode: string): void {
    this.apollo.watchQuery({
      query: GET_COUNTRY,
      variables: { code: countryCode },
    })
      .valueChanges
      .subscribe({
        next: ({ data }: any) => {
          const country = data.country;
          this.country.set(country);
          this.onFormatCountry(country.name);
        },
      });
  }

  onFormatCountry(countryCode: string): void {
    unsplash.search.getPhotos({ query: `${encodeURIComponent(countryCode)} wonder place` })
      .then(({ response }) => {
        const randResult = Math.floor(Math.random() * 10);
        this.country.set({
          ...this.country(),
          image: response?.results[randResult].urls.small
        });
      })
      .finally(() => this.busy.set(false));
  }
}