import { Component, input, output, signal } from '@angular/core';
import { Country } from '@app/interfaces/country.interface';

@Component({
  selector: 'country-card',
  standalone: true,
  templateUrl: './country-card.component.html',
  styleUrls: ['./country-card.component.css']
})

export class CountryCardComponent {

  onSelectCountry = output<Country>();

  country = input.required<Country>();
  hasError = signal<boolean>(false);
  defaultImage = 'https://ceramicshop.com/cdn/shop/products/default-square_c8f6a682-0bb7-4115-b2d0-719d553bd6af_580x.png?v=1605972874';

  get flag(): string {
    return `https://flagsapi.com/${this.country().code}/flat/64.png`;
  }

  onImageError(): void {
    this.hasError.set(true);
  }
}