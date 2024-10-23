import { Component, input } from '@angular/core';
import { Country } from '@app/interfaces/country.interface';
import { CountryCardComponent } from './country-card/country-card.component';

@Component({
  selector: 'countries-grid',
  standalone: true,
  templateUrl: './countries-grid.component.html',
  styleUrls: ['./countries-grid.component.css'],
  imports: [CountryCardComponent]
})
export class CountriesGridComponent {
  countries = input<Country[]>();
}