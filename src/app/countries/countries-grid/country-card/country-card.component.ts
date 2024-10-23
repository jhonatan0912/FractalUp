import { Component, inject, input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Country } from '@app/interfaces/country.interface';

@Component({
  selector: 'country-card',
  standalone: true,
  templateUrl: './country-card.component.html',
  styleUrls: ['./country-card.component.css']
})

export class CountryCardComponent implements OnInit {

  private readonly sanitizer = inject(DomSanitizer);

  country = input.required<Country>();

  ngOnInit(): void {
  }

  get flag(): string {
    return this.country()?.emojiU
      .match(/U\+([0-9A-Fa-f]+)/g)
      ?.map(code => String.fromCodePoint(parseInt(code.replace('U+', ''), 16)))
      .join('') || '';
  }
}