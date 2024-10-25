import { Component, model, OnDestroy, OnInit, output, signal } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';
import { FilterPopoverComponent } from "./filter-popover/filter-popover.component";
import { FormsModule, NgModel } from '@angular/forms';
@Component({
  selector: 'searchbar',
  standalone: true,
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css'],
  imports: [FilterPopoverComponent, FormsModule],
})
export class SearchbarComponent implements OnInit, OnDestroy {

  searchInput = new Subject<string>();
  term = output<string>();
  onFilterByContinents = output<string[]>();

  showPopover = signal<boolean>(false);

  ngOnInit(): void {
    this.searchInput.pipe(debounceTime(300))
      .subscribe((searchTerm: string) => {
        this.term.emit(searchTerm);
      });
  }

  onInputChange(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value;
    this.searchInput.next(searchTerm);
  }

  ngOnDestroy(): void {
    this.searchInput.complete();
  }
}
