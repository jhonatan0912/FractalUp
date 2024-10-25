import { NgClass } from '@angular/common';
import { Component, ElementRef, HostListener, inject, model, OnInit, output, signal } from '@angular/core';
import { Continent } from '@app/interfaces/country.interface';
import { Apollo } from 'apollo-angular';
import { GET_CONTINENTS } from '../../../../../graphql.operations';

@Component({
  selector: 'filter-popover',
  standalone: true,
  templateUrl: './filter-popover.component.html',
  styleUrls: ['./filter-popover.component.css'],
  imports: [NgClass]
})
export class FilterPopoverComponent implements OnInit {

  private readonly apollo = inject(Apollo);
  private readonly elementRef = inject(ElementRef);

  open = model.required<boolean>();
  onFilterByContinents = output<string[]>();
  onClearFilters = output<string>();

  continents = signal<Continent[]>([]);
  selectedFilters = signal<string[]>([]);

  ngOnInit(): void {
    this.open.set(true);
    this.onGetContinents();
  }

  onGetContinents(): void {
    this.apollo.watchQuery({
      query: GET_CONTINENTS,
    }).valueChanges.subscribe({
      next: ({ data: { continents } }: any) => {
        this.onFormatContinents(continents);
      }
    });
  }

  onFormatContinents(continents: Continent[]): void {
    this.continents.set(continents);
  }

  onSelectFilter(continentCode: string): void {
    this.selectedFilters.update(prev => [...prev, continentCode]);
    this.onFilterByContinents.emit(this.selectedFilters());
  }

  isSelectedFilter(continentCode: string): boolean {
    return this.selectedFilters().some(code => code === continentCode);
  }

  onPrevent(event: Event): void {
    event.stopPropagation();
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: any): void {
    const searchbar = document.getElementById('searchbar');
    if (searchbar && searchbar.contains(event.target)) return;

    if (this.open() && !this.elementRef.nativeElement.contains(event.target)) {
      this.open.set(false);
    }
  }
}